import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import Job from "@/app/api/models/job";
import mongoose from "mongoose";

/**
 * @swagger
 * /api/v1/mobile/jobs/get-applied-jobs/{userId}:
 *   get:
 *     summary: Fetch user's applied jobs
 *     description: Fetch all jobs applied by the user, including job details and the name of the user who created the job.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user whose applied jobs are being fetched.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched applied jobs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Applied jobs fetched successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Job ID.
 *                       title:
 *                         type: string
 *                         description: Job title.
 *                       shortDescription:
 *                         type: string
 *                         description: Short description of the job.
 *                       longDescription:
 *                         type: string
 *                         description: Long description of the job.
 *                       experience:
 *                         type: string
 *                         description: Required experience for the job.
 *                       qualification:
 *                         type: string
 *                         description: Qualification for the job.
 *                       jobRole:
 *                         type: string
 *                         description: Role of the job.
 *                       division:
 *                         type: string
 *                         description: Division of the job.
 *                       district:
 *                         type: string
 *                         description: District of the job.
 *                       salary:
 *                         type: string
 *                         description: Salary for the job.
 *                       applicationDeadline:
 *                         type: string
 *                         format: date-time
 *                         description: Application deadline for the job.
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       company_name:
 *                         type: string
 *                         description: Name of the user who created the job.
 *       404:
 *         description: User not found or no jobs applied.
 *       500:
 *         description: Server error.
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json({ error: "Invalid input!" }, { status: 400 });
    }

    await connectToMongoDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User not found!" },
        { status: 404 }
      );
    }

    const jobIds = user.jobsApplied.map(
      (jobId: any) => new mongoose.Types.ObjectId(jobId)
    );

    const jobs = await Job.find({ _id: { $in: jobIds } }).populate({
      path: "user",
      model: "User",
      select: "name"
    });

    if (!jobs.length) {
      return NextResponse.json(
        { status: "error", message: "No jobs found for the applied IDs." },
        { status: 404 }
      );
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
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      company_name:
        typeof job.user === "object" && "name" in job.user
          ? job.user.name
          : "Unknown Company"
    }));

    return NextResponse.json({
      status: true,
      message: "Applied jobs fetched successfully.",
      data: formattedJobs
    });
  } catch (error) {
    return handleError(error);
  }
}
