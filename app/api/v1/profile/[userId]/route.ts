import { authMiddleware } from "@/app/api/middleware/auth";
import User from "@/app/api/models/user";
import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";

interface TUserParams {
  params: {
    userId: string;
  };
}

/**
 * @swagger
 * /profile/{userId}:
 *   delete:
 *     summary: Delete a user profile
 *     description: Deletes a specific user profile by user ID. Authentication is required for this operation.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user to delete.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile successfully deleted.
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
 *                   example: User profile deleted
 *       401:
 *         description: Unauthorized access due to invalid or missing token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized access.
 *       404:
 *         description: The user specified by the `userId` or the authenticated user was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating either the target user or the authenticated user is not found.
 *                   example: findUser not found!
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A generic error message.
 *                   example: Internal server error.
 */
export async function DELETE(request: NextRequest, { params }: TUserParams) {
  try {
    const userId = params.userId;

    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json(
        { error: "You are not authenticated" },
        { status: 404 }
      );
    }

    const findUser = await User.findById(userId);
    if (!findUser) {
      return NextResponse.json(
        { error: "findUser not found!" },
        { status: 404 }
      );
    }

    await User.deleteOne({ _id: findUser });

    return NextResponse.json({
      status: "success",
      message: "এই চাকরিটি বাতিল করে দেওয়া হয়েছে!"
    });
  } catch (error) {
    return handleError(error);
  }
}
