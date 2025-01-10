export const isProduction = process.env.NODE_ENV === "production";

export const USER_ROLE = {
  0: { label: "চেকার", value: "CHECKER" },
  1: { label: "কাউন্টার মাস্টার", value: "COUNTER_MASTER" },
  2: { label: "ড্রাইভার", value: "DRIVER" },
  3: { label: "ফোরম্যান", value: "FOREMAN" },
  4: { label: "জিএম", value: "GM" },
  5: { label: "হেল্পার", value: "HELPER" },
  6: { label: "ম্যানেজার", value: "MANAGER" },
  7: { label: "মেকানিক/মিস্ত্রি", value: "MECHANIC_MISTRY" },
  8: {
    label: "সুপারভাইজার/প্যাসেঞ্জার গাইড",
    value: "SUPERVISOR_PASSENGER_GUIDE"
  },
  9: { label: "ট্রাক ড্রাইভার", value: "TRUCK_DRIVER" }
};

export const APPLICATION_STATUS = {
  PENDING: { label: "অপেক্ষমাণ", value: "PENDING" },
  ACCEPTED: { label: "গৃহীত", value: "ACCEPTED" },
  REJECTED: { label: "বাতিল", value: "REJECTED" },
  SHORT_LISTED: { label: "শর্টলিস্টেড", value: "SHORT_LISTED" }
};

export type ROLE =
  | "INSTITUTION"
  | "INDIVIDUAL"
  | "USER"
  | "CHECKER"
  | "COUNTER_MASTER"
  | "DRIVER"
  | "FOREMAN"
  | "GM"
  | "HELPER"
  | "MANAGER"
  | "MECHANIC_MISTRY"
  | "SUPERVISOR_PASSENGER_GUIDE"
  | "TRUCK_DRIVER";

export const MAX_EDUCATION_LEVEL = {
  0: "ALIM",
  1: "BACHELOR",
  2: "HAFIZ",
  3: "HIGHER_SECONDARY",
  4: "JUNIOR_SECONDARY",
  5: "MASTER",
  6: "NO_FORMAL_EDUCATION",
  7: "PRIMARY",
  8: "SECONDARY"
};

export const EDUCATION_PRECEDENCE: any = {
  0: "NO_FORMAL_EDUCATION",
  1: "PRIMARY",
  2: "JUNIOR_SECONDARY",
  3: "SECONDARY",
  4: "HIGHER_SECONDARY",
  5: "BACHELOR",
  6: "MASTER"
};

export const EDUCTATION_LEVELS = [
  { id: 0, label: "প্রাতিষ্ঠানিক শিক্ষা নেই", value: "NO_FORMAL_EDUCATION" },
  { id: 1, label: "প্রাথমিক [শ্রেণি ১ম-৫ম]", value: "PRIMARY" },
  {
    id: 2,
    label: "জুনিয়র সেকেন্ডারি [ক্লাস ৬ষ্ঠ-৮ম]",
    value: "JUNIOR_SECONDARY"
  },
  { id: 3, label: "মাধ্যমিক (এসএসসি)", value: "SECONDARY" },
  { id: 4, label: "উচ্চ মাধ্যমিক (এইচএসসি)", value: "HIGHER_SECONDARY" },
  { id: 5, label: "ব্যাচেলর ডিগ্রী", value: "BACHELOR" },
  { id: 6, label: "মাস্টার্স ডিগ্রী", value: "MASTER" }
];

export const JOB_ROLES = [
  { label: "চেকার", value: "চেকার" },
  { label: "কাউন্টার মাস্টার", value: "কাউন্টার মাস্টার" },
  { label: "ড্রাইভার", value: "ড্রাইভার" },
  { label: "ফোরম্যান", value: "ফোরম্যান" },
  { label: "জিএম (জেনারেল ম্যানেজার)", value: "জিএম (জেনারেল ম্যানেজার)" },
  { label: "হেল্পার", value: "হেল্পার" },
  { label: "ম্যানেজার", value: "ম্যানেজার" },
  { label: "মেকানিক/মিস্ত্রি", value: "মেকানিক/মিস্ত্রি" },
  {
    label: "সুপারভাইজার/প্যাসেঞ্জার গাইড",
    value: "সুপারভাইজার/প্যাসেঞ্জার গাইড"
  },
  { label: "ট্রাক ড্রাইভার", value: "ট্রাক ড্রাইভার" }
];
