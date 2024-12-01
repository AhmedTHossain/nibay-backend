import { INVALID_EMAIL, INVALID_PHONE, REQUIRED_ERROR } from "@/lib/error";
import { z } from "zod";

export const settingsFormSchema = z.object({
  name: z.string().min(1, REQUIRED_ERROR),
  email: z.string().email({ message: INVALID_EMAIL }),
  phone: z.string().min(11, INVALID_PHONE).max(11, INVALID_PHONE),
  address: z.string().min(1, REQUIRED_ERROR),
  division: z.string().nullable(),
  district: z.string().nullable(),
  organizationContactPerson: z.string().nullable(),
  organizationType: z.string().nullable(),
  image: z.any().nullable()
});

export const settingsFormValues = {
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

export type SettingsFormType = z.infer<typeof settingsFormSchema>;
