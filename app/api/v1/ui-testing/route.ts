import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectToMongoDB } from "@/lib/database";
import Job from "../../models/job"; // Assuming you have a Job model
import { authMiddleware } from "../../middleware/auth";
const ObjectId = Types.ObjectId;

interface TApplicantParams {
  params: {
    applicantId: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const jobId = "6789f04267cfdd15e6b92e3c"; // Hardcoded job ID

    const result = await Job.updateOne(
      { _id: new ObjectId(jobId) },
      { $set: { "applicants.$[].review": null } } // Update all applicants' reviews to null
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Job not found or no applicants to update!" }, { status: 404 });
    }

    return NextResponse.json({ message: "All reviews set to null successfully!" });
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: any) {
  console.error("An error occurred:", error);
  return NextResponse.json(
    { error: "An internal server error occurred. Please try again later." },
    { status: 500 }
  );
}