import { TUser } from "./user";

export interface TJob {
  _id: string;
  user: string | TUser;
  applicationDeadline: Date | string;
  createdAt: string;
  shortDescription: string;
  longDescription: string;
  experience: string;
  division: string;
  district: string;
  qualification: string;
  salary: string | null;
  title: string;
  updatedAt: string;
  jobRole: string;
  applicants: [string];
  isBirthCertificateRequired: boolean;
  isPortEntryPermitRequired: boolean;
  __v: number;
}
