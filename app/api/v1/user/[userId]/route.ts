import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import { updateUserAccount, updateUserPassword } from "../settings";
import User from "@/app/api/models/user";

interface TUserParams {
  params: { userId: string };
}

export async function PATCH(request: NextRequest, { params }: TUserParams) {
  try {
    const userId = params.userId;

    await connectToMongoDB();

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const formData = await request.formData();
    const key = formData.get("key") as string;

    switch (key) {
      case "account":
        return updateUserAccount(user, formData, userId);
      case "password":
        return updateUserPassword(user, formData, userId);
      default:
        return NextResponse.json({ message: "Invalid key" }, { status: 400 });
    }
  } catch (error) {
    return handleError(error);
  }
}
