import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import { authMiddleware } from "@/app/api/middleware/auth";

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Invalid request body",
        data: {}
      });
    }

    const { userId } = body;
    console.log(userId);

    await connectToMongoDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found!",
        data: {}
      });
    }

    if (user.isDeleted) {
      return NextResponse.json({
        success: false,
        message: "Profile is already deleted!",
        data: {}
      });
    }

    user.isDeleted = true;
    user.deletedAt = new Date();
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Profile deleted successfully!",
      data: {}
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
      data: {}
    });
  }
}