import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../middleware/auth";
import { connectToMongoDB } from "@/lib/database";
import User from "../../models/user";

export async function GET(request: NextRequest) {
  try {
    const authUser = authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", user });
  } catch (error) {
    return handleError(error);
  }
}
