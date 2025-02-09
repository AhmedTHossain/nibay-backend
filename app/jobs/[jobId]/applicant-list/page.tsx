"use client";

import { HeroSection } from "@/app/components/common/HeroSection";
import Header from "@/app/components/header";
import Footer from "@/components/sections/Footer";
import { ApplicantFilter } from "../../components/ApplicantFilter";
import useJobById from "@/app/hooks/jobs/useJobById";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Application, ApplicationStatus } from "@/utils/types/applicant";
import { ApplicantCard } from "../../components/ApplicantCard";
import { CustomPagination } from "@/app/components/common/Pagination";

const pageLimit = 12;

export default function ApplicantListRoute({
  params
}: {
  params: { jobId: string };
}) {
  const router = useRouter();
  const { job, isLoading, refetch } = useJobById({ jobId: params.jobId });
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus>("ALL");
  const [allApplicants, setAllApplicants] = useState<Application[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<Application[]>(
    []
  );
  const [paginatedApplicants, setPaginatedApplicants] = useState<Application[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [forceTrigger, setForceTrigger] = useState(false);

  useEffect(() => {
    if (!job) {
      return
    }
    // if job status is not active, remove the applicants those are deleted
    setAllApplicants(job?.applicants?.filter((applicant) => job?.applicationStatus == "ACTIVE" ? applicant?.isDeleted != true : true) || []);
  }, [job]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredApplicants?.length / pageLimit));
  }, [filteredApplicants.length]);

  useEffect(() => {
    const start = (currentPage - 1) * pageLimit;
    const end = start + pageLimit;
    setPaginatedApplicants(filteredApplicants?.slice(start, end) || []);
  }, [currentPage, forceTrigger]);

  useEffect(() => {
    if (currentPage != 1) {
      setCurrentPage(1);
    } else {
      setForceTrigger(!forceTrigger);
    }
  }, [filteredApplicants]);

  useEffect(() => {
    setFilteredApplicants(
      statusFilter == "ALL"
        ? allApplicants
        : allApplicants?.filter(
          (applicant) => applicant.applicationStatus === statusFilter
        ) || []
    );
  }, [statusFilter, allApplicants]);

  return (
    <>
      <Header />
      <HeroSection title="Applicants" />
      <section className="relative md:my-24 my-16">
        <div className="container">
          <div className="">
            <ApplicantFilter onFilterChange={setStatusFilter} />
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
                <Loader
                  size={22}
                  className="animate-spin text-slate-400 dark:text-slate-600"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.5 }}
              >
                <div className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[150px] gap-y-6">
                  {paginatedApplicants?.map((application) => {
                    return (
                      <ApplicantCard
                        key={application?.applicant?.id}
                        application={application}
                      />
                    );
                  })}
                </div>
                {paginatedApplicants !== null &&
                  filteredApplicants?.length > 0 && (
                    <div className="flex justify-center items-center w-full mt-12">
                      <CustomPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
