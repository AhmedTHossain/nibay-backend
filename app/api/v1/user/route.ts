import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import { authMiddleware } from "@/app/api/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    const searchByPhone = request.nextUrl.searchParams.get("searchByPhone");

    const auth = authMiddleware(request);
    if (auth instanceof NextResponse) {
      return auth;
    }

    await connectToMongoDB();

    const authUser = await User.findById(auth.userId);
    if (!authUser) {
      return NextResponse.json(
        { error: "You are not authenticated" },
        { status: 404 }
      );
    }

    if (!authUser.isAdmin) {
      return NextResponse.json(
        { error: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    const users = await User.find({
      phone: { $regex: `^${searchByPhone}` },
      isMobileUser: { $ne: true }
    });

    const data = {
      users: users
    };

    return NextResponse.json({
      status: "success",
      message: "User fetched",
      data: data
    });
  } catch (error) {
    return handleError(error);
  }
}
