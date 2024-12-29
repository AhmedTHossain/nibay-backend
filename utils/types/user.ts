import { APPLICATION_STATUS } from "@/lib/constant";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  applicationStatus: keyof typeof APPLICATION_STATUS;
  password: string;
  phone: string;
  nidNumber: string;
  nidCopy: string;
  drivingLicense: string;
  drivingLicenseCopy: string;
  maxEducationLevel: string;
  maxEducationLevelCertificateCopy: string;
  yearsOfExperience: string;
  address: string;
  division: string;
  district: string;
  profilePhoto: string;
  organizationType: string;
  organizationContactPerson: string;
  otpCode: string;
  deviceID: string;
  createdAt: Date;
  birthCertificate: string;
  portEntryPermit: string;
  updatedAt: Date;
  jobsApplied: string[];
  following: Array<string>;
  followers: Array<string>;
  reviews_for_employees: Array<string>;
  reviews_from_employers: Array<string>;
  id: string;
  job: string;
}
