import {
  APPLICATION_STATUS,
  MAX_EDUCATION_LEVEL,
  USER_ROLE
} from "@/lib/constant";
import { TUser } from "@/utils/types/user";
import mongoose, { Model } from "mongoose";
import { boolean } from "zod";

interface IUserMethods {
  checkPasswordCorrect(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<TUser, object, IUserMethods>(
  {
    name: {
      type: String,
      required: true
    },
    deletedAt: {
      type: Date,
      required: false
    },
    isDeleted: {
      type: Boolean,
      required: false
    },
    email: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid Email!"]
    },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      required: true
    },
    password: {
      type: String,
      select: 0
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      required: true
    },
    nidNumber: {
      type: String,
      minlength: 10,
      maxlength: 14,
      required: false
    },
    nidCopy: {
      type: String,
      required: false
    },
    drivingLicense: {
      type: String,
      required: false
    },
    drivingLicenseCopy: {
      type: String,
      required: false
    },
    yearsOfExperience: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    division: {
      type: String,
      required: false
    },
    district: {
      type: String,
      required: false
    },
    profilePhoto: {
      type: String,
      required: false
    },
    organizationType: {
      type: String,
      required: false
    },
    organizationContactPerson: {
      type: String,
      required: false
    },
    maxEducationLevel: {
      type: String,
      enum: Object.keys(MAX_EDUCATION_LEVEL),
      required: false
    },
    maxEducationLevelCertificateCopy: {
      type: String,
      required: false
    },
    otpCode: {
      type: String,
      required: false,
      default: null
    },
    deviceID: {
      type: String,
      required: false,
      default: null
    },
    following: {
      type: [],
      required: false
    },
    followers: {
      type: [],
      required: false
    },
    reviews_for_employees: {
      type: [],
      required: false
    },
    reviews_from_employers: {
      type: [],
      required: false
    },
    isMobileUser: {
      type: Boolean,
      required: false
    },
    birthCertificate: { type: String, required: false },
    portEntryPermit: { type: String, required: false },
    applicationStatus: {
      type: String,
      enum: Object.keys(APPLICATION_STATUS),
      default: "PENDING",
      required: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },

    jobsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }]
  },
  {
    timestamps: true
  }
);

const User: Model<TUser> =
  mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
