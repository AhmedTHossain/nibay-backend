import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "../../models/user";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_SECRET_EXPIRES_IN = process.env.JWT_SECRET_EXPIRES_IN as string;

export async function login(request: Request) {
  try {
    const { email, password } = await request.json();

    await connectToMongoDB();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { error: "ইমেইল/পাসওয়ার্ড অনুরূপ হয়নি" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "ইমেইল/পাসওয়ার্ড অনুরূপ হয়নি" },
        { status: 400 }
      );
    }

    if (user.isDeleted) {
      return NextResponse.json(
        { error: "আপনার অ্যাকাউন্ট মুছে ফেলা হয়েছে। সাপোর্ট যোগাযোগ করুন।" },
        { status: 400 }
      );
    }
    //@ts-expect-error JWT_SECRET_EXPIRES_IN is not undefined
    const token = JWT.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      {
        expiresIn: JWT_SECRET_EXPIRES_IN
      }
    );

    return NextResponse.json({ token });
  } catch (error) {
    return handleError(error);
  }
}

export async function mobileLogin(request: Request) {
  try {
    const { phone, otpCode } = await request.json();

    if (!phone || !otpCode) {
      return NextResponse.json(
        { error: "Phone and PIN are required!" },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const user = await User.findOne({ phone }).select("otpCode");
    if (!user || !user.otpCode) {
      return NextResponse.json(
        { error: "Invalid Credentials!" },
        { status: 400 }
      );
    }
    if (otpCode !== user.otpCode) {
      return NextResponse.json(
        { error: "Invalid Credentials!" },
        { status: 400 }
      );
    }
    //@ts-expect-error JWT_SECRET_EXPIRES_IN is not undefined

    const token = JWT.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      {
        expiresIn: JWT_SECRET_EXPIRES_IN
      }
    );

    return NextResponse.json({
      status: "success",
      message: "Successfully logged in",
      token
    });
  } catch (error) {
    return handleError(error);
  }
}
