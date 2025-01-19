import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import User from "../../../models/user";
import { authMiddleware } from "../../../middleware/auth";
import { Applicant } from "@/utils/types/applicant";

interface TApplicantId {
  params: {
    applicantId: string;
  };
}

export async function GET(request: NextRequest, { params }: TApplicantId) {
  console.log("here: ", params.applicantId);
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

    const applicantId = params.applicantId;
    // Find all the reviews for the applicant
    const results = {
      averageRating: 4.5,
      reviews: [
        {
          reviewerId: "123",
          reviewerName: "John Doe",
          jobId: "456",
          jobTitle: "Checker",
          rating: 4,
          feedback: "Great job!",
          createdAt: "2021-08-01T00:00:00.000Z"
        },
        {
          reviewerId: "789",
          reviewerName: "Jane Doe",
          jobId: "101",
          jobTitle: "Driver",
          rating: 5,
          feedback: "Excellent job!",
          createdAt: "2021-08-02T00:00:00.000Z"
        }
      ]
    };

    return NextResponse.json({ status: "success", data: results });
  } catch (error) {
    return handleError(error);
  }
}
