import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import { authMiddleware } from "@/app/api/middleware/auth";
import { USER_ROLE } from "@/lib/constant";

export async function GET(request: NextRequest) {
  try {
    const searchByPhone = request.nextUrl.searchParams.get("searchByPhone");
    const type = request.nextUrl.searchParams.get("type");

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
    const role = type
      ? Object.keys(USER_ROLE).find(
          (key) =>
            USER_ROLE[
              key as unknown as keyof typeof USER_ROLE
            ].value.toLowerCase() === type?.toLowerCase()
        )
      : undefined;

    const query: any = {
      phone: { $regex: `^${searchByPhone}` },
      isMobileUser: { $ne: true }
    };

    if (role) {
      query.role = role;
    }

    const users = await User.find(query);

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
