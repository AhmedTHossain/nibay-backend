import { handleError } from "@/lib/handleErrors";
import { connectToMongoDB } from "@/lib/database";
import User from "../../../../models/user";
import { authMiddleware } from "../../../../middleware/auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    const formData = await request.formData();
    const fcm_token = formData.get("fcm_token");
    if (!fcm_token) {
      return NextResponse.json(
        { status: false, message: "FCM token is required" },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json(
        { status: false, message: "User not found!" },
        { status: 404 }
      );
    }

    user.fcm_token = fcm_token as string;
    await user.save();

    return NextResponse.json(
      { status: true, message: "FCM token updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { status: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}