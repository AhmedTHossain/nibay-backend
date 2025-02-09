import cron from "node-cron";
import { connectToMongoDB } from "@/lib/database";
import Job from "@/app/api/models/job";

export async function updateExpiredJobs() {
  await connectToMongoDB();

  const now = new Date();

  // Update jobs where expiry_date has passed and status is still "ACTIVE"
  await Job.updateMany(
    { applicationDeadline: { $lt: now }, applicationStatus: "ACTIVE" },
    { $set: { applicationStatus: "EXPIRED" } }
  );

  console.log("Expired jobs updated:", new Date());
}

// Schedule the job to run every day at 00:00
// cron.schedule("0 0 * * *", async () => {
//   console.log("Running job expiry update...");
//   await updateExpiredJobs();
// });
