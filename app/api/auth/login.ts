import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "../models/user";

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

    const token = JWT.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_SECRET_EXPIRES_IN
    });

    return NextResponse.json({ token });
  } catch (error) {
    handleError(error);
  }
}
