import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import Job from "@/app/api/models/job";
import mongoose from "mongoose";
import { authMiddleware } from "@/app/api/middleware/auth";

/**
 * @swagger
 * /api/v1/mobile/jobs/get-applied-jobs/{userId}:
 *   get:
 *     summary: Fetch user's applied jobs
 *     description: Fetch all jobs applied by the user
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

const MAX_EDUCATION_LEVEL = {
  0: {
    value: "BACHELOR",
    educationLevelTxtEn: "Bachelor's Degree",
    educationLevelTxtBn: "স্নাতক ডিগ্রি"
  },
  1: {
    value: "HIGHER_SECONDARY",
    educationLevelTxtEn: "Higher Secondary",
    educationLevelTxtBn: "উচ্চ মাধ্যমিক"
  },
  2: {
    value: "JUNIOR_SECONDARY",
    educationLevelTxtEn: "Junior Secondary",
    educationLevelTxtBn: "নিম্ন মাধ্যমিক"
  },
  3: {
    value: "MASTER",
    educationLevelTxtEn: "Master's Degree",
    educationLevelTxtBn: "স্নাতকোত্তর ডিগ্রি"
  },
  4: {
    value: "NO_FORMAL_EDUCATION",
    educationLevelTxtEn: "No Formal Education",
    educationLevelTxtBn: "কোনো আনুষ্ঠানিক শিক্ষা নয়"
  },
  5: {
    value: "PRIMARY",
    educationLevelTxtEn: "Primary",
    educationLevelTxtBn: "প্রাথমিক"
  },
  6: {
    value: "SECONDARY",
    educationLevelTxtEn: "Secondary",
    educationLevelTxtBn: "মাধ্যমিক"
  }
};

 const USER_ROLE = {
  0: { 
    label: "চেকার", 
    value: "CHECKER",
    jobRoleTxtEn: "Checker",
    jobRoleTxtBn: "চেকার"
  },
  1: { 
    label: "কাউন্টার মাস্টার", 
    value: "COUNTER_MASTER",
    jobRoleTxtEn: "Counter Master",
    jobRoleTxtBn: "কাউন্টার মাস্টার"
  },
  2: { 
    label: "ড্রাইভার", 
    value: "DRIVER",
    jobRoleTxtEn: "Driver",
    jobRoleTxtBn: "ড্রাইভার"
  },
  3: { 
    label: "ফোরম্যান", 
    value: "FOREMAN",
    jobRoleTxtEn: "Foreman",
    jobRoleTxtBn: "ফোরম্যান"
  },
  4: { 
    label: "জিএম", 
    value: "GM",
    jobRoleTxtEn: "General Manager",
    jobRoleTxtBn: "জিএম"
  },
  5: { 
    label: "হেল্পার", 
    value: "HELPER",
    jobRoleTxtEn: "Helper",
    jobRoleTxtBn: "হেল্পার"
  },
  6: { 
    label: "ম্যানেজার", 
    value: "MANAGER",
    jobRoleTxtEn: "Manager",
    jobRoleTxtBn: "ম্যানেজার"
  },
  7: { 
    label: "মেকানিক/মিস্ত্রি", 
    value: "MECHANIC_MISTRY",
    jobRoleTxtEn: "Mechanic/Technician",
    jobRoleTxtBn: "মেকানিক/মিস্ত্রি"
  },
  8: {
    label: "সুপারভাইজার/প্যাসেঞ্জার গাইড",
    value: "SUPERVISOR_PASSENGER_GUIDE",
    jobRoleTxtEn: "Supervisor/Passenger Guide",
    jobRoleTxtBn: "সুপারভাইজার/প্যাসেঞ্জার গাইড"
  },
  9: { 
    label: "ট্রাক ড্রাইভার", 
    value: "TRUCK_DRIVER",
    jobRoleTxtEn: "Truck Driver",
    jobRoleTxtBn: "ট্রাক ড্রাইভার"
  },
  10: { 
    label: "প্রতিষ্ঠানিক", 
    value: "INSTITUTION",
    jobRoleTxtEn: "Institutional",
    jobRoleTxtBn: "প্রতিষ্ঠানিক"
  },
  11: { 
    label: "ব্যক্তিগত", 
    value: "INDIVIDUAL",
    jobRoleTxtEn: "Individual",
    jobRoleTxtBn: "ব্যক্তিগত"
  }
};

function getJobRoleDetails(jobRoleId: number) {
  const role = USER_ROLE[jobRoleId as keyof typeof USER_ROLE];
  if (!role) return null;
  
  return {
    jobRoleId,
    ...role
  };
}


export async function GET(
  request: NextRequest
) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    const userId = authUser.userId; // Extract user ID from the auth token

    await connectToMongoDB();

    // Find user with original path
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "User not found",
        data: {}
      }, { status: 404 });
    }

    // Get jobs with original path
    const jobIds = user.jobsApplied.map(
      (jobId: any) => new mongoose.Types.ObjectId(jobId)
    );

    const jobs = await Job.find({ _id: { $in: jobIds } }).populate({
      path: "user",
      model: "User",
      select: "name profilePhoto applicationStatus"
    });

    if (!jobs.length) {
      return NextResponse.json({
        status: false,
        message: "No applied jobs found",
        data: {}
      }, { status: 404 });
    }

    const jobRoleKey = (Object.keys(USER_ROLE) as string[]).find(
      (key: string) => jobs.some(job => USER_ROLE[key as unknown as keyof typeof USER_ROLE].label === job.jobRole)
    );

    const formattedJobs = jobs.map((job) => {
      const applicant = job.applicants.find(
        (applicant) => applicant.applicant.id.toString() === userId.toString()
      );
      const jobRoleKey = (Object.keys(USER_ROLE) as string[]).find(
        (key: string) => jobs.some(job => USER_ROLE[key as unknown as keyof typeof USER_ROLE].label === job.jobRole)
      );
  
    
      return {
        _id: job._id.toString(),
        title: job.title,
        shortDescription: job.shortDescription,
        longDescription: job.longDescription,
        experience: job.experience,
        maxEducationLevel: job.qualification,
        role: parseInt(jobRoleKey || "0"),
        division: job.division,
        district: job.district,
        salary: parseInt(job.salary || "0"),
        applicationDeadline: job.applicationDeadline,
        employerName:
          typeof job.user === "object" && "name" in job.user
            ? job.user.name
            : "Unknown Company",
        employerPhoto:
          typeof job.user === "object" && "profilePhoto" in job.user
            ? job.user.profilePhoto
            : null,
        applicationStatus: applicant ? applicant.applicationStatus : job.applicationStatus, 
        jobSatus: job.applicationStatus,
      };
    });

    return NextResponse.json({
      status: true,
      message: "Applied jobs fetched successfully",
      data: formattedJobs
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: false,
      message: "Failed to fetch applied jobs",
      data: {}
    }, { status: 500 });
  }
}