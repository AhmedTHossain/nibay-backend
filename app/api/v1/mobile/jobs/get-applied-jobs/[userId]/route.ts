import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
// Restored original paths
import User from "@/app/api/models/user";
import Job from "@/app/api/models/job";
import mongoose from "mongoose";

/**
 * @swagger
 * /api/v1/mobile/jobs/get-applied-jobs/{userId}:
 *   get:
 *     summary: Fetch user's applied jobs
 *     description: Fetch all jobs applied by the user
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json({
        status: false,
        message: "User ID is required",
        data: {}
      }, { status: 400 });
    }

    await connectToMongoDB();

    // Find user with original path
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "User not found",
        data: {}
      }, { status: 404 });
    }

    // Get jobs with original path
    const jobIds = user.jobsApplied.map(
      (jobId: any) => new mongoose.Types.ObjectId(jobId)
    );

    const jobs = await Job.find({ _id: { $in: jobIds } }).populate({
      path: "user",
      model: "User",
      select: "name profilePhoto applicationStatus"
    });

    if (!jobs.length) {
      return NextResponse.json({
        status: false,
        message: "No applied jobs found",
        data: {}
      }, { status: 404 });
    }

    const formattedJobs = jobs.map((job) => ({
      _id: job._id.toString(),
      title: job.title,
      shortDescription: job.shortDescription,
      longDescription: job.longDescription,
      experience: job.experience,
      qualification: job.qualification,
      jobRole: job.jobRole,
      division: job.division,
      district: job.district,
      salary: job.salary,
      applicationDeadline: job.applicationDeadline,
      employerName:
        typeof job.user === "object" && "name" in job.user
          ? job.user.name
          : "Unknown Company",
      employerPhoto:
        typeof job.user === "object" && "profilePhoto" in job.user
          ? job.user.profilePhoto
          : null,
      applicationStatus: job.applicationStatus
    }));

    return NextResponse.json({
      status: true,
      message: "Applied jobs fetched successfully",
      data: formattedJobs
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: "Failed to fetch applied jobs",
      data: {}
    }, { status: 500 });
  }
}