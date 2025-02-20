"use client";

import { HeroSection } from "@/app/components/common/HeroSection";
import Header from "@/app/components/header";
import useJobById from "@/app/hooks/jobs/useJobById";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";
import { AnimatePresence, motion } from "framer-motion";
import { Edit, TimerOff, Trash } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { ApplicantListModal } from "../components/ApplicantListModal";
import { JobDeleteModal } from "../components/JobDeleteModal";
import { useRouter } from "next/navigation";
import { EDUCTATION_LEVELS, MAX_EDUCATION_LEVEL } from "@/lib/constant";
import { useTranslations } from "next-intl";

export default function JobDetailsRoute({
  params
}: {
  params: { jobId: string };
}) {
  const router = useRouter();

  const [open, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { job } = useJobById({ jobId: params.jobId });

  const t = useTranslations("JobDetails");
  const language = useTranslations("language")("code");

  return (
    <>
      <ApplicantListModal open={open} setIsOpen={setIsOpen} />
      <JobDeleteModal
        open={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        jobId={params.jobId}
      />

      <Header />
      <HeroSection title={job?.title as string} />

      <section className="relative md:py-24 py-16">
        <div className="container">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                <div className="lg:col-span-4 md:col-span-6">
                  <div className="shadow dark:shadow-gray-700 rounded-md bg-white dark:bg-slate-900 sticky top-20">
                    <div className="p-5">
                      <h5 className="text-lg font-semibold">{t("summary")}</h5>
                    </div>
                    <div className="p-6 border-t border-slate-100 dark:border-t-gray-700">
                      <ul className="list-none">
                        <li className="flex items-center mt-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-5"
                          >
                            <rect
                              x={2}
                              y={7}
                              width={20}
                              height={14}
                              rx={2}
                              ry={2}
                            />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                          <div className="ms-4">
                            <p className="font-medium">{t("experience")}</p>
                            <span className="text-emerald-600 font-medium text-sm">
                              {job?.experience
                                ?.split("-")
                                .map((item) =>
                                  formatEnglishToBangalNum(item, language)
                                )
                                .join(" - ")}{" "}
                              {t("year")}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center mt-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-5"
                          >
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          </svg>
                          <div className="ms-4">
                            <p className="font-medium">{t("education")}</p>
                            <span className="text-emerald-600 font-medium text-sm">
                              {t(`education_levels.${job?.qualification}`)}
                            </span>
                          </div>
                        </li>
                        {job?.salary && (
                          <li className="flex items-center mt-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-5"
                            >
                              <line x1={12} y1={1} x2={12} y2={23} />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            <div className="ms-4">
                              <p className="font-medium">{t("salary")}</p>
                              <span className="text-emerald-600 font-medium text-sm">
                                {formatEnglishToBangalNum(
                                  job?.salary,
                                  language
                                )}
                              </span>
                            </div>
                          </li>
                        )}

                        <li className="flex items-center mt-3">
                          <TimerOff size={22} />
                          <div className="ms-4">
                            <p className="font-medium">
                              {" "}
                              {t("application_deadline")}{" "}
                            </p>
                            <span className="text-emerald-600 font-medium text-sm">
                              {formatEnglishToBangalNum(
                                moment(job?.applicationDeadline).format(
                                  "DD-MM-YYYY"
                                ),
                                language
                              )}
                            </span>
                          </div>
                        </li>

                        <li className="mt-10 flex items-center gap-4">
                          <p
                            className="rounded-md bg-emerald-600/5 hover:bg-emerald-500 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 duration-200 transition-all hover:text-white md:relative flex items-center justify-center px-4 py-2 space-x-1 cursor-pointer text-sm font-medium"
                            title="চাকরিটি এডিট করুন"
                            onClick={(event) => {
                              event.stopPropagation();
                              router.push(`/jobs/${params.jobId}/edit`);
                            }}
                          >
                            <span>
                              <Edit strokeWidth={1.7} size={16} />
                            </span>
                            <span>{t("edit")}</span>
                          </p>
                          <p
                            className="rounded-md bg-red-600/5 hover:bg-red-500 border-red-600/10 hover:border-red-600 text-red-600 duration-200 transition-all hover:text-white md:relative flex items-center justify-center px-4 py-2 space-x-1 cursor-pointer text-sm font-medium"
                            title="চাকরিটি ডিলিট করুন"
                            onClick={(event) => {
                              event.stopPropagation();
                              setIsDeleteOpen(true);
                            }}
                          >
                            <span>
                              <Trash strokeWidth={1.7} size={16} />
                            </span>
                            <span>{t("delete")}</span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-8 md:col-span-6">
                  <div className="pt-6 flex items-start justify-between">
                    <div></div>
                    {job && job?.applicants?.length > 0 && (
                      <div className="mb-5 flex justify-end">
                        <Link href={`/jobs/${params.jobId}/applicant-list`}>
                          <Button className="bg-emerald-600/5 border-emerald-100 border hover:bg-emerald-600 hover:border-emerald-600 text-emerald-600 hover:text-white rounded-md ms-2 dark:bg-emerald-600/10 dark:border-emerald-700 dark:hover:bg-emerald-600 dark:hover:border-emerald-600 dark:text-emerald-300 dark:hover:text-white">
                            {t("applicants_list")} (
                            {formatEnglishToBangalNum(
                              String(job?.applicants?.length),
                              language
                            )}
                            )
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {job?.shortDescription && (
                    <div className="mt-4">
                      <h5 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {t("short_description")}
                      </h5>
                      <pre className="text-slate-800 dark:text-slate-300">
                        {job?.shortDescription}
                      </pre>
                    </div>
                  )}

                  {job?.longDescription && (
                    <div className="mt-8">
                      <h5 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {t("long_description")}
                      </h5>
                      <pre className="text-slate-800 dark:text-slate-300">
                        {job?.longDescription}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </>
  );
}
