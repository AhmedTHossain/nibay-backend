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
          jobTitle: "গাড়ি মেইনটেন্যান্স কর্মী",
          rating: 4,
          feedback: "কাজটি খুবই ভালো হয়েছে।",
          createdAt: "2021-08-01T00:00:00.000Z"
        },
        {
          reviewerId: "789",
          reviewerName: "Jane Doe",
          jobId: "101",
          jobTitle: "ডেলিভারি চালক",
          rating: 1,
          feedback: "অত্যন্ত ভালো অভিজ্ঞতা, কাজের মান চমৎকার!",
          createdAt: "2021-08-02T00:00:00.000Z"
        },
        {
          reviewerId: "456",
          reviewerName: "John Smith",
          jobId: "123",
          jobTitle: "গুদাম চেকার",
          rating: 2,
          feedback: "শ্রেষ্ঠ কর্মী, দারুণ সহায়ক এবং দক্ষ।",
          createdAt: "2021-08-03T00:00:00.000Z"
        },
        {
          reviewerId: "101",
          reviewerName: "Jane Smith",
          jobId: "789",
          jobTitle: "ভ্যান চালক",
          rating: 3,
          feedback: "খুবই সন্তুষ্ট, সময়মতো কাজ সম্পন্ন হয়েছে।",
          createdAt: "2021-08-04T00:00:00.000Z"
        },
        {
          reviewerId: "789",
          reviewerName: "Jane Doe",
          jobId: "101",
          jobTitle: "ডেলিভারি চালক",
          rating: 5,
          feedback: "অত্যন্ত ভালো অভিজ্ঞতা, কাজের মান চমৎকার!",
          createdAt: "2021-08-02T00:00:00.000Z"
        },
        {
          reviewerId: "456",
          reviewerName: "John Smith",
          jobId: "123",
          jobTitle: "গুদাম চেকার",
          rating: 4,
          feedback: "শ্রেষ্ঠ কর্মী, দারুণ সহায়ক এবং দক্ষ।",
          createdAt: "2021-08-03T00:00:00.000Z"
        },
        {
          reviewerId: "101",
          reviewerName: "Jane Smith",
          jobId: "789",
          jobTitle: "ভ্যান চালক",
          rating: 3,
          feedback: "খুবই সন্তুষ্ট, সময়মতো কাজ সম্পন্ন হয়েছে।",
          createdAt: "2021-08-04T00:00:00.000Z"
        }
      ]
    };

    return NextResponse.json({ status: "success", data: results });
  } catch (error) {
    return handleError(error);
  }
}
