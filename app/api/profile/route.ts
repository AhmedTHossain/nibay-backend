import { handleError } from "@/lib/handleErrors";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const authUser = authMiddleware(request);
    // if (authUser instanceof NextResponse) {
    //   return authUser;
    // }

    // await connectToMongoDB();

    // const user = await User.findById(authUser.userId);
    // if (!user) {
    //   return NextResponse.json({ error: "User not found!" }, { status: 404 });
    // }

    return NextResponse.json({ success: true });
  } catch (error) {
    handleError(error);
  }
}
