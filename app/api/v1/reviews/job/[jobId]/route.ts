import { authMiddleware } from "@/app/api/middleware/auth";
import Job from "@/app/api/models/job";
import User from "@/app/api/models/user";
import { USER_ROLE } from "@/lib/constant";
import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/reviews/job/{jobId}:
 *   post:
 *     summary: Submit a review for an applicant
 *     description: Allows an employer to submit a review for an applicant who applied for a specific job.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: ID of the job for which the review is being submitted.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicantId:
 *                 type: string
 *                 description: ID of the applicant being reviewed.
 *               review:
 *                 type: object
 *                 properties:
 *                   rating:
 *                     type: number
 *                     description: Rating given to the applicant.
 *                   feedback:
 *                     type: string
 *                     description: Feedback for the applicant.
 *     responses:
 *       200:
 *         description: Review successfully submitted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       404:
 *         description: User, job, or application not found.
 *       500:
 *         description: Server error.
 */
interface TJobParams {
  params: {
    jobId: string;
  };
}
export async function POST(request: NextRequest, { params }: TJobParams) {
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
    const { applicantId, review } = await request.json();
    const jobId = params.jobId;
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found!" }, { status: 404 });
    }
    const application = job.applicants.find(
      (item) => item.applicant.id === applicantId
    );
    if (!application) {
      return NextResponse.json(
        { error: "Application not found!" },
        { status: 404 }
      );
    }
    const session = await Job.startSession();
    session.startTransaction();
    try {
      application.review = review;
      application.reviewCreatedDate = new Date();
      job.markModified("applicants");
      await job.save({ session });
      const applicant = await User.findById(applicantId).session(session);
      if (!applicant) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json(
          { error: "Applicant not found!" },
          { status: 404 }
        );
      }
      applicant.reviews_from_employers.push({
        jobId: jobId,
        rating: review.rating,
        feedback: review.feedback,
        createdAt: application.reviewCreatedDate,
        reviewerId: user._id
      });
      applicant.markModified("reviews_from_employers");
      await applicant.save({ session });
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
    return NextResponse.json({ status: "success" });
  } catch (error) {
    return handleError(error);
  }
}
