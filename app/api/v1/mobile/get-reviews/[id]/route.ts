import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import mongoose  from 'mongoose';

/**
 * @swagger
 * /api/v1/reviews/user-reviews/{userId}:
 *   get:
 *     summary: Get user reviews
 *     description: Fetches reviews for a specific user, including details of all employers who provided reviews.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user whose reviews are being fetched.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched user reviews.
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
 *                   example: Reviews fetched successfully...
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Employer ID.
 *                       name:
 *                         type: string
 *                         description: Employer name.
 *                       profilePhoto:
 *                         type: string
 *                         description: Employer profile photo URL.
 *                       rating:
 *                         type: number
 *                         description: Rating given by the employer.
 *                       review:
 *                         type: string
 *                         description: Review content.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    let { userId } = params;

    if (!userId) {
      return NextResponse.json({ error: "Invalid input!" }, { status: 400 });
    }

    await connectToMongoDB();
    userId = new mongoose.Types.ObjectId(userId);


    const user = await User.findById(userId).populate({
      path: "reviews_from_employers._id", 
      model: "User",
      select: "name profilePhoto", 
    });

    if (!user) {
      return NextResponse.json({ status: "error", message: "User not found!" }, { status: 404 });
    }


    const reviews = user.reviews_from_employers.map((review: any) => ({
      _id: review._id?._id, 
      name: review._id?.name, 
      profilePhoto: review._id?.profilePhoto, 
      rating: review.rating, 
      review: review.review, 
    }));

    return NextResponse.json({
      status: "success",
      message: "Reviews fetched successfully...",
      data: reviews,
    });
  } catch (error) {
    return handleError(error);
  }
}