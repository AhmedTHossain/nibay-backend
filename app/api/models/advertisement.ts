import { TJob } from "@/utils/types/job";
import mongoose, { Model } from "mongoose";

const advertisementSchema = new mongoose.Schema<TJob, object>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    experience: { type: String, required: true },
    qualification: { type: String, required: true },
    applicationDeadline: { type: Date, required: true },
    salary: { type: String, required: false, default: null },
    jobRole: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.String,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Advertisement: Model<TJob> =
  mongoose.models?.Advertisement ||
  mongoose.model("Advertisement", advertisementSchema);

export default Advertisement;
