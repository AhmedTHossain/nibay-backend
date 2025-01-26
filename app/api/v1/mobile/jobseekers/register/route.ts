import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { processFile } from "@/lib/processFile";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user";

/**
 * @swagger
 * /api/mobile-register:
 *   post:
 *     summary: Mobile Registration
 *     description: Register a new user with required and optional fields.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: phone
 *         required: true
 *         description: Mobile number of the user.
 *         type: string
 *       - in: formData
 *         name: name
 *         required: true
 *         description: Full name of the user.
 *         type: string
 *       - in: formData
 *         name: role
 *         required: true
 *         description: Role of the user. (Stored as a number)
 *         type: string
 *       - in: formData
 *         name: nidNumber
 *         required: true
 *         description: NID number of the user.
 *         type: string
 *       - in: formData
 *         name: nidPhoto
 *         required: true
 *         description: NID photo of the user.
 *         type: file
 *       - in: formData
 *         name: deviceID
 *         required: true
 *         description: Device ID of the user's mobile.
 *         type: string
 *       - in: formData
 *         name: drivingLicense
 *         required: false
 *         description: Driving license number of the user.
 *         type: string
 *       - in: formData
 *         name: drivingLicensePhoto
 *         required: false
 *         description: Driving license photo of the user.
 *         type: file
 *       - in: formData
 *         name: maxEducationLevel
 *         required: false
 *         description: Highest education level of the user. (Stored as a number)
 *         type: string
 *       - in: formData
 *         name: maxEducationLevelCopy
 *         required: false
 *         description: Copy of highest education level document.
 *         type: file
 *       - in: formData
 *         name: profilePhoto
 *         required: false
 *         description: Profile photo of the user.
 *         type: file
 *       - in: formData
 *         name: birthCertificate
 *         required: false
 *         description: Birth certificate number of the user.
 *         type: string
 *       - in: formData
 *         name: portEntryPermit
 *         required: false
 *         description: Port entry permit number of the user.
 *         type: string
 *       - in: formData
 *         name: division
 *         required: false
 *         description: Division of the user.
 *         type: string
 *       - in: formData
 *         name: district
 *         required: false
 *         description: District of the user.
 *         type: string
 *       - in: formData
 *         name: yearsOfExperience
 *         required: false
 *         description: Years of experience of the user.
 *         type: string
 *     responses:
 *       200:
 *         description: User successfully registered.
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             data:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: number
 *                     nid_number:
 *                       type: string
 *                     nid_photo:
 *                       type: string
 *                     driving_license_number:
 *                       type: string
 *                       nullable: true
 *                     driving_license_photo:
 *                       type: string
 *                       nullable: true
 *                     max_education_level:
 *                       type: number
 *                       nullable: true
 *                     max_education_level_copy:
 *                       type: string
 *                       nullable: true
 *                     profile_photo:
 *                       type: string
 *                       nullable: true
 *                     birth_certificate:
 *                       type: string
 *                       nullable: true
 *                     port_entry_permit:
 *                       type: string
 *                       nullable: true
 *                     division:
 *                       type: string
 *                       nullable: true
 *                     district:
 *                       type: string
 *                       nullable: true
 *                     years_of_experience:
 *                       type: number
 *                       nullable: true
 *                     is_mobile_user:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Bad request (e.g., missing required fields or duplicate user).
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: User already exists with this phone number!
 */

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const phone = (formData.get("phone") as string) || null;
    const deviceID = (formData.get("deviceID") as string) || null;
    const name = (formData.get("name") as string) || null;
    const role = (formData.get("role") as string) || null;
    const nidNumber = (formData.get("nidNumber") as string) || null;
    const nidPhoto = (formData.get("nidPhoto") as File | null) || null;
    const drivingLicense = (formData.get("drivingLicense") as string) || null;
    const drivingLicensePhoto =
      (formData.get("drivingLicensePhoto") as File | null) || null;
    const maxEducationLevel =
      (formData.get("maxEducationLevel") as string) || null;
    const maxEducationLevelCopy =
      (formData.get("maxEducationLevelCopy") as File | null) || null;
    const profilePhoto =
      (formData.get("profilePhoto") as File | null) || null;
    const birthCertificate = (formData.get("birthCertificate") as File) || null;
    const portEntryPermit = (formData.get("portEntryPermit") as File) || null;
    const division = (formData.get("division") as string) || null;
    const district = (formData.get("district") as string) || null;
    const yearsOfExperience = (formData.get("yearsOfExperience") as string) || null;

    if (!phone || !deviceID || !name || !role || !nidNumber || !nidPhoto) {
      return NextResponse.json({
        status: false,
        message: "Requirements not fulfilled!",
        data: {},
      });
    }

    await connectToMongoDB();

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json({
        status: false,
        message: "User already exists with this phone number!",
        data: {},
      });
    }

    const nidPhotoPath = await processFile(nidPhoto);
    const drivingLicensePhotoPath = drivingLicensePhoto
      ? await processFile(drivingLicensePhoto)
      : null;
    const profilePhotoPath = profilePhoto
      ? await processFile(profilePhoto)
      : null;
    const maxEducationLevelCopyPath = maxEducationLevelCopy
      ? await processFile(maxEducationLevelCopy)
      : null;
    const birthCertificatePath = birthCertificate
      ? await processFile(birthCertificate)
      : null;
    const portEntryPermitPath = portEntryPermit
      ? await processFile(portEntryPermit)
      : null;

    const newUser = await User.create({
      phone,
      name,
      role: Number(role),
      nidNumber,
      nidCopy: nidPhotoPath,
      drivingLicense,
      drivingLicenseCopy: drivingLicensePhotoPath,
      maxEducationLevel: maxEducationLevel
        ? Number(maxEducationLevel)
        : undefined,
      maxEducationLevelCopy: maxEducationLevelCopyPath,
      profilePhoto: profilePhotoPath,
      birthCertificate: birthCertificatePath,
      portEntryPermit: portEntryPermitPath,
      division,
      district,
      yearsOfExperience: yearsOfExperience ? Number(yearsOfExperience) : undefined,
      deviceID,
      isMobileUser: true,
    });

    return NextResponse.json({
      status: true,
      message: "Registration Successful!",
      data: {
        user: {
          id: newUser._id,
          phone: newUser.phone,
          name: newUser.name,
        },
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: "Registration unsuccessful!",
      data: {},
    });
  }
}