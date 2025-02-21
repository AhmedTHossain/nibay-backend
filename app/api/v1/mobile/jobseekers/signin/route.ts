import { connectToMongoDB } from "@/lib/database";
import { NextResponse } from "next/server";
import User from "../../../../models/user";
import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_SECRET_EXPIRES_IN = process.env.JWT_SECRET_EXPIRES_IN as string;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const phone = formData.get('phone') as string;
    const otpCode = formData.get('otpCode') as string;
    const deviceID = formData.get('deviceID') as string;

    await connectToMongoDB();

    const user = await User.findOne({ phone: phone });
    if (!user || user.isDeleted) {
      return NextResponse.json(
        { message: "Your account was deleted. Please contact support", status: false, data: {} },
        { status: 400 }
      );
    }

    if (user.otpCode != otpCode) {
      return NextResponse.json({
        status: false,
        message: "otp did not match!",
        data: {}
      },
      { status: 400 });
    }

    if (user.deviceID !== deviceID) {
      return NextResponse.json({
        status: false,
        message: "Device ID did not match!",
        data: {}
      },
      { status: 400 });
    }

    user.isAdmin = true;
    await user.save();
    //@ts-expect-error JWT_SECRET_EXPIRES_IN is not undefined

    const token = JWT.sign(
      {
        id: user._id,
        phone: user.phone,
        deviceID
      },
      JWT_SECRET,
      {
        expiresIn: JWT_SECRET_EXPIRES_IN
      }
    );

    return NextResponse.json({
      status: true,
      message: "Successfully logged in",
      token
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: "Operation failed!",
      data: {}
    });
  }
}