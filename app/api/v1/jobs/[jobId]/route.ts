import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { successResponse } from "@/lib/response";
import { authMiddleware } from "@/app/api/middleware/auth";
import User from "@/app/api/models/user";
import Job from "@/app/api/models/job";

async function getApplicantsDeletedStatus(applicants: any) {
  return Promise.all(
    applicants.map(async (applicant: any) => {
      const detailedApplicant = await User.findById(applicant.applicant.id);
      return {
        ...applicant,
        isDeleted: !detailedApplicant || detailedApplicant.isDeleted
      };
    })
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    let job = await Job.findById(params.jobId).populate("applicants");

    // add a field that if the applicant is deleted or not

    if (job) {
      job.applicants = await getApplicantsDeletedStatus(job.applicants);
    }

    return NextResponse.json({
      status: "success",
      message: "job fetched successfully",
      data: job
    });
  } catch (error) {
    return handleError(error);
  }
}

interface TUserParams {
  params: { jobId: string };
}

export async function PATCH(request: NextRequest, { params }: TUserParams) {
  try {
    const jobId = params.jobId;

    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json(
        { error: "চাকরিটি পাওয়া যায়নি!" },
        { status: 404 }
      );
    }

    const {
      title,
      shortDescription,
      longDescription,
      qualification,
      experience,
      applicationDeadline,
      salary,
      division,
      district,
      jobRole
    } = await request.json();

    await Job.findOneAndUpdate(
      { _id: jobId },
      {
        title,
        shortDescription,
        longDescription,
        qualification,
        experience,
        applicationDeadline,
        salary,
        division,
        district,
        jobRole
      },
      { new: true, runValidators: true }
    );
    return successResponse({ message: "চাকরি আপডেট সফল হয়েছে!" });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: TUserParams) {
  try {
    const jobId = params.jobId;

    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found!" }, { status: 404 });
    }

    await Job.deleteOne({ _id: job._id });

    return NextResponse.json({
      status: "success",
      message: "এই চাকরিটি বাতিল করে দেওয়া হয়েছে!"
    });
  } catch (error) {
    return handleError(error);
  }
}
