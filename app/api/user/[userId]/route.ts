import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "../../models/user";
import { uploadFile, uploadFileMiddleware } from "@/lib/upload";

interface TUserParams {
  params: { userId: string };
}

export async function PATCH(request: NextRequest, { params }: TUserParams) {
  try {
    const userId = params.userId;

    await connectToMongoDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const formData = await request.formData();

    const name = (formData.get("name") as string) || null;
    const division = (formData.get("division") as string) || null;
    const district = (formData.get("district") as string) || null;
    const organizationType =
      (formData.get("organizationType") as string) || null;
    const phone = (formData.get("phone") as string) || null;
    const organizationContactPerson =
      (formData.get("organizationContactPerson") as string) || null;
    const address = (formData.get("address") as string) || null;
    const email = (formData.get("email") as string) || null;
    let file = (formData.get("image") as File | string | null) || null;

    if (file === "null") file = null;

    let image = user.file;
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
        file: image
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: "User updated successfully"
    });
  } catch (error) {
    return handleError(error);
  }
}
