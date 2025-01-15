"use client";

import { HeroSection } from "@/app/components/common/HeroSection";
import Header from "@/app/components/header";
import Footer from "@/components/sections/Footer";
import { ApplicantCard } from "../../components/ApplicantCard";
import { ApplicantFilter } from "../../components/ApplicantFilter";
import useJobById from "@/app/hooks/jobs/useJobById";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import { api_client } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { APPLICATION_STATUS } from "@/lib/constant";

type ApplicationStatus = keyof typeof APPLICATION_STATUS | "ALL";
import { TJob } from "@/utils/types/job";

interface Application {
  applicant: {
    id: string;
    name: string;
  };
  job: {
    id: string;
    title: string;
  };
  applicationStatus: keyof typeof APPLICATION_STATUS;
  statusChangeDate: Date;
  review: string | null;
  reviewCreatedDate: Date | null;
}

export default function ApplicantListRoute({
  params
}: {
  params: { jobId: string };
}) {
  const { job, isLoading, refetch } = useJobById({ jobId: params.jobId });
  const router = useRouter();
  const [filteredApplicants, setFilteredApplicants] = useState<Application[]>([]);

  useEffect(() => {
    setFilteredApplicants(job?.applicants || []);
  }, [job]);

  const handleFilterChange = (status: ApplicationStatus) => {
    if (status === "ALL") {
      setFilteredApplicants(job?.applicants || []);
    }
    else {
      setFilteredApplicants(job?.applicants?.filter(applicant => applicant.applicationStatus === status) || []);
    }
  };


  return (
    <>
      <Header />
      <HeroSection title="Applicants" />
      <section className="relative md:my-24 my-16">
        <div className="container">
          <div className="">
            <ApplicantFilter onFilterChange={handleFilterChange} />
          </div>

          {isLoading ? (
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
                <Loader size={22} className="animate-spin text-slate-400 dark:text-slate-600" />
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.5 }}
              >
                <div className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                  {filteredApplicants?.map((application) => {
                    return (
                      //eslint-disable-next-line
                      // @ts-ignore
                      <ApplicantCard
                        key={application?.applicant?.id}
                        application={application}
                      />
                    );
                  })}
                </div>
                <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                  <div className="md:col-span-12 text-center">
                    <nav aria-label="Page navigation example">
                      <ul className="inline-flex items-center -space-x-px">
                        <li>
                          <a
                            className="size-[40px] inline-flex justify-center items-center text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                            href="/candidate-list"
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 24 24"
                              className="text-[20px] rtl:rotate-180 rtl:-mt-1"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path fill="none" d="M0 0h24v24H0V0z" />
                              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a
                            className="size-[40px] inline-flex justify-center items-center text-slate-800 dark:text-slate-200 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                            href="/candidate-list"
                          >
                            1
                          </a>
                        </li>
                        <li>
                          <a
                            aria-current="page"
                            className="size-[40px] inline-flex justify-center items-center text-slate-800 dark:text-slate-200 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                            href="/candidate-list"
                          >
                            2
                          </a>
                        </li>
                        <li>
                          <a
                            className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-emerald-600 border border-emerald-600"
                            href="/candidate-list"
                          >
                            3
                          </a>
                        </li>
                        <li>
                          <a
                            className="size-[40px] inline-flex justify-center items-center text-slate-800 dark:text-slate-200 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                            href="/candidate-list"
                          >
                            4
                          </a>
                        </li>
                        <li>
                          <a
                            className="size-[40px] inline-flex justify-center items-center text-slate-800 dark:text-slate-200 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                            href="/candidate-list"
                          >
                            5
                          </a>
                        </li>
                        <li>
                          <a
                            className="size-[40px] inline-flex justify-center items-center text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                            href="/candidate-list"
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 24 24"
                              className="text-[20px] rtl:rotate-180 rtl:-mt-1"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path fill="none" d="M0 0h24v24H0V0z" />
                              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>


      <Footer />
    </>
  );
}
