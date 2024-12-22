import { USER_ROLE } from "@/lib/constant";
import { TUser } from "@/utils/types/user";
import mongoose, { Model } from "mongoose";

interface IUserMethods {
  checkPasswordCorrect(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<TUser, object, IUserMethods>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: false,
      unique: true,
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
      required: true
    },
    nidNumber: {
      type: String,
      minlength: 10,
      maxlength: 14,
      required: true
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
      required: false
    },
    maxEducationLevelCertificateCopy: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

const User: Model<TUser> =
  mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
