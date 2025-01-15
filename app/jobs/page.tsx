"use client";

import Footer from "@/components/sections/Footer";
import { HeroSection } from "../components/common/HeroSection";
import { WhySection } from "../components/common/WhySection";
import Header from "../components/header";
import { JobBox } from "./components/JobBox";
import { JobFilter } from "./components/JobFilter";
import { useJobContext } from "../contexts/JobContext";
import { JobFilterByStatus } from "./components/JobFilterByStatus";
import { useEffect, useState } from "react";
import { TJob } from "@/utils/types/job";

export default function JobsRoute() {
  const { jobs, isLoading } = useJobContext();

  const [filteredJobs, setFilteredJobs] = useState<TJob[]>([]);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleFilterChange = (role: string) => {
    if (role === "all") {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.jobRole === role));
    }
  };

  const handleStatusFilterChange = (status: string) => {
    if (status === "all") {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.status === status));
    }
  }

  return (
    <>
      <Header />

      <HeroSection title="জব্‌স" />

      <section className="md:pb-24 pb-16">
        <div className="container z-1">
          <div className="mt-6 flex gap-6">
            <JobFilter onFilterChange={handleFilterChange} />
            <JobFilterByStatus onFilterChange={handleStatusFilterChange} />
          </div>
          <JobBox jobs={filteredJobs} isLoading={isLoading} />
        </div>

        <WhySection />
      </section>

      <Footer />
    </>
  );
}
