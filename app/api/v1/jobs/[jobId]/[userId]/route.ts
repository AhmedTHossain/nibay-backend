import { authMiddleware } from "@/app/api/middleware/auth";
import Job from "@/app/api/models/job";
import User from "@/app/api/models/user";
import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";

interface TREQPARAMS {
  params: {
    userId: string;
    jobId: string;
  };
}

export async function POST(request: NextRequest, { params }: TREQPARAMS) {
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

    const userId = params.userId;
    const jobId = params.jobId;
    const { review } = await request.json();

    await User.findOneAndUpdate(
      { _id: userId },
      {
        reviews_for_employees: [{ jobId, review }],
        reviews_from_employers: [{ jobId, review }]
      },
      { new: true, runValidators: true }
    );

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found!" }, { status: 404 });
    }

    job.applicants = job?.applicants.map((job) => {
      return {
        ...job,
        review,
        reviewCreatedDate: new Date()
      };
    });

    return NextResponse.json({
      status: true,
      message: "job updated successfully",
      data: null
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: NextRequest, { params }: TREQPARAMS) {
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

    const isFoundApplicant = job.applicants.find(
      (item) => item.applicant.id === applicantId
    );

    if (!isFoundApplicant) {
      return NextResponse.json(
        { error: "Invalid applicant!" },
        { status: 400 }
      );
    }

    const { status } = await request.json();

    job.applicants = job.applicants.map((item) => {
      if (item.applicant.id === applicantId) {
        return {
          ...item,
          applicationStatus: status
        };
      }
      return item;
    });
    await job.save();

    await User.findOneAndUpdate(
      { _id: applicantId },
      { applicationStatus: status },
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
