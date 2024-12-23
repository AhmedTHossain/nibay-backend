import { connectToMongoDB } from "@/lib/database";
import { NextResponse } from "next/server";
import User from "../../models/user";
import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_SECRET_EXPIRES_IN = process.env.JWT_SECRET_EXPIRES_IN as string;

export async function verifyOTP(request: Request) {
  try {
    const { phone, otpCode, deviceID } = await request.json();

    await connectToMongoDB();

    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Credentials!" },
        { status: 400 }
      );
    }

    if (user.otpCode !== otpCode) {
      return NextResponse.json({ error: "Invalid OTP!" }, { status: 400 });
    }

    if (user.deviceID !== deviceID) {
      return NextResponse.json({ error: "Invalid Device!" }, { status: 400 });
    }

    // TODO: verify otp

    const token = JWT.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        deviceID: user.deviceID
      },
      JWT_SECRET,
      {
        expiresIn: JWT_SECRET_EXPIRES_IN
      }
    );

    return NextResponse.json({
      status: "success",
      message: "Phone number verified successfully",
      token
    });

    // return NextResponse.json({ token });
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
