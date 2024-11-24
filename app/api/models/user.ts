import { USER_ROLE } from "@/lib/constant";
import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface TUser {
  name: string;
  email: string;
  role: typeof USER_ROLE;
  password: string;
  phone: string;
  address: string;
  division: string;
  district: string;
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
      required: true
    },
    district: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const User: Model<TUserDocument> =
  mongoose.models?.User || mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.checkPasswordCorrect = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default User;
