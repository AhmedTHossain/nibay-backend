import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import Job from "../../../../../models/job";
import { handleError } from "@/lib/handleErrors";
/*************  ✨ Codeium Command ⭐  *************/
/**
 * @swagger
 * /api/v1/mobile/jobs/get-jobs/{id}:
 *   get:
 *     summary: Retrieve a job by its ID
 *     description: Fetches a single job post using the provided job ID.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the job to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the job details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Job fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 676a9fd354b7646db136d012
 *                     title:
 *                       type: string
 *                       example: "Software Engineer"
 *                     shortDescription:
 *                       type: string
 *                       example: "Develop and maintain software applications."
 *                     longDescription:
 *                       type: string
 *                       example: "Detailed job description goes here."
 *                     experience:
 *                       type: string
 *                       example: "3-5 years"
 *                     qualification:
 *                       type: string
 *                       example: "Bachelor's Degree in Computer Science"
 *                     applicationDeadline:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-31T11:42:00.000Z
 *                     location:
 *                       type: string
 *                       example: "San Francisco, CA"
 *                     salary:
 *                       type: string
 *                       example: "$120,000"
 *                     jobRole:
 *                       type: string
 *                       example: "Developer"
 *                     jobType:
 *                       type: string
 *                       example: "Full Time"
 *                     user:
 *                       type: string
 *                       example: "6769c973c7f8010dfa1b7cf3"
 *       '404':
 *         description: Job not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Job not found!
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

/******  012fb813-1a9f-46ab-b366-28d05c36123a  *******/


export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();

    const job = await Job.findById(params.id);

    if (!job) {
      return NextResponse.json({ error: "Job not found!" }, { status: 404 });
    }

    return NextResponse.json({
      status: true,
      message: "Job fetched successfully",
      data: job
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: "Job fetching failed",
      data: {}
    });
  }
}


