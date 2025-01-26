import { handleError } from "@/lib/handleErrors";
import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import User from "../../../models/user";
import { authMiddleware } from "../../../middleware/auth";

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


export async function POST(request: Request) {
  try {
    // Parse the form data from the request
    const formData = await request.formData();

    // Extract the `id` field from the form data
    const id = (formData.get("id") as string) || null;

    // Log the extracted ID for debugging
    console.log("Extracted ID:", id);

    // Validate the ID
    if (!id) {
      return NextResponse.json(
        {
          status: false,
          message: "ID is required in the request body",
          data: {},
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToMongoDB();

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        {
          status: false,
          message: "User not found!",
          data: {},
        },
        { status: 404 }
      );
    }

    // Return the user data
    return NextResponse.json({
      status: true,
      message: "User details retrieved successfully",
      data: { user },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Details not found",
        data: {},
      },
      { status: 500 }
    );
  }
}