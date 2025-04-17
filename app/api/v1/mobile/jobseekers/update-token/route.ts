import { handleError } from "@/lib/handleErrors";
import { connectToMongoDB } from "@/lib/database";
import User from "../../../../models/user";
import { authMiddleware } from "../../../../middleware/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/mobile/jobseekers/update-token:
 *   post:
 *     summary: Update FCM token for a jobseeker
 *     description: Allows a jobseeker to update their FCM (Firebase Cloud Messaging) token for receiving notifications.
 *     tags:
 *       - Jobseekers
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fcm_token:
 *                 type: string
 *                 description: The FCM token to be updated.
 *     responses:
 *       200:
 *         description: FCM token updated successfully.
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
 *                   example: FCM token updated successfully!
 *       400:
 *         description: FCM token is missing in the request.
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
 *                   example: FCM token is required
 *       404:
 *         description: User not found.
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
 *                   example: User not found!
 *       500:
 *         description: Internal server error.
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
 */


export async function POST(request: NextRequest) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    const formData = await request.formData();
    const fcm_token = formData.get("fcm_token");
    if (!fcm_token) {
      return NextResponse.json(
        { status: false, message: "FCM token is required" },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json(
        { status: false, message: "User not found!" },
        { status: 404 }
      );
    }

    user.fcm_token = fcm_token as string;
    await user.save();

    return NextResponse.json(
      { status: true, message: "FCM token updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { status: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}