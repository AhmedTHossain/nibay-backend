import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import Job from "../../../../models/job";
import { handleError } from "@/lib/handleErrors";
/**
 * @swagger
 * /api/v1/mobile/jobs/get-jobs:
 *   get:
 *     summary: Retrieve a list of job posts
 *     description: Get a list of jobs with optional filters like `title`, `employerType`, and sorting by `orderBy`.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - name: title
 *         in: query
 *         description: Filter jobs by title (case-insensitive).
 *         required: false
 *         schema:
 *           type: string
 *           example: Software
 *       - name: employerType
 *         in: query
 *         description: Filter jobs by employer type (e.g., "Institutional", "Individual").
 *         required: false
 *         schema:
 *           type: string
 *           example: PartTime
 *       - name: orderBy
 *         in: query
 *         description: |
 *           Sort jobs by a specific field. Use '-' for descending order (default: `-createdAt`).
 *         required: false
 *         schema:
 *           type: string
 *           example: '-createdAt'
 *       - name: page
 *         in: query
 *         description: |
 *           Page number for pagination (default: 1).
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: pageSize
 *         in: query
 *         description: |
 *           Number of results per page (default: 10).
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       '200':
 *         description: Successful response with a list of jobs.
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
 *                   example: Jobs fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 676a9fd354b7646db136d012
 *                       title:
 *                         type: string
 *                         example: "ভারী ট্রাক ড্রাইভার"
 *                       shortDescription:
 *                         type: string
 *                         example: "চট্টগ্রাম বন্দর থেকে পণ্য পরিবহন করে বাংলাদেশের সকল জেলায় নিরাপদে এবং সময়মত পৌঁছানোর দায়িত্ব।"
 *                       longDescription:
 *                         type: string
 *                         example: "চাকরির বিবরণ:\n\nবাংলাদেশের সকল জেলায় পণ্য পরিবহন নিশ্চিত করতে চট্টগ্রাম বন্দর থেকে ভারী ট্রাকে পণ্য পরিবহন করা।"
 *                       experience:
 *                         type: string
 *                         example: 5-7
 *                       qualification:
 *                         type: string
 *                         example: Secondary (SSC)
 *                       applicationDeadline:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-12-31T11:42:00.000Z
 *                       location:
 *                         type: string
 *                         example: চট্টগ্রাম, চট্টগ্রাম
 *                       salary:
 *                         type: string
 *                         example: "৩৫,০০০"
 *                       jobRole:
 *                         type: string
 *                         example: ড্রাইভার
 *                       jobType:
 *                         type: string
 *                         example: ফুল টাইম
 *                       user:
 *                         type: string
 *                         example: 6769c973c7f8010dfa1b7cf3
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-12-24T11:49:39.693Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-12-24T18:42:16.102Z
 *       '400':
 *         description: Bad Request - Missing or invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid query parameters.
 *                 error:
 *                   type: string
 *                   example: Bad Request
 *       '500':
 *         description: Internal Server Error - Unexpected error during the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: string
 *                   example: Database connection failed
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const orderBy = searchParams.get("orderBy") || "-createdAt";
    const title = searchParams.get("title");
    const employerType = searchParams.get("employerType");
    const employerId = searchParams.get("employer_id");
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);

    await connectToMongoDB();

    let query = Job.find();

    if (title) {
      query = query.where("title").regex(new RegExp(title, "i"));
    }

    if (employerType) {
      query = query.where("employerType").equals(employerType);
    }

    if (employerId) {
      query = query.where("employerId").equals(employerId);
    }

    const jobs = await query
      .sort(orderBy) // Sorting
      .limit(pageSize) // Pagination: Limit
      .skip((page - 1) * pageSize) // Pagination: Skip
      // .populate("user", "name email phone") // Populate the "user" field with specific properties
      .lean(); // Convert MongoDB documents to plain JavaScript objects

    return NextResponse.json({
      status: true,
      message: "Jobs fetched successfully",
      data: jobs
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: "Jobs fetching was failed",
      data: {}
    });
  }
}
