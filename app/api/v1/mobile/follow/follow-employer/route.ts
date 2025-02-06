import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import mongoose  from 'mongoose';
import { authMiddleware } from "@/app/api/middleware/auth";
/**
 * @swagger
 * /api/v1/mobile/follow/follow-employer:
 *   post:
 *     summary: Follow an employer
 *     description: Allows a user to follow an employer. Authentication is required for this operation.
 *     tags:
 *       - Follow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user who wants to follow the employer.
 *               employerId:
 *                 type: string
 *                 description: ID of the employer to be followed.
 *     responses:
 *       200:
 *         description: Successfully followed the employer.
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
 *                   example: Followed successfully
 *       400:
 *         description: Invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input!
 *       401:
 *         description: Authentication required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Authentication required
 */

export async function POST(request: NextRequest) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }
    
    const formData = await request.formData();
    const employerId = formData.get('employerId')?.toString();

    if (!employerId) {
      return NextResponse.json({ status: false, message: "Invalid input!"}, { status: 400 });
    }

    await connectToMongoDB();
    const userObjectId = new mongoose.Types.ObjectId(authUser.userId);
    const employerObjectId = new mongoose.Types.ObjectId(employerId);
    console.log(userObjectId, employerObjectId)

    const user = await User.findById(userObjectId);
    if (!user) {
      return NextResponse.json({ status: false, message: "User not found!" }, { status: 404 });
    }
    
    const employer = await User.findById(employerObjectId);
    if (!employer) {
      return NextResponse.json({ status: false, message: "Employer not found!"}, { status: 404 });
    }

    if (!user.following.includes(employerObjectId.toString())) {
      user.following.push(employerObjectId.toString());
      await user.save();
    }

    if (!employer.followers.includes(userObjectId.toString())) {
      employer.followers.push(userObjectId.toString());
      await employer.save();
    }

    return NextResponse.json({
      status: true,
      message: "Followed successfully",
    });
  } catch (error) {
    return handleError(error);
  }
}