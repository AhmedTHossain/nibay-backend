import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToMongoDB } from "@/lib/database";
import User from "../models/user";

export async function register(request: Request) {
  try {
    const { name, email, password, role, phone, address, division, district } =
      await request.json();

    await connectToMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
      division,
      district
    });

    return NextResponse.json({ user: newUser });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
