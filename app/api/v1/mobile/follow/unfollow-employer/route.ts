import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import mongoose from 'mongoose';
import { authMiddleware } from "@/app/api/middleware/auth";

export async function POST(request: NextRequest) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const formData = await request.formData();
    const employerId = formData.get('employerId')?.toString();

    if (!employerId) {
      return NextResponse.json(
        { status: false, message: "Employer ID is required" },
        { status: 400 }
      );
    }

    const userObjectId = new mongoose.Types.ObjectId(authUser.userId);
    const employerObjectId = new mongoose.Types.ObjectId(employerId);

    const user = await User.findById(userObjectId);
    if (!user) {
      return NextResponse.json({ status: false, message: "User not found!" }, { status: 404 });
    }

    const employer = await User.findById(employerObjectId);
    if (!employer) {
      return NextResponse.json({ status: false, message: "Employer not found!" }, { status: 404 });
    }

    // Remove from following array of user
    if (user.following.includes(employerObjectId.toString())) {
      user.following = user.following.filter(
        (id) => id !== employerObjectId.toString()
      );
      await user.save();
    }

    // Remove from followers array of employer
    if (employer.followers.includes(userObjectId.toString())) {
      employer.followers = employer.followers.filter(
        (id) => id !== userObjectId.toString()
      );
      await employer.save();
    }

    return NextResponse.json({
      status: true,
      message: "Unfollowed successfully"
    });

  } catch (error) {
    return NextResponse.json({
      status: false,
      message: "An error occurred"
    });
  }
}