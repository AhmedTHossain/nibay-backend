import { NextRequest, NextResponse } from "next/server";
import { createJob } from "./create-job";
import { connectToMongoDB } from "@/lib/database";
import User from "../../models/user";
import { handleError } from "@/lib/handleErrors";
import { authMiddleware } from "../../middleware/auth";
import Job from "../../models/job";
import { updateExpiredJobs } from "@/utils/cron";

export async function POST(request: NextRequest) {
  return createJob(request);
}

export async function GET(request: NextRequest) {
  try {
    await connectToMongoDB();

    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 items per page
    const jobRole = searchParams.get("jobRole") || undefined;
    const jobStatus = searchParams.get("jobStatus") || undefined;
    const userId = searchParams.get("userId") || undefined;

    if (userId && !user.isAdmin) {
      return NextResponse.json(
        { error: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    updateExpiredJobs();

    // Build the query object
    const query: Record<string, any> = { user: userId || user._id }; // Only fetch jobs created by the user unless the user is an admin
    if (jobRole) {
      query.jobRole = jobRole;
    }
    if (jobStatus) {
      query.applicationStatus = jobStatus;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch jobs with filtering, sorting, and pagination
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalJobs = await Job.countDocuments(query);
    const totalPages = Math.ceil(totalJobs / limit);

    return NextResponse.json({
      status: "success",
      message: "Job fetched successfully...",
      data: {
        jobs,
        pagination: {
          totalJobs,
          totalPages,
          currentPage: page
        }
      }
    });
  } catch (error) {
    return handleError(error);
  }
}
