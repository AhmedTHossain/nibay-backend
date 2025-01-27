import User from "@/app/api/models/user";
import { connectToMongoDB } from "@/lib/database";
import { generatePasswordResetToken } from "@/lib/generateToken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { authMiddleware } from "@/app/api/middleware/auth";

export async function POST(request: NextRequest) {
  try {
    await connectToMongoDB();

    const body = await request.json();
    const password = body.password;

    const authUser = authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    if (!authUser.userId.startsWith("reset-password")) {
      return NextResponse.json(
        { error: "ইউজার ভেরিফাই হয়নি। আবার চেষ্টা করুন।" },
        { status: 404 }
      );
    }

    const email = authUser.userId.replace("reset-password", "");

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "ইমেইল রেজিস্টটার্ড নয়" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword
    });

    return NextResponse.json({
      status: "success",
      message: "পাসওয়ার্ড রিসেট সফল হয়েছে"
    });
  } catch (error) {
    return NextResponse.json(
      { error: "ইমেইলটি রেজিস্টার্ড নয়!" },
      { status: 404 }
    );
  }
}
