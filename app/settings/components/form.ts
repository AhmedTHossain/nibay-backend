import { INVALID_EMAIL, INVALID_PHONE, REQUIRED_ERROR } from "@/lib/error";
import { z } from "zod";

export const accountSettingsFormSchema = z.object({
  name: z.string().min(1, REQUIRED_ERROR),
  email: z.string().email({ message: INVALID_EMAIL }),
  phone: z.string().min(11, INVALID_PHONE).max(11, INVALID_PHONE),
  address: z.string().min(1, REQUIRED_ERROR),
  division: z.string().nullable(),
  district: z.string().nullable(),
  organizationContactPerson: z.string().nullable(),
  organizationType: z.string().nullable(),
  image: z.any().nullable(),
  key: z.enum(["account", "password"])
});

export const accountSettingsFormValues = {
  key: "account",
  name: "",
  phone: "",
  address: "",
  division: "",
  district: "",
  email: "",
  organizationType: "",
  organizationContactPerson: "",
  image: null
};

export type AccountSettingsFormType = z.infer<typeof accountSettingsFormSchema>;

export const passwordSettingsFormSchema = z.object({
  oldPassword: z
    .string()
    .min(8, { message: "Old password must be at least 8 characters" }),
  newPassword: z
    .string()
    .min(8, { message: "New password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "New password must be at least 8 characters" }),
  key: z.enum(["account", "password"])
});

export const passwordSettingsFormValues = {
  key: "password",
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
};

export type PasswordSettingsFormType = z.infer<
  typeof passwordSettingsFormSchema
>;
