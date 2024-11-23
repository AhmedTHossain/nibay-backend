"use server";

import { connectToMongoDB } from "@/lib/database";
import { revalidatePath } from "next/cache";
import User from "@/api/models/user";

export const createUser = async (formData: FormData) => {
  await connectToMongoDB();
  const name = formData.get("name");
  const email = formData.get("email");
  try {
    const newUser = await User.create({
      name,
      email
    });

    newUser.save();
    revalidatePath("/");
    return newUser.toString();
  } catch (error) {
    console.log(error);
    return { message: "error creating user" };
  }
};
