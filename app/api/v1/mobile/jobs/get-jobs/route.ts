import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import Job from "@/app/api/models/job";
import { handleError } from "@/lib/handleErrors";

/**
 * @swagger
 * /api/v1/mobile/jobs/get-jobs:
 *   get:
 *     summary: Get jobs
 *     description: Retrieve a list of jobs with optional filters.
 *     parameters:
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Field to order by (default: -createdAt)
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Job title to filter by
 *       - in: query
 *         name: employerType
 *         schema:
 *           type: string
 *         description: Employer type to filter by
 *       - in: query
 *         name: employer_id
 *         schema:
 *           type: string
 *         description: Employer ID to filter by
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of jobs per page (default: 10)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default: 1)
 *     responses:
 *       '200':
 *         description: A list of jobs
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
 *                         example: 678e58763721ebb114a828e2
 *                       title:
 *                         type: string
 *                         example: সেরা রাইডস লিমিটেডে চেকার নিয়োগ
 *                       shortDescription:
 *                         type: string
 *                         example: সেরা রাইডস লিমিটেডে চেকার নিয়োগ। টিকিট যাচাই এবং যাত্রী পরামর্শের জন্য অভিজ্ঞতা এবং মনোযোগ প্রয়োজন।
 *                       longDescription:
 *                         type: string
 *                         example: "\nদায়িত্বসমূহ:\n\nযাত্রীদের টিকিট যাচাই করা\nরুট এবং গন্তব্য নিশ্চিত করা\nযাত্রীদের সঠিক পরামর্শ প্রদান করা\nট্রিপের সময়সূচি তদারকি করা\n\nযোগ্যতা:\n\nমাধ্যমিক বা উচ্চ মাধ্যমিক শিক্ষাগত যোগ্যতা\nটিকিট যাচাই ও যাত্রী সেবা কাজে অভিজ্ঞতা\nসঠিক মনোযোগ এবং যোগাযোগ দক্ষতা\n\nবেতন এবং সুবিধা:\n\nআকর্ষণীয় বেতন\nঅন্যান্য সুবিধা: [যতটুকু প্রযোজ্য]"
 *                       experience:
 *                         type: string
 *                         example: 3-4
 *                       qualification:
 *                         type: string
 *                         example: NO_FORMAL_EDUCATION
 *                       applicationDeadline:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-03-15T00:00:00.000Z
 *                       salary:
 *                         type: string
 *                         example: 0
 *                       jobRole:
 *                         type: string
 *                         example: চেকার
 *                       isBirthCertificateRequired:
 *                         type: boolean
 *                         example: false
 *                       isPortEntryPermitRequired:
 *                         type: boolean
 *                         example: false
 *                       division:
 *                         type: string
 *                         example: বরিশাল
 *                       district:
 *                         type: string
 *                         example: ভোলা
 *                       applicants:
 *                         type: array
 *                         items:
 *                           type: string
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
 *         description: Internal server error
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
      .sort(orderBy)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .select("_id title shortDescription longDescription experience qualification applicationDeadline salary jobRole isBirthCertificateRequired isPortEntryPermitRequired division district");

    return NextResponse.json({
      status: true,
      message: "Jobs fetched successfully",
      data: jobs
    });
  } catch (error) {
    return handleError(error);
  }
}