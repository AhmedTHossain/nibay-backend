export const USER_ROLE = {
  0: "CHECKER",
  1: "COUNTER_MASTER",
  2: "DRIVER",
  3: "FOREMAN",
  4: "GM",
  5: "HELPER",
  6: "MANAGER",
  7: "MECHANIC_MISTRY",
  8: "SUPERVISOR_PASSENGER_GUIDE",
  9: "TRUCK_DRIVER",
  10: "INSTITUTION",
  11: "INDIVIDUAL",
  12: "USER"
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
