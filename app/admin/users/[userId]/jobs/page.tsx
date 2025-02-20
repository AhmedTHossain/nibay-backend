"use client";

import { HeroSection } from "@/app/components/common/HeroSection";
import { CustomPagination } from "@/app/components/common/Pagination";
import { WhySection } from "@/app/components/common/WhySection";
import Header from "@/app/components/header";
import { useJobContext } from "@/app/contexts/JobContext";
import useUserById from "@/app/hooks/users/useUserById";
import { useUser } from "@/app/hooks/useUser";
import { JobBox } from "./components/JobBox";
import { JobFilter } from "@/app/jobs/components/JobFilter";
import { JobFilterByStatus } from "@/app/jobs/components/JobFilterByStatus";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { TUser } from "@/utils/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface jobsRouteParams {
  params: { userId: string };
}

export default function JobsRoute({ params }: jobsRouteParams) {
  const { jobs, isLoading, pagination, refetch } = useJobContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [jobRoleFilter, setjobRoleFilter] = useState<string>("all");
  const [jobStatusFilter, setJobStatusFilter] = useState<string>("all");
  const [forceTrigger, setForceTrigger] = useState(false);

  const userId = params.userId;
  const { user } = useUserById({ userId });

  const t = useTranslations("Jobs");
  const t_landing = useTranslations("Landing");

  useEffect(() => {
    // Refetch jobs whenever the page or filter changes
    refetch({
      page: currentPage,
      jobRole: jobRoleFilter === "all" ? undefined : jobRoleFilter,
      jobStatus: jobStatusFilter === "all" ? undefined : jobStatusFilter,
      userId: userId
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, forceTrigger]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      setForceTrigger(!forceTrigger);
    }
  }, [jobRoleFilter, jobStatusFilter]);

  useEffect(() => {
    setForceTrigger(!forceTrigger);
  }, []);

  return (
    <>
      <Header userId={userId} />

      <HeroSection title={t("title")} />

      <section className="md:pb-24 pb-16">
        <div className="container z-1">
          <div className="mt-6 flex gap-6 items-center">
            <JobFilter onFilterChange={setjobRoleFilter} />
            <JobFilterByStatus onFilterChange={setJobStatusFilter} />
            <Link href={`/admin/users/${userId}/jobs/new`}>
              <Button
                size="lg"
                className="bg-[#10b981] text-white hover:bg-[#0e9c6e] 
             dark:bg-[#065f46] dark:text-gray-200 dark:hover:bg-[#046c47]"
              >
                {t_landing("create-new-job")}
              </Button>
            </Link>
          </div>
          <JobBox jobs={jobs} isLoading={isLoading} />
          {jobs !== null && jobs?.length > 0 && (
            <div className="flex justify-center items-center w-full mt-12">
              <CustomPagination
                totalPages={pagination.totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        <WhySection />
      </section>

      <Footer />
    </>
  );
}
