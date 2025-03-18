import { authMiddleware } from "@/app/api/middleware/auth";
import Job from "@/app/api/models/job";
import User from "@/app/api/models/user";
import { connectToMongoDB } from "@/lib/database";
import { handleError } from "@/lib/handleErrors";
import { NextRequest, NextResponse } from "next/server";

interface TREQPARAMS {
  params: {
    userId: string;
    jobId: string;
  };
}

export async function POST(request: NextRequest, { params }: TREQPARAMS) {
  try {
    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    await connectToMongoDB();

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const userId = params.userId;
    const jobId = params.jobId;
    const { review } = await request.json();

    await User.findOneAndUpdate(
      { _id: userId },
      {
        reviews_for_employees: [{ jobId, review }],
        reviews_from_employers: [{ jobId, review }]
      },
      { new: true, runValidators: true }
    );

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found!" }, { status: 404 });
    }

    job.applicants = job?.applicants.map((job) => {
      return {
        ...job,
        review,
        reviewCreatedDate: new Date()
      };
    });

    return NextResponse.json({
      status: true,
      message: "job updated successfully",
      data: null
    });
  } catch (error) {
    return handleError(error);
  }
}

import admin from "firebase-admin";
// import { authMiddleware } from "@/app/api/middleware/auth";
// import Job from "@/app/api/models/job";
// import User from "@/app/api/models/user";
// import { connectToMongoDB } from "@/lib/database";
// import { handleError } from "@/lib/handleErrors";
// import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK (ensure this is done only once in your app)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "nibay-479d9",
      clientEmail: "firebase-adminsdk-fbsvc@nibay-479d9.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC+Nmj3xEzbjo10\n5+p4rcIW7NL5aumFMnHawuvErh2IYJWE3CLkdMSVanhd3u0nyhR8ONtDOETJxr+n\n/8X2pEeHFcynPjlY+vNFfJ7hclgvTxcXYMbeph87bqdPrBC1eQVTq8/XuIWJ68D0\nQHnW8E40pzR5bUU6yRmkeEKvGt+TAl4PmOekHnx76lKbj97mawOWGSmLjE8ubhUy\nd12HmNGe7KjorRyAnRyM05/GGSdQVOWK1uBN7cg1CH0LBcQrqw8lwqZIEXIy7qyA\nGgW60E1gsebIJIyYqDGf+7Blv6K8vOPpeq6mSOVv8zRw2h5g8cZnTIqJkjeaeo1I\nYAuAWoxFAgMBAAECggEAQphIHd7zTbdWHUUJGWE0X9RgdQSSZ5jmtcGizARtwI6Y\nKqDr8nJTVUCmja779v9QNsGtOpabts1H0qjBBX40sL3YHgGyEE4kGALumV3wM/gL\nzJqMZe1hZ+xw1XsXioGpdMbliNBIqKYKszlTrwYJS3Py8kRohZFc0fFs32OYPR5v\nd5X2QXDHA6DLUEvkVznGbosskJkGAHmWxSGUf1RQvL5Slj/ieLkI6AUT/pcTh9xn\n36Rd4njbYRagiZlmAqVJrWsUXVDKiw5c6a4vLy0KayBYA7nmyrFJZnENgk2b/YGT\n13xssT5U5Pp58A9GkpW3lYogt6Xlr9xpP6WZ1ctKzQKBgQDkKiV/f/FnLBj92Wf5\n+IHCKWOreNedQCNHqvGooCAFGxqPl852KdjaZ+VYQeiiu6oDvUV//W+sPzeM4g7y\nFknLscpPx1cxSFpQvZsXS5+R8lXZXwIMwHf2atmBB9VJX9jR3F8uIlhKsrTidTad\n+bLy6Y8aFMYZcBokPIKlt6AVbwKBgQDVavlwYcYv8HXBDzzwzJg/YRwl2zcGmLuc\nFYxnsq2xq5WAO+DAGucvLTLIrMGJZrwAATj+rijTba1OdRnbu+Ko/GyeqaOSnyAA\nUMgLo7+/oq2NtJ/u3MAzn63OQzQ3kRD/D6MahU/Z6EiQO9K71rw4FLLwBJ3pmI1R\nBkEl4gUniwKBgGDshoFjGGl7kiJD+Kd3qaeRbYWqD+39EP+g3oeDfhatLNtS4aHQ\npQ4ilIqpdOmsTszH2n5EauwA7tgqL68nSLH/FLJPO/rzgWpLIVcECQU2rMFqWrSQ\nDmXffgYSDcjdrn133/b5IAibYbvRjyIMsLf//4pUyNKFjJVYHyfGmXqBAoGAVSB3\nYJFPeT3D6n8GgtJJBDbbAGqhVztC0i5yM8a8q7rSRjUcH+RbRKEVuZ/XDtRwttvF\n/ShA1pzP3RSufMxDy73sIZluyoQ4Qof2U1Y8nNbpvTVH+gIJlE3kCPsbb/KoQeTd\n3S1BvZx+nTGPjCdKKmBvQ3fD+TJFZAVHpTGzdqMCgYB0vdXSp8N/r+fvb05Wv6Db\n+fWdq3ruxsb/Sl6i27EhoCaktX0g+4koWzbsiS9tVXHsYSr3zZ4IQ/zZGoD3DZi/\nZLB+jiM9Y7DZxFPboInqvhT5JPcA9itTVX5x7C7IodccBp15esPNjWMw5gZ3s3uS\nOK3M4q9h47DxM8m1+sfljw==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, "\n") // Replace with your service account key
    })
  });
}

interface TREQPARAMS {
  params: {
    userId: string;
    jobId: string;
  };
}

export async function PATCH(request: NextRequest, { params }: TREQPARAMS) {
  const applicantId = params.userId;
  const jobId = params.jobId;

  try {
    await connectToMongoDB();

    const authUser = await authMiddleware(request);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found!" }, { status: 404 });
    }

    const isFoundApplicant = job.applicants.find(
      (item) => item.applicant.id === applicantId
    );

    if (!isFoundApplicant) {
      return NextResponse.json(
        { error: "Invalid applicant!" },
        { status: 400 }
      );
    }

    const { status } = await request.json();

    job.applicants = job.applicants.map((item) => {
      if (item.applicant.id === applicantId) {
        return {
          ...item,
          applicationStatus: status
        };
      }
      return item;
    });
    await job.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: applicantId },
      { applicationStatus: status },
      { new: true, runValidators: true }
    );

    // Send notification to the applicant
    if (updatedUser?.fcm_token) {
      const notificationPayload = {
        notification: {
          title: "Application Status Changed",
          body: "Your application status has changed"
        },
        data: {
          title_en: "Application Status Changed",
          title_bn: "অ্যাপ্লিকেশন স্টেটাস পরিবর্তন",
          body_en: "Your application status has changed",
          body_bn: "আপনার অ্যাপ্লিকেশন স্টেটাস পরিবর্তিত হয়েছে",
          job_id: jobId,
          type: "application_status"
        },
        token: updatedUser.fcm_token
      };

      try {
        await admin.messaging().send(notificationPayload);
      } catch (notificationError) {
        console.error("Failed to send notification:", notificationError);
      }
    }

    return NextResponse.json({
      status: "success",
      message: `এপ্লিকেশনটি ${status} হয়েছে`,
      data: null
    });
  } catch (error) {
    return handleError(error);
  }
}