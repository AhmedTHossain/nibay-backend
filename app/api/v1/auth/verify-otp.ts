import { connectToMongoDB } from "@/lib/database";
import { NextResponse } from "next/server";
import User from "../../models/user";
import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_SECRET_EXPIRES_IN = process.env.JWT_SECRET_EXPIRES_IN as string;

export async function verifyOTP(request: Request) {
  try {
    const { email, otpCode, deviceID } = await request.json();

    await connectToMongoDB();

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "ভুল ইমেইল!",
        data: {}
      });
    }
    if (user.otpCode != otpCode) {
      return NextResponse.json({
        status: false,
        message: "ওটিপি ভুল হয়েছে!",
        data: {}
      });
    }

    if (user.deviceID !== deviceID) {
      return NextResponse.json({
        status: false,
        message: "পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে!",
        data: {}
      });
    }

    if (user.otpExpiry < new Date()) {
      return NextResponse.json({
        status: false,
        message: "ওটিপি মেয়াদ উত্তীর্ণ!",
        data: {}
      });
    }

    const token = JWT.sign(
      {
        id: "reset-password" + user.email,
        name: "temp",
        email: "temp",
        role: "temp",
        deviceID: user.deviceID
      },
      JWT_SECRET,
      {
        expiresIn: JWT_SECRET_EXPIRES_IN
      }
    );

    return NextResponse.json({
      status: true,
      message: "ইমেইল সফলভাবে যাচাই করা হয়েছে",
      data: { token: token }
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "ওটিপি ভুল!"
    });
  }
}
