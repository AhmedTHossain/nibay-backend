import { INVALID_EMAIL, INVALID_PHONE, REQUIRED_ERROR } from "@/lib/error";
import { z } from "zod";

export const individualFormSchema = z
  .object({
    name: z.string().min(1, REQUIRED_ERROR),
    phone: z.string().min(11, INVALID_PHONE).max(11, INVALID_PHONE),
    address: z.string().min(1, REQUIRED_ERROR),
    division: z.string().min(1, REQUIRED_ERROR),
    district: z.string().min(1, REQUIRED_ERROR),
    email: z.string().email({ message: INVALID_EMAIL }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't matched!",
    path: ["confirmPassword"]
  });

export type InvidualFormType = z.infer<typeof individualFormSchema>;

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp"
// ];

export const companyFormSchema = z.object({
  name: z.string().min(1, REQUIRED_ERROR),
  organizationContactPerson: z.string().min(1, REQUIRED_ERROR),
  phone: z.string().min(11, INVALID_PHONE).max(11, INVALID_PHONE),
  address: z.string().min(1, REQUIRED_ERROR),
  organizationType: z.string().min(1, REQUIRED_ERROR),
  image: z
    .any()
    // .refine(
    //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //   `Max image size is 5MB.`
    // )
    // .refine(
    //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //   "Only .jpg, .jpeg, .png and .webp formats are supported."
    // )
    .nullable(),
  email: z.string().email({ message: INVALID_EMAIL }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
});

export type CompanyFormType = z.infer<typeof companyFormSchema>;

export const individualFormValues = {
  name: "",
  phone: "",
  address: "",
  division: "",
  district: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export const companyFormValues: CompanyFormType = {
  name: "",
  organizationType: "",
  phone: "",
  address: "",
  image: null,
  email: "",
  organizationContactPerson: "",
  password: "",
  confirmPassword: ""
};
