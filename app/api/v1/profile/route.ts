import { handleError } from "@/lib/handleErrors";
import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import User from "../../models/user";
import { authMiddleware } from "../../middleware/auth";

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Fetch authenticated user information
 *     description: Retrieves the details of the authenticated user based on the token provided in the request header.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: Unique user identifier.
 *                         name:
 *                           type: string
 *                           description: Name of the user.
 *                         email:
 *                           type: string
 *                           description: Email of the user.
 *                         role:
 *                           type: integer
 *                           description: User's role in the system.
 *       401:
 *         description: Unauthorized access due to invalid or missing token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Authentication error message.
 *                   example: Unauthorized access.
 *       404:
 *         description: No user found for the authenticated ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the user is not found.
 *                   example: User not found!
 *       500:
 *         description: An internal server error occurred.
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
export async function GET(request: Request) {
  try {
    const authUser = authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", data: { user } });
  } catch (error) {
    return handleError(error);
  }
}
