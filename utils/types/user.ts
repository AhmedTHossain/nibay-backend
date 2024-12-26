import { ROLE } from "@/lib/constant";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  role: string;
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
}
