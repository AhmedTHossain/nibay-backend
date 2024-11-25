import { USER_ROLE } from "@/lib/constant";
import mongoose, { Document, Model } from "mongoose";

export interface TUser {
  name: string;
  email: string;
  role: typeof USER_ROLE;
  password: string;
  phone: string;
  address: string;
  division: string;
  district: string;
  file: string;
  organizationType: string;
  organizationContactPerson: string;
}
export interface TUserDocument extends TUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

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
      required: true,
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
      required: true
    },
    address: {
      type: String,
      required: true
    },
    division: {
      type: String,
      required: false
    },
    district: {
      type: String,
      required: false
    },
    file: {
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
    }
  },
  {
    timestamps: true
  }
);

const User: Model<TUserDocument> =
  mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
