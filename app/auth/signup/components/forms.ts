import { z } from "zod";

export const individualFormSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(11),
  address: z.string().min(1),
  division: z.string().min(1),
  district: z.string().min(1),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
});

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

export type InvidualFormType = z.infer<typeof individualFormSchema>;

export const companyFormSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(11),
  address: z.string().min(1),
  division: z.string().min(1),
  district: z.string().min(1),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
});

export const companyFormValues = {
  name: "",
  phone: "",
  address: "",
  division: "",
  district: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export type CompanyFormType = z.infer<typeof companyFormSchema>;
