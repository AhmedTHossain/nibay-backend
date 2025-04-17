import { handleError } from "@/lib/handleErrors";
import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import User from "../../../models/user";
import { authMiddleware } from "../../../middleware/auth";
import Job from "../../../models/job";
import { Applicant } from "@/utils/types/applicant";

/**
 * @swagger
 * /api/v1/reviews/pending:
 *   get:
 *     summary: Get pending reviews
 *     description: Fetches a list of applicants who have been accepted for jobs but have not been reviewed within the last three months.
 *     tags:
 *       - Reviews
 *     responses:
 *       200:
 *         description: Successfully fetched pending reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Applicant ID.
 *                       name:
 *                         type: string
 *                         description: Applicant name.
 *                       email:
 *                         type: string
 *                         description: Applicant email.
 *                       phone:
 *                         type: string
 *                         description: Applicant phone number.
 *                       address:
 *                         type: string
 *                         description: Applicant address (division and district).
 *                       role:
 *                         type: number
 *                         description: Applicant role.
 *                       jobId:
 *                         type: string
 *                         description: Job ID.
 *                       jobTitle:
 *                         type: string
 *                         description: Job title.
 *                       jobRole:
 *                         type: string
 *                         description: Job role.
 *                       jobShortDescription:
 *                         type: string
 *                         description: Short description of the job.
 *                       profilePhoto:
 *                         type: string
 *                         description: URL of the applicant's profile photo.
 *                       statusChangeDate:
 *                         type: string
 *                         format: date-time
 *                         description: Date when the application status was changed.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */

const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

export async function GET(request: Request) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const jobs = await Job.find({ user: user?._id });

    const results = [];
    for (const job of jobs) {
      const application = job.applicants.find(
        (item) =>
          item.applicationStatus === "ACCEPTED" &&
          item.statusChangeDate.getTime() <= threeMonthsAgo.getTime() &&
          item.review === null
      );

      if (application) {
        const applicant = await User.findById(application.applicant.id);

        if (applicant)
          results.push({
            _id: applicant.id,
            name: applicant.name,
            email: applicant.email,
            phone: applicant.phone,
            address: applicant.division + ", " + applicant.district,
            role: Number(applicant.role),
            jobId: job.id,
            jobTitle: job.title,
            jobRole: job.jobRole,
            jobShortDescription: job.shortDescription,
            profilePhoto: applicant.profilePhoto,
            statusChangeDate: application.statusChangeDate
          } as Applicant);
      }
    }

    // const reviewableUsers = await User.find({
    //   applicationStatus: "ACCEPTED",
    //   statusChangeDate: { $lte: threeMonthsAgo }
    // });

    return NextResponse.json({ status: "success", data: results });
  } catch (error) {
    return handleError(error);
  }
}
