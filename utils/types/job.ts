import { APPLICATION_STATUS } from "@/lib/constant";
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
  applicants: Array<{
    applicant: {
      id: string;
      name: string;
    };
    job: {
      id: string;
      title: string;
    };
    applicationStatus: keyof typeof APPLICATION_STATUS;
    statusChangeDate: Date;
    review: string | null;
    reviewCreatedDate: Date | null;
  }>;
  applicationStatus: string;
  isBirthCertificateRequired: boolean;
  isPortEntryPermitRequired: boolean;
  status: string;
  __v: number;
}
