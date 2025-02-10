import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import { authMiddleware } from "@/app/api/middleware/auth";

function generateRandom10DigitString(): string {
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
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
    if (user.phone) {
      user.phone = `${generateRandom10DigitString()}-${user.phone}`;
    }
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