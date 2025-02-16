"use client";

import { DIVISIONS, JOB_ROLES_ENUMS } from "@/app/assets/resources";
import Header from "@/app/components/header";
import { useJobContext } from "@/app/contexts/JobContext";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api_client } from "@/lib/axios";
import { EDUCTATION_LEVELS, JOB_ROLES } from "@/lib/constant";
import { REQUIRED_ERROR } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import moment from "moment";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const jobSchema = z.object({
  title: z
    .string()
    .min(1, REQUIRED_ERROR)
    .max(50, "সর্বোচ্চ ৫০ টি বর্ণ গ্রহনযোগ্য"),
  shortDescription: z
    .string()
    .min(1, REQUIRED_ERROR)
    .max(150, "সর্বোচ্চ ১৫০ টি বর্ণ গ্রহনযোগ্য"),
  longDescription: z
    .string()
    .min(1, REQUIRED_ERROR)
    .max(500, "সর্বোচ্চ ৫০০ টি বর্ণ গ্রহনযোগ্য"),
  qualification: z.string().min(1, REQUIRED_ERROR),
  experience: z.string().min(1, REQUIRED_ERROR),
  isBirthCertificateRequired: z.boolean().optional(),
  isPortEntryPermitRequired: z.boolean().optional(),
  division: z.string().min(1, REQUIRED_ERROR),
  district: z.string().min(1, REQUIRED_ERROR),
  applicationDeadline: z
    .string()
    .min(1, REQUIRED_ERROR)
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Deadline must be a valid date."
    }),
  salary: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string"
    })
    .optional(),
  jobRole: z.enum(JOB_ROLES_ENUMS, {
    errorMap: () => ({ message: REQUIRED_ERROR })
  })
});

export type JobCreateType = z.infer<typeof jobSchema>;

export default function NewJobRoute() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [jobRole, setJobRole] = useState<string>();
  const [districts, setDistricts] = useState([]);
  const { refetch, copyJob, setCopyJob } = useJobContext();
  const [titleCount, setTitleCount] = useState(0);
  const [shortDescCount, setShortDescCount] = useState(0);
  const [longDescCount, setLongDescCount] = useState(0);

  const t = useTranslations("CreateJob"); // Initialize translations
  const t_divisions = useTranslations("Divisions");
  const t_districts = useTranslations("Districts");
  const t_exprerience = useTranslations("ExperienceLevels");
  const t_education = useTranslations("JobDetails.education_levels");
  const t_roles = useTranslations("JobGrid.roles");

  const form = useForm<JobCreateType>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      longDescription: "",
      qualification: "NO_FORMAL_EDUCATION",
      experience: "0-1",
      applicationDeadline: moment().format("YYYY-MM-DD"),
      salary: "0",
      jobRole: "চেকার",
      division: "",
      district: "",
      isBirthCertificateRequired: false,
      isPortEntryPermitRequired: false
    }
  });

  async function onSubmit(values: JobCreateType) {
    setIsLoading(true);

    api_client
      .post("jobs", {
        ...values,
        applicationDeadline: date
      })
      .then((res) => {
        if (res.data.status === "success") {
          refetch();
          router.push("/");
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setCopyJob(null);
      });
  }

  useEffect(() => {
    if (copyJob) {
      Object.keys(form.getValues()).forEach((key) => {
        if (key === "applicationDeadline") {
          const deadline = new Date(copyJob?.applicationDeadline)
            .toISOString()
            .split(".")[0]
            .toString();
          setDate(new Date(copyJob?.applicationDeadline));
          form.setValue("applicationDeadline", deadline);
        } else {
          // eslint-disable-next-line
          // @ts-ignore
          form.setValue(key as keyof TJobProps, copyJob[key]);
        }
      });
      setDistricts(
        (DIVISIONS.find((item) => item.division === copyJob.division)
          ?.districts as []) || []
      );
    }

    // eslint-disable-next-line
  }, [copyJob]);

  // useEffect(() => {
  //   if (copyJob) {
  //     setDistricts(
  //       (DIVISIONS.find((item) => item.division === copyJob.division)
  //         ?.districts as []) || []
  //     );
  //   }
  // }, [copyJob]);

  const error = (field: keyof JobCreateType): string | undefined => {
    return form.formState.errors[field]?.message as string | undefined;
  };

  return (
    <>
      <Header />

      <section className="relative py-36">
        <div className="container">
          <h3 className="font-semibold text-3xl text-center">
            {t("create_new_job")}
          </h3>
          <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <form
                className="text-left mt-20 max-w-2xl mx-auto"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-1 gap-6">
                  {/* <div className="text-left">
                    <label className="font-semibold" htmlFor="title">
                      চাকরির শিরোনাম
                    </label>
                    <Input
                      id="title"
                      className="mt-1"
                      placeholder="চাকরির শিরোনাম - সর্বোচ্চ ৪০ টি শব্দ গ্রহনযোগ্য"
                      {...form.register("title")}
                    />
                    {error("title") ? (
                      <p className="text-red-500 font-semibold text-sm">
                        {error("title")}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-left">
                    <label className="font-semibold" htmlFor="shortDescription">
                      কাজের সারসংক্ষেপ
                    </label>
                    <Textarea
                      id="shortDescription"
                      className="mt-1"
                      placeholder="কাজের সারসংক্ষেপ - সর্বোচ্চ ৮০ টি শব্দ গ্রহনযোগ্য"
                      rows={4}
                      {...form.register("shortDescription")}
                    />
                    {error("shortDescription") ? (
                      <p className="text-red-500 font-semibold text-sm">
                        {error("shortDescription")}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-left">
                    <label className="font-semibold" htmlFor="longDescription">
                      কাজের বিবরণ
                    </label>
                    <Textarea
                      id="longDescription"
                      className="mt-1"
                      placeholder="কাজের বিবরণ - সর্বোচ্চ ৫০০ টি শব্দ গ্রহনযোগ্য"
                      rows={4}
                      {...form.register("longDescription")}
                    />
                    {error("longDescription") ? (
                      <p className="text-red-500 font-semibold text-sm">
                        {error("longDescription")}
                      </p>
                    ) : null}
                  </div> */}

                  <div className="text-left">
                    <label className="font-semibold" htmlFor="title">
                      {t("job_title")}
                    </label>
                    <div className="relative">
                      <Input
                        id="title"
                        className="mt-1"
                        placeholder={t("job_title_placeholder")}
                        maxLength={50}
                        {...form.register("title")}
                        onChange={(e) => {
                          form.register("title").onChange(e);
                          setTitleCount(e.target.value.length);
                        }}
                      />
                      <span
                        className={`absolute bottom-2 right-2 text-xs ${
                          titleCount > 50 ? "text-red-500" : "text-gray-500"
                        }`}
                      >
                        {titleCount}/50
                      </span>
                    </div>
                    {error("title") ? (
                      <p className="text-red-500 font-semibold text-sm">
                        {error("title")}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-left">
                    <label className="font-semibold" htmlFor="shortDescription">
                      {t("short_description")}
                    </label>
                    <div className="relative">
                      <Textarea
                        id="shortDescription"
                        className="mt-1"
                        placeholder={t("short_description_placeholder")}
                        maxLength={150}
                        rows={4}
                        {...form.register("shortDescription")}
                        onChange={(e) => {
                          form.register("shortDescription").onChange(e);
                          setShortDescCount(e.target.value.length);
                        }}
                      />
                      <span
                        className={`absolute bottom-2 right-2 text-xs ${
                          shortDescCount > 150
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {shortDescCount}/150
                      </span>
                    </div>
                    {error("shortDescription") ? (
                      <p className="text-red-500 font-semibold text-sm">
                        {error("shortDescription")}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-left">
                    <label className="font-semibold" htmlFor="longDescription">
                      {t("long_description")}
                    </label>
                    <div className="relative">
                      <Textarea
                        id="longDescription"
                        className="mt-1"
                        placeholder={t("long_description_placeholder")}
                        maxLength={500}
                        rows={4}
                        {...form.register("longDescription")}
                        onChange={(e) => {
                          form.register("longDescription").onChange(e);
                          setLongDescCount(e.target.value.length);
                        }}
                      />
                      <span
                        className={`absolute bottom-2 right-2 text-xs ${
                          longDescCount > 500 ? "text-red-500" : "text-gray-500"
                        }`}
                      >
                        {longDescCount}/500
                      </span>
                    </div>
                    {error("longDescription") ? (
                      <p className="text-red-500 font-semibold text-sm">
                        {error("longDescription")}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-left">
                    <label className="font-semibold" htmlFor="qualification">
                      {t("qualification")}
                    </label>
                    <select
                      id="qualification"
                      {...form.register("qualification")}
                    >
                      {EDUCTATION_LEVELS.map((option) => {
                        return (
                          <option key={option.id} value={option.value}>
                            {t_education(option.value)}
                          </option>
                        );
                      })}
                      {error("qualification") ? (
                        <p className="text-red-500 font-semibold text-sm">
                          {error("qualification")}
                        </p>
                      ) : null}
                    </select>

                    {/* <Input
                      id="qualification"
                      className="mt-1"
                      placeholder="শিক্ষাগত যোগ্যতা"
                      {...form.register("qualification")}
                    /> */}
                  </div>

                  <div className="text-left">
                    <label className="font-semibold" htmlFor="experience">
                      {t("experience")}
                    </label>
                    <select
                      id="experience"
                      className="mt-1 h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 appearance-none"
                      {...form.register("experience")}
                    >
                      {[
                        "0-1",
                        "1-2",
                        "2-3",
                        "3-4",
                        "4-5",
                        "5-7",
                        "7-10",
                        "10+"
                      ].map((value) => (
                        <option key={value} value={value}>
                          {t_exprerience(value)}
                        </option>
                      ))}
                    </select>
                    {/* <Input
                      id="experience"
                      className="mt-1"
                      placeholder="অভিজ্ঞতা"
                      {...form.register("experience")}
                    /> */}
                    {error("experience") ? (
                      <p className="text-red-500 font-semibold text-sm">
                        {error("experience")}
                      </p>
                    ) : null}
                  </div>

                  {/* Replace the Division Select component with this */}
                  <div className="mt-8 mb-4">
                    <h3 className="text-lg font-semibold mb-4">
                      {t("workplace")}
                    </h3>
                    <div className="grid grid-cols-1 gap-6 border rounded-lg p-4 bg-gray-50">
                      <div className="text-left">
                        <label className="font-semibold" htmlFor="division">
                          {t("division")}
                        </label>
                        <select
                          id="division"
                          className="mt-1 h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 appearance-none"
                          defaultValue={copyJob ? copyJob?.division : ""}
                          onChange={(event) => {
                            const value = event.target.value;
                            form.setValue("division", value);
                            form.setValue("district", "");
                            setDistricts(
                              DIVISIONS.find((item) => item.division === value)
                                ?.districts as []
                            );
                          }}
                        >
                          <option value="" disabled>
                            {t("division")}
                          </option>
                          {DIVISIONS.map((item) => (
                            <option key={item.id} value={item.division}>
                              {t_divisions(item.division)}
                            </option>
                          ))}
                        </select>
                        {error("division") ? (
                          <p className="text-red-500 font-semibold text-sm">
                            {error("division")}
                          </p>
                        ) : null}
                      </div>

                      {districts.length > 0 && (
                        <div className="text-left">
                          <label className="font-semibold" htmlFor="district">
                            {t("district")}
                          </label>
                          <select
                            id="district"
                            className="mt-1 h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 appearance-none"
                            defaultValue={copyJob ? copyJob?.district : ""}
                            onChange={(event) =>
                              form.setValue("district", event.target.value)
                            }
                          >
                            <option value="" disabled>
                              {t("district")}
                            </option>
                            {districts.map((item, idx) => (
                              <option key={idx} value={item}>
                                {t_districts(item)}
                              </option>
                            ))}
                          </select>
                          {error("district") ? (
                            <p className="text-red-500 font-semibold text-sm">
                              {error("district")}
                            </p>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 text-left">
                    <label className="font-semibold" htmlFor="jobRole">
                      {t("job_role")}{" "}
                    </label>
                    <select
                      id="jobRole"
                      value={form.getValues("jobRole")}
                      onChange={(event) => {
                        const value = event.target.value;
                        setJobRole(value);
                        form.setValue("jobRole", value);
                      }}
                    >
                      {JOB_ROLES.map((item, idx) => {
                        return (
                          <option key={idx} value={item.value}>
                            {t_roles(item.label)}
                          </option>
                        );
                      })}
                    </select>
                    {error("jobRole") ? (
                      <p className="text-red-500 font-semibold text-sm">
                        {error("jobRole")}
                      </p>
                    ) : null}
                  </div>

                  {form.getValues("jobRole") === "ট্রাক ড্রাইভার" && (
                    <div className="mb-4 ">
                      <label className="font-semibold">
                        {t("required_documents")}{" "}
                      </label>

                      <div className="mt-2 text-left flex items-center gap-8">
                        <div>
                          <input
                            type="checkbox"
                            id="chairman-birth-certificate"
                            {...form.register("isBirthCertificateRequired")}
                          />
                          <label
                            htmlFor="chairman-birth-certificate"
                            className="ml-1"
                          >
                            {t("chairman_certificate")}{" "}
                          </label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="port-entry-permit"
                            {...form.register("isPortEntryPermitRequired")}
                          />
                          <label htmlFor="port-entry-permit" className="ml-1">
                            {t("port_entry_permit")}{" "}
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-left">
                    <label className="font-semibold" htmlFor="deadline">
                      {t("application_deadline")}
                    </label>
                    <Input
                      id="deadline"
                      className="mt-1"
                      type="date"
                      placeholder={t("application_deadline")}
                      min={moment().format("YYYY-MM-DD")} // Add minimum date as today
                      value={moment(date).format("YYYY-MM-DD")}
                      onChange={(event) => {
                        setDate(new Date(event.target.value));
                        form.setValue(
                          "applicationDeadline",
                          event.target.value + "T00:00:00"
                        );
                      }}
                    />
                    {error("applicationDeadline") ? (
                      <p className="text-red-500 font-semibold text-sm">
                        {error("applicationDeadline")}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-left">
                    <label className="font-semibold" htmlFor="salary">
                      {t("salary")}
                    </label>
                    <Input
                      id="salary"
                      type="number"
                      className="mt-1"
                      placeholder={t("salary")}
                      {...form.register("salary")}
                    />
                    {error("salary") ? (
                      <p className="text-red-500 font-semibold text-sm">
                        {error("salary")}
                      </p>
                    ) : null}
                  </div>

                  <div className="">
                    <Button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full"
                      disabled={isLoading}
                    >
                      {isLoading && <Loader className="animate-spin" />}{" "}
                      {t("submit")}
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </>
  );
}
