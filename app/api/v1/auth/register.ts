import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { uploadFile, uploadFileMiddleware } from "@/lib/upload";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "../../models/user";

export async function register(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = (formData.get("name") as string) || null;
    const role = (formData.get("role") as string) || null;
    const division = (formData.get("division") as string) || null;
    const district = (formData.get("district") as string) || null;
    const organizationType =
      (formData.get("organizationType") as string) || null;
    const phone = (formData.get("phone") as string) || null;
    const organizationContactPerson =
      (formData.get("organizationContactPerson") as string) || null;
    const address = (formData.get("address") as string) || null;
    const email = (formData.get("email") as string) || null;
    const password = (formData.get("password") as string) || null;
    let profilePhoto =
      (formData.get("image") as File | string | null) || null;

    if (profilePhoto === "null") profilePhoto = null;

    await connectToMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Invalid credentials!" },
        { status: 400 }
      );
    }

    let image = null;

    if (profilePhoto !== null) {
      // eslint-disable-next-line
      // @ts-ignore
      await uploadFileMiddleware(request, {}, uploadFile.single("image"));
      const buffer = await (profilePhoto as File).arrayBuffer();
      image = `data:${(profilePhoto as File).type};base64,${Buffer.from(buffer).toString("base64")}`;
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: Number(role),
      phone,
      address,
      division,
      district,
      profilePhoto: image,
      organizationType,
      organizationContactPerson
    });

    return NextResponse.json({ status: "success", data: { user: newUser } });
  } catch (error) {
    return handleError(error);
  }
}

export async function mobileRegister(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = (formData.get("name") as string) || null;
    const role = (formData.get("role") as string) || null;
    const phone = (formData.get("phone") as string) || null;
    const nidNumber = (formData.get("nidNumber") as string) || null;
    const division = (formData.get("division") as string) || null;
    const district = (formData.get("district") as string) || null;
    const drivingLicense = (formData.get("drivingLicense") as string) || null;
    const maxEducationLevel =
      (formData.get("maxEducationLevel") as string) || null;
    const yearsOfExperience =
      (formData.get("yearsOfExperience") as string) || null;

    let profilePhoto = (formData.get("image") as File | string | null) || null;
    let nidCopy = (formData.get("nidCopy") as File | string | null) || null;
    let drivingLicenseCopy =
      (formData.get("drivingLicenseCopy") as File | string | null) || null;
    let maxEducationLevelCertificateCopy =
      (formData.get("maxEducationLevelCertificateCopy") as
        | File
        | string
        | null) || null;

    if (profilePhoto === "null") profilePhoto = null;
    if (nidCopy === "null") nidCopy = null;
    if (drivingLicenseCopy === "null") drivingLicenseCopy = null;
    if (maxEducationLevelCertificateCopy === "null")
      maxEducationLevelCertificateCopy = null;

    await connectToMongoDB();

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json(
        { error: "Invalid credentials!" },
        { status: 400 }
      );
    }

    let image = null,
      nidCopyFile = null,
      drivingLicenseCopyFile = null,
      maxEducationLevelCertificateCopyFile = null;

    if (profilePhoto !== null) {
      // eslint-disable-next-line
      // @ts-ignore
      await uploadFileMiddleware(request, {}, uploadFile.single("image"));
      const buffer = await (profilePhoto as File).arrayBuffer();
      image = `data:${(profilePhoto as File).type};base64,${Buffer.from(buffer).toString("base64")}`;
    }

    if (nidCopy !== null) {
      // eslint-disable-next-line
      // @ts-ignore
      await uploadFileMiddleware(request, {}, uploadFile.single("nidCopy"));
      const buffer = await (nidCopy as File).arrayBuffer();
      nidCopyFile = `data:${(nidCopy as File).type};base64,${Buffer.from(buffer).toString("base64")}`;
    }

    if (drivingLicenseCopy !== null) {
      // eslint-disable-next-line
      // @ts-ignore
      await uploadFileMiddleware(
        request,
        // eslint-disable-next-line
        // @ts-ignore
        {},
        uploadFile.single("drivingLicenseCopy")
      );
      const buffer = await (drivingLicenseCopy as File).arrayBuffer();
      drivingLicenseCopyFile = `data:${(drivingLicenseCopy as File).type};base64,${Buffer.from(buffer).toString("base64")}`;
    }

    if (maxEducationLevelCertificateCopy !== null) {
      // eslint-disable-next-line
      // @ts-ignore
      await uploadFileMiddleware(
        request,
        // eslint-disable-next-line
        // @ts-ignore
        {},
        uploadFile.single("maxEducationLevelCertificateCopy")
      );
      const buffer = await (
        maxEducationLevelCertificateCopy as File
      ).arrayBuffer();
      maxEducationLevelCertificateCopyFile = `data:${(maxEducationLevelCertificateCopy as File).type};base64,${Buffer.from(buffer).toString("base64")}`;
    }

    const newUser = await User.create({
      name,
      role: Number(role),
      phone,
      division,
      district,
      profilePhoto: image,
      nidNumber,
      maxEducationLevel: Number(maxEducationLevel),
      drivingLicense,
      yearsOfExperience,
      nidCopy: nidCopyFile,
      maxEducationLevelCertificateCopy: maxEducationLevelCertificateCopyFile,
      drivingLicenseCopy: drivingLicenseCopyFile
    });

    return NextResponse.json({
      status: "success",
      data: {
        user: {
          id: newUser._id,
          phone: newUser.phone,
          name: newUser.name,
          role: newUser.role,
          nid_number: newUser.nidNumber,
          nid_copy: newUser.nidCopy,
          driving_license_number: newUser.drivingLicense,
          driving_license_copy: newUser.drivingLicenseCopy,
          max_education_level: newUser.maxEducationLevel,
          max_education_level_certificate_copy:
            newUser.maxEducationLevelCertificateCopy
        }
      }
    });
  } catch (error) {
    return handleError(error);
  }
}
