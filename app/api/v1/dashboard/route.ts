import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import { authMiddleware } from "@/app/api/middleware/auth";
import { USER_ROLE } from "@/lib/constant";
import Job from "../../models/job";
import { get } from "http";

function get_role(role: string) {
  return Object.keys(USER_ROLE).find(
    (key) => USER_ROLE[key as unknown as keyof typeof USER_ROLE].value === role
  );
}

export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof NextResponse) {
      return auth;
    }

    await connectToMongoDB();

    const authUser = await User.findById(auth.userId);
    if (!authUser) {
      return NextResponse.json(
        { error: "You are not authenticated" },
        { status: 404 }
      );
    }

    if (!authUser.isAdmin) {
      return NextResponse.json(
        { error: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    const totalJobs = await Job.countDocuments();
    const totalActiveJobs = await Job.countDocuments({
      applicationStatus: "ACTIVE"
    });

    let result = await Job.aggregate([
      {
        $addFields: {
          userIdObjectId: { $toObjectId: "$user" } // Convert the string `user` field to ObjectId
        }
      },
      {
        $lookup: {
          from: "users", // The collection to join with
          localField: "userIdObjectId", // Use the converted ObjectId field
          foreignField: "_id", // Field from the users collection (ObjectId)
          as: "userDetails" // Output array field
        }
      },
      {
        $unwind: "$userDetails" // Unwind the joined userDetails array
      },
      {
        $match: {
          "userDetails.role": get_role("INSTITUTION") // Filter users with role "10"
        }
      },
      {
        $count: "totalJobs" // Count the number of matching jobs
      }
    ]);

    const totalInstitutionJobs = result.length > 0 ? result[0].totalJobs : 0;

    result = await Job.aggregate([
      {
        $addFields: {
          userIdObjectId: { $toObjectId: "$user" } // Convert the string `user` field to ObjectId
        }
      },
      {
        $lookup: {
          from: "users", // The collection to join with
          localField: "userIdObjectId", // Use the converted ObjectId field
          foreignField: "_id", // Field from the users collection (ObjectId)
          as: "userDetails" // Output array field
        }
      },
      {
        $unwind: "$userDetails" // Unwind the joined userDetails array
      },
      {
        $match: {
          "userDetails.role": get_role("INDIVIDUAL") // Filter users with role "10"
        }
      },
      {
        $count: "totalJobs" // Count the number of matching jobs
      }
    ]);

    const totalIndividualJobs = result.length > 0 ? result[0].totalJobs : 0;

    const totalInstitutionEmployers = await User.countDocuments({
      role: get_role("INSTITUTION")
    });
    const totalIndividualEmployers = await User.countDocuments({
      role: get_role("INDIVIDUAL")
    });
    const totalEmployers = totalInstitutionEmployers + totalIndividualEmployers;
    const totalMobileUsers = await User.countDocuments({ isMobileUser: true });

    return NextResponse.json({
      status: "success",
      message: "User fetched",
      data: {
        totalJobs,
        totalActiveJobs,
        totalInstitutionEmployers,
        totalIndividualEmployers,
        totalEmployers,
        totalMobileUsers,
        totalInstitutionJobs,
        totalIndividualJobs
      }
    });
  } catch (error) {
    return handleError(error);
  }
}
