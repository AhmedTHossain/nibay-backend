"use client";

import { JOB_ROLES, JOB_TYPES } from "@/app/assets/resources";
import Header from "@/app/components/header";
import useJobById from "@/app/hooks/jobs/useJobById";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api_client } from "@/lib/axios";
import { EDUCATION_PRECEDENCE, EDUCTATION_LEVELS } from "@/lib/constant";
import { REQUIRED_ERROR } from "@/lib/error";
import { TJob } from "@/utils/types/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const jobSchema = z.object({
  title: z.string().min(1, REQUIRED_ERROR),
  shortDescription: z.string().min(1, REQUIRED_ERROR),
  longDescription: z.string().min(1, REQUIRED_ERROR),
  qualification: z.string().min(1, REQUIRED_ERROR),
  experience: z.string().min(1, REQUIRED_ERROR),
  applicationDeadline: z
    .string()
    .min(1, REQUIRED_ERROR)
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Deadline must be a valid date."
    }),
  location: z.string().min(1, REQUIRED_ERROR),
  salary: z.string().nullable(),
  jobType: z.enum(JOB_TYPES, {
    errorMap: () => ({ message: REQUIRED_ERROR })
  }),
  jobRole: z.enum(JOB_ROLES, {
    errorMap: () => ({ message: REQUIRED_ERROR })
  })
});

export type TJobProps = Omit<
  TJob,
  "_id" | "__v" | "createdAt" | "updatedAt" | "user"
>;

export default function EditJobRoute({
  params
}: {
  params: { jobId: string };
}) {
  const router = useRouter();
  const { job, isLoading: jobLoading } = useJobById({ jobId: params.jobId });
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [qualification, setQualification] = useState<string>();
  const [experience, setExperience] = useState<string>();
  const [jobRole, setJobRole] = useState<string>();
  const [jobType, setJobType] = useState<string>();

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      longDescription: "",
      qualification: "NO_FORMAL_EDUCATION",
      experience: "0-1",
      applicationDeadline: moment().format("YYYY-MM-DDTHH:mm"),
      location: "",
      salary: "",
      jobRole: "চেকার",
      jobType: "ফুল টাইম"
    }
  });

  async function onSubmit(values: z.infer<typeof jobSchema>) {
    setIsLoading(true);

    const body = {
      ...values,
      applicationDeadline: date
    };

    api_client
      .patch(`jobs/${job?._id}`, body)
      .then((res) => {
        if (res.data.status === "success") {
          router.push(`/jobs/${job?._id}`);
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (job) {
      Object.keys(form.getValues()).forEach((key) => {
        setExperience(job["experience"]);
        setQualification(job["qualification"]);

        if (key === "applicationDeadline") {
          const deadline = new Date(job?.applicationDeadline)
            .toISOString()
            .split(".")[0]
            .toString();
          setDate(new Date(job?.applicationDeadline));
          form.setValue("applicationDeadline", deadline);
        } else {
          // eslint-disable-next-line
          // @ts-ignore
          form.setValue(key as keyof TJobProps, job[key]);
        }
      });
    }

    // eslint-disable-next-line
  }, [job]);

  return (
    <>
      <Header />

      <section className="relative py-36">
        <div className="container">
          <h3 className="font-semibold text-3xl text-center">
            চাকরিটি এডিট করুন
          </h3>

          {jobLoading ? (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  marginTop: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Loader size={22} className="animate-spin" />
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.5 }}
              >
                <form
                  className="text-left mt-20 max-w-2xl mx-auto"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="grid grid-cols-1">
                    <div className="mb-4 text-left">
                      <label className="font-semibold" htmlFor="title">
                        চাকরির শিরোনাম
                      </label>
                      <Input
                        id="title"
                        className="mt-3"
                        placeholder="চাকরির শিরোনাম"
                        {...form.register("title")}
                      />
                    </div>
                    <div className="mb-4 text-left">
                      <label
                        className="font-semibold"
                        htmlFor="shortDescription"
                      >
                        কাজের সারসংক্ষেপ
                      </label>
                      <Textarea
                        id="shortDescription"
                        className="mt-3"
                        placeholder="কাজের সারসংক্ষেপ"
                        rows={4}
                        {...form.register("shortDescription")}
                      />
                    </div>

                    <div className="mb-4 text-left">
                      <label
                        className="font-semibold"
                        htmlFor="longDescription"
                      >
                        কাজের বিবরণ
                      </label>
                      <Textarea
                        id="longDescription"
                        className="mt-3"
                        placeholder="কাজের বিবরণ"
                        rows={4}
                        {...form.register("longDescription")}
                      />
                    </div>

                    <div className="mb-4 text-left">
                      <label className="font-semibold" htmlFor="qualification">
                        শিক্ষাগত যোগ্যতা
                      </label>
                      <select
                        id="experience"
                        value={qualification}
                        onChange={(event) => {
                          const value = event.target.value;
                          setQualification(value);
                          form.setValue("qualification", value);
                        }}
                      >
                        {EDUCTATION_LEVELS.map((option) => {
                          return (
                            <option key={option.id} value={option.value}>
                              {option.label}
                            </option>
                          );
                        })}
                      </select>

                      {/* <Input
                      id="qualification"
                      className="mt-3"
                      placeholder="শিক্ষাগত যোগ্যতা"
                      {...form.register("qualification")}
                    /> */}
                    </div>

                    <div className="mb-4 text-left">
                      <label className="font-semibold" htmlFor="experience">
                        অভিজ্ঞতা
                      </label>
                      <select
                        id="experience"
                        value={experience}
                        onChange={(event) => {
                          const value = event.target.value;
                          setExperience(value);
                          form.setValue("experience", value);
                        }}
                      >
                        <option value="0-1">0 — 1 year</option>
                        <option value="1-2">1 — 2 years</option>
                        <option value="2-3">2 — 3 years</option>
                        <option value="3-4">3 — 4 years</option>
                        <option value="4-5">4 — 5 years</option>
                        <option value="5-7">5 — 7 years</option>
                        <option value="7-10">7 — 10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                      {/* <Input
                      id="experience"
                      className="mt-3"
                      placeholder="অভিজ্ঞতা"
                      {...form.register("experience")}
                    /> */}
                    </div>

                    <div className="mb-4 text-left">
                      <label className="font-semibold" htmlFor="jobRole">
                        চাকরির ভূমিকা
                      </label>
                      <select
                        id="jobRole"
                        value={jobRole}
                        onChange={(event) => {
                          const value = event.target.value;
                          setJobRole(value);
                          form.setValue("jobRole", value);
                        }}
                      >
                        {JOB_ROLES.map((item, idx) => {
                          return (
                            <option key={idx} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="mb-4 text-left">
                      <label className="font-semibold" htmlFor="jobType">
                        চাকরির ধরন
                      </label>
                      <select
                        id="jobType"
                        value={jobType}
                        onChange={(event) => {
                          const value = event.target.value;
                          setJobType(value);
                          form.setValue("jobType", value);
                        }}
                      >
                        {JOB_TYPES.map((item, idx) => {
                          return (
                            <option key={idx} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="mb-4 text-left">
                      <label
                        className="font-semibold"
                        htmlFor="applicationDeadline"
                      >
                        আবেদনের শেষ তারিখ
                      </label>
                      <Input
                        id="applicationDeadline"
                        className="mt-3"
                        type="datetime-local"
                        placeholder="আবেদনের শেষ তারিখ"
                        value={moment(date).format("YYYY-MM-DDTHH:mm")}
                        onChange={(event) => {
                          setDate(new Date(event.target.value));
                          form.setValue(
                            "applicationDeadline",
                            event.target.value + ":00"
                          );
                        }}
                      />
                      {/* <DatePicker
                      date={date}
                      setDate={(date) => {
                        setDate(date);
                        console.log("------------- for", date);
                        form.setValue(
                          "applicationDeadline",
                          new Date(date as Date).toISOString()
                        );
                      }}
                    /> */}
                    </div>

                    <div className="mb-4 text-left">
                      <label className="font-semibold" htmlFor="location">
                        কর্মস্থল
                      </label>
                      <Input
                        id="location"
                        className="mt-3"
                        placeholder="কর্মস্থল"
                        {...form.register("location")}
                      />
                    </div>

                    <div className="mb-4 text-left">
                      <label className="font-semibold" htmlFor="salary">
                        বেতন
                      </label>
                      <Input
                        id="salary"
                        className="mt-3"
                        placeholder="বেতন"
                        {...form.register("salary")}
                      />
                    </div>

                    <div className="mb-4">
                      <Button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full"
                        disabled={isLoading}
                      >
                        {isLoading && <Loader className="animate-spin" />}{" "}
                        সাবমিট
                      </Button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
