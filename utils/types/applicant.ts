import { APPLICATION_STATUS } from "@/lib/constant";

export interface Applicant {
  _id: string;
  name: string;
  role: number;
  jobId: string;
  jobTitle: string;
  jobShortDescription: string;
  profilePhoto: string;
  statusChangeDate: Date;
  email: string;
  phone: string;
  address: string;
}

export type ApplicationStatus = keyof typeof APPLICATION_STATUS | "ALL";

export interface Application {
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
}
