import { connectToMongoDB } from "@/lib/database";
import { NextResponse } from "next/server";
import User from "../models/user";

export async function login(request: Request) {
  try {
    const { email, password } = await request.json();

    await connectToMongoDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid Email!" }, { status: 400 });
    }

    // eslint-disable-next-line
    // @ts-ignore
    if (!user || !(await user.checkPasswordCorrect(password)))
      return NextResponse.json(
        { error: "Password doesn't matched!" },
        { status: 401 }
      );

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
