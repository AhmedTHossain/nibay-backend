import { handleError } from "@/lib/handleErrors";
import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import User from "../../../models/user";
import { authMiddleware } from "../../../middleware/auth";
import { TUser } from "@/utils/types/user";
import { processFile } from "@/lib/processFile";

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
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: { user }
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error",
        data: {}
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    const formData = await request.formData();

    const name = (formData.get("name") as string) || null;
    const role = (formData.get("role") as string) || null;
    const phone = (formData.get("phone") as string) || null;
    const division = (formData.get("division") as string) || null;
    const district = (formData.get("district") as string) || null;
    const nidNumber = (formData.get("nidNumber") as string) || null;
    const maxEducationLevel =
      (formData.get("maxEducationLevel") as string) || null;
    const drivingLicense = (formData.get("drivingLicense") as string) || null;
    const yearsOfExperience =
      (formData.get("yearsOfExperience") as string) || null;
    const profilePhoto =
      (formData.get("profilePhoto") as File | string | null) || null;
    const nidCopy = (formData.get("nidCopy") as File | string | null) || null;
    const drivingLicenseCopy =
      (formData.get("drivingLicenseCopy") as File | string | null) || null;
    const chairmanCertificate =
      (formData.get("chairmanCertificateCopy") as File | string | null) || null;
    const portEntryPermit =
      (formData.get("portEntryPermit") as File | string | null) || null;

    await connectToMongoDB();

    const user = await User.findById(authUser.userId).select("+password");

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    let profilePhotoLocation = user.profilePhoto;
    let nidCopyLocation = user.nidCopy;
    let drivingLicenseCopyLocation = user.drivingLicenseCopy;
    let chairmanCertificateCopyLocation = user.chairmanCertificateCopy;
    let portEntryPermitLocation = user.portEntryPermit;

    if (profilePhoto) {
      profilePhotoLocation = await processFile(profilePhoto as File);
    }
    if (nidCopy) {
      nidCopyLocation = await processFile(nidCopy as File);
    }
    if (drivingLicenseCopy) {
      drivingLicenseCopyLocation = await processFile(drivingLicenseCopy as File);
    }
    if (chairmanCertificate) {
      chairmanCertificateCopyLocation = await processFile(
        chairmanCertificate as File
      );
    }
    if (portEntryPermit) {
      portEntryPermitLocation = await processFile(portEntryPermit as File);
    }

    const updateFields: any = {};

    if (name) updateFields.name = name;
    if (role) updateFields.role = role;
    if (phone) updateFields.phone = phone;
    if (division) updateFields.division = division;
    if (district) updateFields.district = district;
    if (nidNumber) updateFields.nidNumber = nidNumber;
    if (maxEducationLevel) updateFields.maxEducationLevel = maxEducationLevel;
    if (drivingLicense) updateFields.drivingLicense = drivingLicense;
    if (yearsOfExperience) updateFields.yearsOfExperience = yearsOfExperience;
    if (profilePhotoLocation) updateFields.profilePhoto = profilePhotoLocation;
    if (nidCopyLocation) updateFields.nidCopy = nidCopyLocation;
    if (drivingLicenseCopyLocation)
      updateFields.drivingLicenseCopy = drivingLicenseCopyLocation;
    if (chairmanCertificateCopyLocation)
      updateFields.chairmanCertificateCopy = chairmanCertificateCopyLocation;
    if (portEntryPermitLocation)
      updateFields.portEntryPermit = portEntryPermitLocation;

    await User.findOneAndUpdate({ _id: authUser.userId }, updateFields, {
      new: true,
      runValidators: true
    });

    return NextResponse.json({
      status: "success",
      message: "User updated successfully!"
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error",
        data: {}
      },
      { status: 500 }
    );
  }
}