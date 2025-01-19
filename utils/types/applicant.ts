import { APPLICATION_STATUS } from "@/lib/constant";

export interface Applicant {
  _id: string;
  name: string;
  role: number;
  jobId: string;
  jobShortDescription: string;
  profilePhoto: string;
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
