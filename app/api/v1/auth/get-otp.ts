import { connectToMongoDB } from "@/lib/database";
import { NextResponse } from "next/server";
import User from "../../models/user";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/sendEmail"; // Use your existing email sender

export async function getOTP(request: Request) {
  try {
    const { email, deviceID } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          status: false,
          message: "Email is required",
          data: {}
        },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          status: false,
          message: "User not found",
          data: {}
        },
        { status: 404 }
      );
    }

    // Generate secure 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiration

    // Update user with OTP and expiry
    await User.findByIdAndUpdate(user._id, {
      deviceID,
      otpCode: otp,
      otpExpiry
    });

    // Send email with OTP
    await sendPasswordResetEmail({
      email: email,
      otp: otp
    });

    return NextResponse.json({
      status: true,
      message: "OTP sent successfully",
      data: {}
    });
  } catch (error) {
    console.error("OTP Error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "OTP sending failed",
        data: {}
      },
      { status: 500 }
    );
  }
}
