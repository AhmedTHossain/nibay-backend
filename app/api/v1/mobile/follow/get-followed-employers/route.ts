import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import mongoose from 'mongoose';
import { authMiddleware } from "@/app/api/middleware/auth";

/**
 * @swagger
 * /api/v1/mobile/follow/get-followed-employers/{userId}:
 *   get:
 *     summary: Get followed employers
 *     description: Retrieves all employers that a user follows. Authentication is required.
 *     tags:
 *       - Follow
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose followed employers are to be retrieved
 *     responses:
 *       200:
 *         description: Successfully retrieved followed employers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "676c3418373c777f97bb2035"
 *                       name:
 *                         type: string
 *                         example: "test company name"
 *                       email:
 *                         type: string
 *                         example: "company@example.com"
 *                       profilePhoto:
 *                         type: string
 *                         example: "data:image/jpeg;base64,/9j/4QAYRXhpZ..."
 */

export async function GET(request: NextRequest) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    const { userId } = authUser;
    if (!userId) {
      return NextResponse.json({ error: "Invalid input!" }, { status: 400 });
    }

    await connectToMongoDB();
    const objectId = new mongoose.Types.ObjectId(userId);

    const user = await User.findById(objectId)
      .populate({
        path: 'following',
        select: '_id name email profilePhoto', 
        model: User
      });

    if (!user) {
      return NextResponse.json({ message: false }, { status: 400 });
    }

    return NextResponse.json({
      status: true,
      data: user.following
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: false,
      data: {}
    });
  }
}