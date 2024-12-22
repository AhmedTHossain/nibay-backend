import { ROLE } from "@/lib/constant";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  role: ROLE;
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
  createdAt: Date;
  updatedAt: Date;
}
