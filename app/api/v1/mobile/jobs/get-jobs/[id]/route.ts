import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import Job from "../../../../../models/job";
import User from "../../../../../models/user";
import { handleError } from "@/lib/handleErrors";
/**
 * @swagger
 * /api/v1/mobile/jobs/get-jobs/{id}:
 *   get:
 *     summary: Retrieve a job by its ID
 *     description: Fetches a single job post using the provided job ID.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the job to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the job details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Job fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 676a9fd354b7646db136d012
 *                     title:
 *                       type: string
 *                       example: "Software Engineer"
 *                     shortDescription:
 *                       type: string
 *                       example: "Develop and maintain software applications."
 *                     longDescription:
 *                       type: string
 *                       example: "Detailed job description goes here."
 *                     experience:
 *                       type: string
 *                       example: "3-5 years"
 *                     qualification:
 *                       type: string
 *                       example: "Bachelor's Degree in Computer Science"
 *                     applicationDeadline:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-31T11:42:00.000Z
 *                     location:
 *                       type: string
 *                       example: "San Francisco, CA"
 *                     salary:
 *                       type: string
 *                       example: "$120,000"
 *                     jobRole:
 *                       type: string
 *                       example: "Developer"
 *                     jobType:
 *                       type: string
 *                       example: "Full Time"
 *                     user:
 *                       type: string
 *                       example: "6769c973c7f8010dfa1b7cf3"
 *       '404':
 *         description: Job not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Job not found!
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
import { authMiddleware } from "@/app/api/middleware/auth";

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


export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }
    const userId = authUser.userId; // Extract user ID from the auth token

    await connectToMongoDB();

    const job = await Job.findById(params.id).select(
      '_id title shortDescription longDescription experience qualification applicationDeadline salary jobRole isBirthCertificateRequired isPortEntryPermitRequired division district user'
    );

    if (!job) {
      return NextResponse.json({ status: false, message: "Job not found!" }, { status: 404 });
    }

    const jobPoster = await User.findById(job.user).select('followers');
    if (!jobPoster) {
      return NextResponse.json({ status: false, message: "Job poster not found!" }, { status: 404 });
    }
    
    const isFollowing = jobPoster.followers.some(follower => follower.toString() === authUser.userId);
    const applicant = job.applicants ? job.applicants.find(
      (applicant) => applicant.applicant.id.toString() === userId.toString()
    ) : null;
    const jobRoleKey = (Object.keys(USER_ROLE) as string[]).find(
      (key: string) => USER_ROLE[key as unknown as keyof typeof USER_ROLE].label === job.jobRole
    );
    const educationKey = (Object.keys(MAX_EDUCATION_LEVEL) as string[]).find(
      (key: string) => MAX_EDUCATION_LEVEL[key as unknown as keyof typeof MAX_EDUCATION_LEVEL].value === job.qualification
    );
    const educationLevelId = parseInt(educationKey || "4");
    const jobResponse = {
      _id: job._id,
      title: job.title,
      shortDescription: job.shortDescription,
      longDescription: job.longDescription,
      experience: job.experience,
      applicationDeadline: job.applicationDeadline,
      salary: parseInt(job.salary as string), // Convert salary to integer using parseInt()job.salary,
      jobRole: parseInt(jobRoleKey as string), // Convert jobRoleKey to integer using parseInt()jobRoleKey,
      isBirthCertificateRequired: job.isBirthCertificateRequired,
      isPortEntryPermitRequired: job.isPortEntryPermitRequired,
      division: job.division,
      district: job.district,
      employerId: job.user, // Mapping user to employerId
      // isFollowing: isFollowing // Adding isFollowing to the response
      applicationStatus: applicant ? applicant.applicationStatus : job.applicationStatus, 
      jobStatus: job.applicationStatus,
      qualification: undefined,
      applicants: undefined,
      minEducationLevel: educationLevelId,
    };
    
    return NextResponse.json({
      status: true,
      message: "Job fetched successfully",
      data: jobResponse
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: false,
      message: "Job fetching failed",
      data: {}
    });
  }
}