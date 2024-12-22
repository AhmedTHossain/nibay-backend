import { NextRequest, NextResponse } from "next/server";
import { createJob } from "./create-job";
import { connectToMongoDB } from "@/lib/database";
import User from "../../models/user";
import { handleError } from "@/lib/handleErrors";
import { authMiddleware } from "../../middleware/auth";
import Job from "../../models/job";

export async function POST(request: NextRequest) {
  return createJob(request);
}

export async function GET(request: NextRequest) {
  try {
    await connectToMongoDB();

    const authUser = authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const jobs = await Job.find({ user: user._id });

    return NextResponse.json({
      status: "success",
      message: "Job fetched successfully...",
      data: jobs
    });
  } catch (error) {
    return handleError(error);
  }
}
