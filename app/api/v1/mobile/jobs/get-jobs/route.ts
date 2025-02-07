import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import Job from "@/app/api/models/job";
import User from "@/app/api/models/user";
import { handleError } from "@/lib/handleErrors";


/**
 * @swagger
 * /api/v1/mobile/jobs/get-jobs:
 *   get:
 *     summary: Get jobs
 *     description: Retrieve a list of jobs with optional filters.
 *     parameters:
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Field to order by (default: -createdAt)
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Job title to filter by
 *       - in: query
 *         name: employerType
 *         schema:
 *           type: string
 *         description: Employer type to filter by
 *       - in: query
 *         name: employer_id
 *         schema:
 *           type: string
 *         description: Employer ID to filter by
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of jobs per page (default: 10)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default: 1)
 *     responses:
 *       '200':
 *         description: A list of jobs
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
 *                   example: Jobs fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 678e58763721ebb114a828e2
 *                       title:
 *                         type: string
 *                         example: সেরা রাইডস লিমিটেডে চেকার নিয়োগ
 *                       shortDescription:
 *                         type: string
 *                         example: সেরা রাইডস লিমিটেডে চেকার নিয়োগ। টিকিট যাচাই এবং যাত্রী পরামর্শের জন্য অভিজ্ঞতা এবং মনোযোগ প্রয়োজন।
 *                       longDescription:
 *                         type: string
 *                         example: "\nদায়িত্বসমূহ:\n\nযাত্রীদের টিকিট যাচাই করা\nরুট এবং গন্তব্য নিশ্চিত করা\nযাত্রীদের সঠিক পরামর্শ প্রদান করা\nট্রিপের সময়সূচি তদারকি করা\n\nযোগ্যতা:\n\nমাধ্যমিক বা উচ্চ মাধ্যমিক শিক্ষাগত যোগ্যতা\nটিকিট যাচাই ও যাত্রী সেবা কাজে অভিজ্ঞতা\nসঠিক মনোযোগ এবং যোগাযোগ দক্ষতা\n\nবেতন এবং সুবিধা:\n\nআকর্ষণীয় বেতন\nঅন্যান্য সুবিধা: [যতটুকু প্রযোজ্য]"
 *                       experience:
 *                         type: string
 *                         example: 3-4
 *                       qualification:
 *                         type: string
 *                         example: NO_FORMAL_EDUCATION
 *                       applicationDeadline:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-03-15T00:00:00.000Z
 *                       salary:
 *                         type: string
 *                         example: 0
 *                       jobRole:
 *                         type: string
 *                         example: চেকার
 *                       isBirthCertificateRequired:
 *                         type: boolean
 *                         example: false
 *                       isPortEntryPermitRequired:
 *                         type: boolean
 *                         example: false
 *                       division:
 *                         type: string
 *                         example: বরিশাল
 *                       district:
 *                         type: string
 *                         example: ভোলা
 *                       applicants:
 *                         type: array
 *                         items:
 *                           type: string
 *       '400':
 *         description: Bad Request - Missing or invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid query parameters.
 *                 error:
 *                   type: string
 *                   example: Bad Request
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: string
 *                   example: Database connection failed
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

function getEducationLevelDetails(educationLevelId: number) {
  const educationLevel = MAX_EDUCATION_LEVEL[educationLevelId as keyof typeof MAX_EDUCATION_LEVEL];
  if (!educationLevel) return null;

  return {
    educationLevelId,
    ...educationLevel
  };
}

// Helper function to determine if academic certificate is required
function isAcademicCertificateNeeded(educationLevelId: number): boolean {
  // Certificate required for Secondary(6), Higher Secondary(1), Bachelor's(0), and Master's(3)
  return [0, 1, 3, 6].includes(educationLevelId);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const orderBy = searchParams.get("orderBy") || "-createdAt";
    const title = searchParams.get("title"); 
    const employerType = searchParams.get("employerType");
    const employerId = searchParams.get("employer_id");
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);

    await connectToMongoDB();

    let query = Job.find();

    if (title) {
      query = query.where("title").regex(new RegExp(title, "i"));
    }

    if (employerType) {
      query = query.where("employerType").equals(employerType);
    }

    if (employerId) {
      query = query.where("employerId").equals(employerId);
    }

    const totalJobs = await Job.countDocuments(query);
    const totalPages = Math.ceil(totalJobs / pageSize);

    const jobs = await query
      .sort(orderBy)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    
    // Fetch employer details for all jobs in a single query
    const employerIds = jobs.map(job => job.user);
    const employers = await User.find(
      { _id: { $in: employerIds } },
      { name: 1, profilePhoto: 1 }
    );

    // Create a map for quick employer lookup
    const employerMap = new Map(
      employers.map(employer => [employer._id.toString(), employer])
    );
    
    const transformedJobs = jobs.map(job => {
      const jobObj = job.toObject();
      const employer = employerMap.get(jobObj.user?.toString());
      
      const educationKey = (Object.keys(MAX_EDUCATION_LEVEL) as string[]).find(
        (key: string) => MAX_EDUCATION_LEVEL[key as unknown as keyof typeof MAX_EDUCATION_LEVEL].value === jobObj.qualification
      );
      const jobRoleKey = (Object.keys(USER_ROLE) as string[]).find(
        (key: string) => USER_ROLE[key as unknown as keyof typeof USER_ROLE].label === jobObj.jobRole
      );
      const isDrivingLicenseRequired = jobRoleKey === "2" || jobRoleKey === "9";

      const educationLevelId = parseInt(educationKey || "4");
      const jobRoleDetails = getJobRoleDetails(parseInt(jobRoleKey || "0"));
      const educationLevelDetails = getEducationLevelDetails(educationLevelId);

      return {
        ...jobObj,
        employerName: employer?.name || "",
        employerPhoto: employer?.profilePhoto || "",
        minEducationLevel: educationLevelId,
        minEducationLevelTxtEn: educationLevelDetails?.educationLevelTxtEn || "",
        minEducationLevelTxtBn: educationLevelDetails?.educationLevelTxtBn || "",
        isAcademicCertificateRequired: isAcademicCertificateNeeded(educationLevelId),
        jobRole: parseInt(jobRoleKey || "0"),
        jobRoleTxtEn: jobRoleDetails?.jobRoleTxtEn || "",
        jobRoleTxtBn: jobRoleDetails?.jobRoleTxtBn || "",
        isDrivingLicenseRequired,
        qualification: undefined,
        applicants: undefined,
      };
    });
    
    return NextResponse.json({
      status: true,
      message: "Jobs fetched successfully",
      data: transformedJobs,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalJobs
      }
    });
    
  } catch (error) {
    return handleError(error);
  }
}