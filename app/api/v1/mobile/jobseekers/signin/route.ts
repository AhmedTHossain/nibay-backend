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
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Credentials!" },
        { status: 400 }
      );
    }

//     In Login API (mobile/jobseekers/signin) when incorrect deviceId is passed in the request form-data, the response received has a code 200. 

// Expected Behavior: expectation is when incorrect deviceId is sent in the request the API will give an error with appropriate reasoning and an error response (4xx)

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