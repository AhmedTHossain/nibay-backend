import { TUser } from "./user";

export interface TJob {
  _id: string;
  user: string | TUser;
  applicationDeadline: Date | string;
  createdAt: string;
  shortDescription: string;
  longDescription: string;
  experience: string;
  location: string;
  qualification: string;
  salary: string | null;
  title: string;
  updatedAt: string;
  jobRole: string;
  jobType: string;
  applicants: [string];
  birthCertificate: string;
  portEntryPermit: string;
  division: string;
  district: string;
  name: string | TUser;
  __v: number;
}
