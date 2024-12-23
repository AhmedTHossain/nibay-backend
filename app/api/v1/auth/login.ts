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
        { error: "Invalid Credentials!" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid Credentials!" },
        { status: 400 }
      );
    }

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
    const { phone, pin } = await request.json();

    await connectToMongoDB();

    const user = await User.findOne({ phone }).select("+password");
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Credentials!" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(pin, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid Credentials!" },
        { status: 400 }
      );
    }

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
