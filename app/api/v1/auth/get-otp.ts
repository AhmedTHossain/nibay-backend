import { connectToMongoDB } from "@/lib/database";
import { NextResponse } from "next/server";
import User from "../../models/user";

export async function getOTP(request: Request) {
  try {
    const { phone, deviceID } = await request.json();

    await connectToMongoDB();

    const user = await User.findOne({ phone: phone });
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "User not found",
        data:{}
      });
    }

    // TODO: send otp

    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { deviceID, otpCode: 1234 } },
      { new: true }
    );

    return NextResponse.json({
      status: true,
      message: "Otp sent successfully",
      data:{}
    });
  } catch (error) {

    return NextResponse.json({
      status: false,
      message: "Operation failed",
      data:{}
    });
  }
}
