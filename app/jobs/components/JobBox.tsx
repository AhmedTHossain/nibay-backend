"use client";

import { CustomPagination } from "@/app/components/common/Pagination";
import { useJobContext } from "@/app/contexts/JobContext";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { JobDeleteModal } from "./JobDeleteModal";
import { JobGrid } from "./JobGrid";
import { JobCreateType } from "../new/page";
import { TJob } from "@/utils/types/job";

type JobBoxProps = {
  jobs: TJob[];
  isLoading: boolean;
};

export function JobBox({ jobs, isLoading }: JobBoxProps) {
  const [open, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [jobId, setJobId] = useState<string | undefined>(undefined);

  // const { jobs, isLoading } = useJobContext();

  return (
    <>
      <JobDeleteModal open={open} setIsOpen={setIsOpen} jobId={jobId} />
      <div className="mt-10 ">
        {isLoading ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {jobs?.length === 0 && (
                <p className="text-center text-md">No jobs found!</p>
              )}
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                {jobs &&
                  jobs.map((item) => {
                    return (
                      <JobGrid
                        key={item._id}
                        {...item}
                        setIsOpen={setIsOpen}
                        setJobId={setJobId}
                      />
                    );
                  })}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Loader size={22} className="animate-spin" />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {jobs?.length === 0 && (
                <p className="text-center text-md">No jobs found!</p>
              )}
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                {jobs !== null &&
                  jobs.map((item) => {
                    return (
                      <JobGrid key={item._id} {...item} setIsOpen={setIsOpen} />
                    );
                  })}
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>

      {jobs !== null && jobs?.length > 0 && (
        <div className="flex justify-center items-center w-full mt-12">
          <CustomPagination />
        </div>
      )}

      {pathname === "/" && jobs?.length > 0 && (
        <div className="justify-center flex mt-6">
          <a
            className="btn btn-link text-slate-800 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out inline-flex items-center"
            href="/jobs"
          >
            See all Jobs{" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              className="ms-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
            </svg>
          </a>
        </div>
      )}
    </>
  );
}
