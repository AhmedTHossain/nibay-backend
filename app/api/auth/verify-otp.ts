import { connectToMongoDB } from "@/lib/database";
import { NextResponse } from "next/server";
import User from "../models/user";

export async function verifyOTP(request: Request) {
  try {
    const { phone_number, otpCode, deviceID } = await request.json();

    await connectToMongoDB();

    const user = await User.findOne({ phone: phone_number });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Credentials!" },
        { status: 400 }
      );
    }

    // TODO: verify otp

    return NextResponse.json(
      {
        status: "success",
        message: "Phone number verified successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Otp mismatch | User not found or other error message"
      },
      { status: 400 }
    );
  }
}
