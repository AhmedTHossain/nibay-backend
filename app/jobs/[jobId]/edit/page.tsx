"use client";

import Header from "@/app/components/header";
import useJobById from "@/app/hooks/jobs/useJobById";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api_client } from "@/lib/axios";
import { REQUIRED_ERROR } from "@/lib/error";
import { TJob } from "@/utils/types/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const jobSchema = z.object({
  title: z.string().min(1, REQUIRED_ERROR),
  companyName: z.string().min(1, REQUIRED_ERROR),
  description: z.string().min(1, REQUIRED_ERROR),
  qualification: z.string().min(1, REQUIRED_ERROR),
  experience: z.string().min(1, REQUIRED_ERROR),
  applicationDeadline: z
    .string()
    .min(1, REQUIRED_ERROR)
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Deadline must be a valid date."
    }),
  location: z.string().min(1, REQUIRED_ERROR),
  salary: z.string().min(1, REQUIRED_ERROR),
  jobPostTime: z
    .string()
    .min(1, REQUIRED_ERROR)
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Job post time must be a valid date."
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
  const { job } = useJobById({ jobId: params.jobId });
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      companyName: "",
      description: "",
      qualification: "",
      experience: "",
      applicationDeadline: "",
      location: "",
      salary: "",
      jobPostTime: ""
    }
  });

  async function onSubmit(values: z.infer<typeof jobSchema>) {
    setIsLoading(true);
    const deadline = values.applicationDeadline + ".000Z";
    const postTime = values.jobPostTime + ".000Z";

    const body = {
      ...values,
      applicationDeadline: new Date(deadline),
      jobPostTime: new Date(postTime)
    };

    api_client
      .patch(`jobs/${job?._id}`, body)
      .then((res) => {
        if (res.data.status === "success") {
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
        if (key === "applicationDeadline" || key === "jobPostTime") {
          const deadline = new Date(job?.applicationDeadline)
            .toISOString()
            .split(".")[0]
            .toString();
          const jobPostTime = new Date(job?.jobPostTime)
            .toISOString()
            .split(".")[0]
            .toString();

          form.setValue("applicationDeadline", deadline);
          form.setValue("jobPostTime", jobPostTime);
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
                <label className="font-semibold" htmlFor="companyName">
                  কোম্পানীর নাম
                </label>
                <Input
                  id="companyName"
                  className="mt-3"
                  placeholder="জব টাইটেল"
                  {...form.register("companyName")}
                />
              </div>

              <div className="mb-4 text-left">
                <label className="font-semibold" htmlFor="description">
                  কাজের বিবরণ
                </label>
                <Textarea
                  id="description"
                  className="mt-3"
                  placeholder="কাজের বিবরণ"
                  rows={4}
                  {...form.register("description")}
                />
              </div>

              <div className="mb-4 text-left">
                <label className="font-semibold" htmlFor="qualification">
                  শিক্ষাগত যোগ্যতা
                </label>
                <Input
                  id="qualification"
                  className="mt-3"
                  placeholder="শিক্ষাগত যোগ্যতা"
                  {...form.register("qualification")}
                />
              </div>

              <div className="mb-4 text-left">
                <label className="font-semibold" htmlFor="experience">
                  অভিজ্ঞতা
                </label>
                <Input
                  id="experience"
                  className="mt-3"
                  placeholder="অভিজ্ঞতা"
                  {...form.register("experience")}
                />
              </div>

              <div className="mb-4 text-left">
                <label className="font-semibold" htmlFor="applicationDeadline">
                  আবেদনের শেষ তারিখ
                </label>
                <Input
                  id="applicationDeadline"
                  className="mt-3"
                  type="datetime-local"
                  placeholder="আবেদনের শেষ তারিখ"
                  defaultValue={form.getValues("applicationDeadline")}
                  onChange={(event) => {
                    form.setValue(
                      "applicationDeadline",
                      event.target.value + ":00"
                    );
                  }}
                  // {...form.register("applicationDeadline")}
                />
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

              <div className="mb-4 text-left">
                <label className="font-semibold" htmlFor="jobPostTime">
                  প্রকাশ তারিখ:
                </label>
                <Input
                  type="datetime-local"
                  id="jobPostTime"
                  className="mt-3"
                  placeholder="প্রকাশ তারিখ"
                  defaultValue={form.getValues("jobPostTime")}
                  onChange={(event) => {
                    form.setValue("jobPostTime", event.target.value + ":00");
                  }}
                  // {...form.register("jobPostTime")}
                />
              </div>

              <div className="mb-4">
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full"
                >
                  {isLoading && <Loader className="animate-spin" />} সাবমিট
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
