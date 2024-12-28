import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import { updateUserAccount, updateUserPassword } from "../settings";
import User from "@/app/api/models/user";

interface TUserParams {
  params: { userId: string };
}
/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     summary: Update user account information
 *     description: Updates the account details for a specific user. Requires authentication.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *               division:
 *                 type: string
 *                 description: The user's division.
 *               district:
 *                 type: string
 *                 description: The user's district.
 *               organizationType:
 *                 type: string
 *                 description: The type of organization, if applicable.
 *               phone:
 *                 type: string
 *                 description: The user's phone number.
 *               organizationContactPerson:
 *                 type: string
 *                 description: The contact person for the user's organization.
 *               address:
 *                 type: string
 *                 description: The user's address.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The user's profile photo.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User successfully updated.
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
 *                   example: ইউজার আপডেট সফল হয়েছে!
 *       400:
 *         description: Bad request. Validation error or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Validation failed.
 *       401:
 *         description: Unauthorized access due to missing or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized access.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error.
 */

export async function PATCH(request: NextRequest, { params }: TUserParams) {
  try {
    const userId = params.userId;

    await connectToMongoDB();

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const formData = await request.formData();
    const key = formData.get("key") as string;

    switch (key) {
      case "account":
        return updateUserAccount(request, user, formData, userId);
      case "password":
        return updateUserPassword(user, formData, userId);
      default:
        return NextResponse.json({ message: "Invalid key" }, { status: 400 });
    }
  } catch (error) {
    return handleError(error);
  }
}
