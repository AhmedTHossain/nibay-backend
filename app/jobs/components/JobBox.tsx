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
    </>
  );
}
