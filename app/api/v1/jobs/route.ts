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

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 items per page
    const jobRole = searchParams.get("jobRole") || undefined;
    const jobStatus = searchParams.get("jobStatus") || undefined;

    // Build the query object
    const query: Record<string, any> = { user: user._id };
    if (jobRole) {
      query.jobRole = jobRole;
    }
    if (jobStatus) {
      query.status = jobStatus;
    }

    console.log("Query:", query);

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch jobs with filtering and pagination
    const jobs = await Job.find(query).skip(skip).limit(limit);
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
