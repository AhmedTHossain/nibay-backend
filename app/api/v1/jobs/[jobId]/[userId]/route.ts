import { authMiddleware } from "@/app/api/middleware/auth";
import Job from "@/app/api/models/job";
import User from "@/app/api/models/user";
import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";

interface TGETPARAMS {
  params: {
    userId: string;
    jobId: string;
  };
}

export async function PATCH(request: NextRequest, { params }: TGETPARAMS) {
  const applicantId = params.userId;
  const jobId = params.jobId;

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

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found!" }, { status: 404 });
    }

    if (!job.applicants.includes(applicantId as any)) {
      return NextResponse.json(
        { error: "Invalid applicant!" },
        { status: 400 }
      );
    }

    const { status } = await request.json();
    console.log("status", { status });

    await User.findOneAndUpdate(
      { _id: applicantId },
      {
        applicationStatus: status
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      status: "success",
      message: `এপ্লিকেশনটি ${status} হয়েছে`,
      data: null
    });
  } catch (error) {
    return handleError(error);
  }
}
