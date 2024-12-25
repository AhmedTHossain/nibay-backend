import { TUser } from "./user";

export interface TAdvertisement {
  _id: string;
  user: string | TUser;
  applicationDeadline: Date | string;
  shortDescription: string;
  longDescription: string;
  experience: string;
  location: string;
  qualification: string;
  salary: string | null;
  title: string;
  jobRole: string;
  jobType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
