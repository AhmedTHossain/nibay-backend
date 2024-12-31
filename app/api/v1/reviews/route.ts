import { handleError } from "@/lib/handleErrors";
import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import User from "../../models/user";
import { authMiddleware } from "../../middleware/auth";
import Job from "../../models/job";

const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

export async function GET(request: Request) {
  try {
    const authUser = authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const jobs = await Job.find({ user: user?._id });

    const results = [];
    for (const job of jobs) {
      const applicant = job.applicants.find(
        (item) =>
          item.applicationStatus === "ACCEPTED" &&
          item.statusChangeDate.getTime() <= threeMonthsAgo.getTime()
      );

      if (applicant)
        results.push({
          ...applicant,
          job: {
            title: job.title
          }
        });
    }

    // const reviewableUsers = await User.find({
    //   applicationStatus: "ACCEPTED",
    //   statusChangeDate: { $lte: threeMonthsAgo }
    // });

    return NextResponse.json({ status: "success", data: results });
  } catch (error) {
    return handleError(error);
  }
}
