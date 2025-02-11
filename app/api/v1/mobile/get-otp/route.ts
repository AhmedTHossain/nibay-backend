import { connectToMongoDB } from "@/lib/database";
import { NextResponse } from "next/server";
import User from "../../../models/user";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const phone = formData.get('phone');
    const deviceID = formData.get('deviceID');

    if (!phone || !deviceID) {
      return NextResponse.json(
        { message: "Phone and deviceID are required", status: false },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const user = await User.findOne({ phone: phone });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid Credentials!", status: false },
        { status: 400 }
      );
    }
    const now = new Date();
    const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);
    const startOfDay = new Date(now);  // Create a new date object
    startOfDay.setHours(0, 0, 0, 0);   // Modify startOfDay instead of now

    if (user.lastOTPRequestTime && user.lastOTPRequestTime > twoMinutesAgo) {
      const secondsLeft = Math.ceil((user.lastOTPRequestTime.getTime() + 2 * 60 * 1000 - now.getTime()) / 1000);
      return NextResponse.json(
        { message: `Please wait for ${secondsLeft} seconds before requesting another OTP`, status: false },
        { status: 429 }
      );
    }

    if (user.lastOTPRequestTime && user.lastOTPRequestTime > startOfDay && user.otpRequestCount >= 5) {
      return NextResponse.json(
        { message: "You have reached the maximum OTP requests for today", status: false },
        { status: 429 }
      );
    }

    // Generate a random 4-digit OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000);

    // Send OTP via SMS API
    const apiKey = "fB4E4gX0MXhLe9xEmAnZ";
    const senderId = "8809617624487";
    const message = `Greetings From the Nibay team! Your OTP is ${otpCode}.`;
    const smsApiUrl = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${phone}&senderid=${senderId}&message=${encodeURIComponent(message)}`;

    const response = await fetch(smsApiUrl);
    const result = await response.json();

    if (result.response_code !== 202) {
      return NextResponse.json(
        { message: "Failed to send OTP, Please try again", status: false },
        { status: 500 }
      );
    }

    // Update OTP, deviceID, lastOTPRequestTime, and otpRequestCount in the database
    const updateData = {
      deviceID,
      otpCode,
      lastOTPRequestTime: now,
      otpRequestCount: user.lastOTPRequestTime && user.lastOTPRequestTime > startOfDay ? user.otpRequestCount + 1 : 1
    };

    console.log("Update Data:", updateData);

    const updatedUser = await User.findOneAndUpdate(
      { phone: user.phone },
      { $set: updateData },
      { new: true }
    );

    console.log("Updated User:", updatedUser);
    return NextResponse.json({
      status: "success",
      message: "Otp sent successfully"
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      status: "error",
      message: "An error occurred"
    });
  }
}