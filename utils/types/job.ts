import { TUser } from "./user";

export interface TJob {
  _id: string;
  user: string | TUser;
  applicationDeadline: Date | string;
  jobPostTime: Date | string;
  companyName: string;
  createdAt: string;
  description: string;
  experience: string;
  location: string;
  qualification: string;
  salary: string;
  title: string;
  updatedAt: string;
  __v: number;
}
