import { ROLE } from "@/lib/constant";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  role: ROLE;
  password: string;
  phone: string;
  address: string;
  division: string;
  district: string;
  file: string;
  organizationType: string;
  organizationContactPerson: string;
  createdAt: Date;
  updatedAt: Date;
}
