import { uploadFile, uploadFileMiddleware } from "@/lib/upload";
import { TUser } from "@/utils/types/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "../../models/user";

export async function updateUserAccount(
  request: NextRequest,
  user: TUser,
  formData: FormData,
  userId: string
) {
  const name = (formData.get("name") as string) || null;
  const division = (formData.get("division") as string) || null;
  const district = (formData.get("district") as string) || null;
  const organizationType = (formData.get("organizationType") as string) || null;
  const phone = (formData.get("phone") as string) || null;
  const organizationContactPerson =
    (formData.get("organizationContactPerson") as string) || null;
  const address = (formData.get("address") as string) || null;
  const email = (formData.get("email") as string) || null;
  let file = (formData.get("image") as File | string | null) || null;

  if (file === "null") file = null;

  let image = user.profilePhoto;
  if (file !== null) {
    // eslint-disable-next-line
    // @ts-ignore
    await uploadFileMiddleware(request, {}, uploadFile.single("image"));
    const buffer = await (file as File).arrayBuffer();
    image = `data:${(file as File).type};base64,${Buffer.from(buffer).toString("base64")}`;
  }

  await User.findOneAndUpdate(
    { _id: userId },
    {
      name,
      division,
      district,
      organizationContactPerson,
      organizationType,
      phone,
      address,
      email,
      profilePhoto: image
    },
    { new: true, runValidators: true }
  );

  return NextResponse.json({
    status: "success",
    message: "ইউজার আপডেট সফল হয়েছে!"
  });
}

export async function updateUserPassword(
  user: TUser,
  formData: FormData,
  userId: string
) {
  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!oldPassword || !newPassword)
    return NextResponse.json({ message: "Field is required" }, { status: 400 });

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { error: "Old password is not correct!" },
      { status: 400 }
    );
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await User.findOneAndUpdate(
    { _id: userId },
    {
      password: hashedNewPassword
    },
    { new: true, runValidators: true }
  );

  return NextResponse.json({
    status: "success",
    message: "Password updated successfully"
  });
}
