import { authMiddleware } from "@/app/api/middleware/auth";
import User from "@/app/api/models/user";
import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    if (authUser.userId.startsWith("reset-password")) {
      return NextResponse.json(
        { error: "ইউজার ভেরিফাই হয়নি। আবার চেষ্টা করুন।" },
        { status: 404 }
      );
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);

    if (!user) {
      return NextResponse.json(
        { error: "ইমেইলটি রেজিস্টার্ড নয়!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: "success", user });
  } catch (error) {
    return handleError(error);
  }
}
