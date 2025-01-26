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
      return NextResponse.json({
        status: false,
        message: "Invalid credentials!",
        data: {
        },
      });
    }
    const userOtp = String(user.otpCode)

    if (user.otpCode != userOtp) {
      return NextResponse.json({
        status: false,
        message: "Invalid otp!",
        data: {
        },
      });
    }


    if (user.deviceID !== deviceID) {
        return NextResponse.json({
        status: false,
        message: "Invalid device!",
        data: {
        },
      });
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
      status: true,
      message: "Phone number verified successfully",
      data:{'token':token}
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Otp mismatch"
      }
    );
  }
}
