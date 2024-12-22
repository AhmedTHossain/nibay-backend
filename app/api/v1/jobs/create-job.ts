import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../middleware/auth";
import User from "../../models/user";
import Job from "../../models/job";

export async function createJob(request: NextRequest) {
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

    const {
      title,
      shortDescription,
      longDescription,
      experience,
      qualification,
      applicationDeadline,
      location,
      salary,
      jobType,
      jobRole
    } = await request.json();

    await Job.create({
      title,
      shortDescription,
      longDescription,
      experience,
      qualification,
      applicationDeadline,
      location,
      salary,
      jobType,
      jobRole,
      user: user._id
    });

    return NextResponse.json({
      status: "success",
      message: "New job created successfully..."
    });
  } catch (error) {
    return handleError(error);
  }
}
