import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { uploadFile, uploadFileMiddleware } from "@/lib/upload";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "../models/user";

export async function register(request: Request) {
  try {
    const { name, email, password, role, phone, address, division, district } =
      await request.json();

    await connectToMongoDB();

    console.log("-------- fahim", await request.json());

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const req: any = request as any;
    const res: any = {};
    await uploadFileMiddleware(req, res, uploadFile.single("image"));

    const image = req.file;
    if (!image) {
      return NextResponse.json(
        { success: false, error: "No file provided." },
        { status: 400 }
      );
    }

    // Convert the file buffer to a base64 string
    const base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
      division,
      district,
      file: base64Image
    });

    return NextResponse.json({ user: newUser });
  } catch (error) {
    handleError(error);
  }
}
