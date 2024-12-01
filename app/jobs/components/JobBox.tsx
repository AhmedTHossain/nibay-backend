"use client";

import { CustomPagination } from "@/app/components/common/Pagination";
import useJobs from "@/app/hooks/jobs/useJobs";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { JobDeleteModal } from "./JobDeleteModal";
import { JobGrid } from "./JobGrid";
import { Loader } from "lucide-react";

export function JobBox() {
  const [open, setIsOpen] = useState(false);
  const { jobs, isLoading } = useJobs();
  const pathname = usePathname();

  return (
    <>
      <JobDeleteModal open={open} setIsOpen={setIsOpen} />
      <div className="mt-10 ">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader size={22} />
          </div>
        ) : (
          <>
            {!jobs && <p className="text-center text-md">No jobs found!</p>}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
              {jobs !== null &&
                jobs.map((item) => {
                  return (
                    <JobGrid key={item._id} {...item} setIsOpen={setIsOpen} />
                  );
                })}
            </div>
          </>
        )}
      </div>

      {jobs !== null && jobs?.length > 0 && (
        <div className="flex justify-center items-center w-full mt-12">
          <CustomPagination />
        </div>
      )}

      {pathname === "/" && (
        <div className="justify-center flex mt-6">
          <a
            className="btn btn-link text-slate-400 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out inline-flex items-center"
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
