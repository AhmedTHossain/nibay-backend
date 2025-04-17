import admin from "firebase-admin";
import { handleError } from "@/lib/handleErrors";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;
import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import User from "../../../models/user";
import { authMiddleware } from "../../../middleware/auth";

/**
 * @swagger
 * /api/v1/reviews/{applicantId}:
 *   get:
 *     summary: Get reviews for an applicant
 *     description: Fetches all reviews for a specific applicant, including details of the reviewers and associated jobs.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: applicantId
 *         required: true
 *         description: ID of the applicant whose reviews are being fetched.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched reviews for the applicant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     averageRating:
 *                       type: number
 *                       description: Average rating of the applicant.
 *                       example: 4.5
 *                     reviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           reviewerId:
 *                             type: string
 *                             description: ID of the reviewer.
 *                           reviewerName:
 *                             type: string
 *                             description: Name of the reviewer.
 *                           jobId:
 *                             type: string
 *                             description: ID of the job associated with the review.
 *                           jobTitle:
 *                             type: string
 *                             description: Title of the job associated with the review.
 *                           rating:
 *                             type: number
 *                             description: Rating given by the reviewer.
 *                           feedback:
 *                             type: string
 *                             description: Feedback provided by the reviewer.
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             description: Date when the review was created.
 *       404:
 *         description: User or applicant not found.
 *       500:
 *         description: Server error.
 */

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

interface TApplicantId {
  params: {
    applicantId: string;
  };
}

export async function GET(request: NextRequest, { params }: TApplicantId) {
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

    const applicantId = params.applicantId;

    const result = await User.aggregate([
      {
        $match: { _id: new ObjectId(applicantId) } // Match the specific user
      },
      {
        $addFields: {
          reviews_from_employers: {
            $map: {
              input: "$reviews_from_employers",
              as: "review",
              in: {
                jobId: { $toObjectId: "$$review.jobId" },
                reviewerId: { $toObjectId: "$$review.reviewerId" },
                rating: "$$review.rating",
                feedback: "$$review.feedback",
                createdAt: "$$review.createdAt"
              }
            }
          }
        }
      },
      {
        $unwind: "$reviews_from_employers" // Unwind the reviews array
      },
      {
        $lookup: {
          from: "jobs", // Collection containing job data
          localField: "reviews_from_employers.jobId",
          foreignField: "_id",
          as: "jobDetails"
        }
      },
      {
        $lookup: {
          from: "users", // Collection containing user data
          localField: "reviews_from_employers.reviewerId",
          foreignField: "_id",
          as: "reviewerDetails"
        }
      },
      {
        $project: {
          _id: 0,
          reviewerId: "$reviews_from_employers.reviewerId",
          reviewerName: { $arrayElemAt: ["$reviewerDetails.name", 0] },
          jobId: "$reviews_from_employers.jobId",
          jobTitle: { $arrayElemAt: ["$jobDetails.title", 0] },
          rating: "$reviews_from_employers.rating",
          feedback: "$reviews_from_employers.feedback",
          createdAt: "$reviews_from_employers.createdAt"
        }
      },
      {
        $group: {
          _id: null,
          reviews: { $push: "$$ROOT" },
          averageRating: { $avg: "$rating" }
        }
      },
      {
        $project: {
          _id: 0,
          averageRating: { $round: ["$averageRating", 1] }, // Round to 1 decimal place
          reviews: 1
        }
      }
    ]);

    const data = {
      averageRating: result[0]?.averageRating || 0,
      reviews: result[0]?.reviews || []
    };

    // Send notification to the applicant
    const applicant = await User.findById(applicantId);
    if (applicant?.fcm_token) {
      const notificationPayload = {
        token: applicant.fcm_token,
        notification: {
          title: "New Review on Profile",
          body: `Your profile has received a new review.`
        },
        data: {
          title_en: "New Review on Profile",
          title_bn: "Someone has reviewed your profile",
          body_en: `Your profile has received a new review.`,
          body_bn: `আপনার প্রোফাইলে একটি নতুন রিভিউ যোগ করা হয়েছে।`,
          type: "profile_review"
        }
      };

      try {
        await admin.messaging().send(notificationPayload);
      } catch (notificationError) {
        console.error("Failed to send notification:", notificationError);
      }
    }

    return NextResponse.json({ status: "success", data: data });
  } catch (error) {
    return handleError(error);
  }
}