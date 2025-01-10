"use client";

import taka_svg from "@/app/assets/Icons/taka.svg";
import { useJobContext } from "@/app/contexts/JobContext";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";
import { TJob } from "@/utils/types/job";
import { BusIcon, Copy, Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface JobGridProps extends TJob {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setJobId: Dispatch<SetStateAction<string | undefined>>;
}

export function JobGrid(props: JobGridProps) {
  const { setIsOpen, setJobId, ...restJob } = props;
  const { title, shortDescription, salary, _id, jobRole } = restJob;
  const { setCopyJob } = useJobContext();
  const router = useRouter();

  return (
    <div
      className="group relative p-5 rounded-lg border border-emerald-600/20 dark:border-emerald-600/40 bg-white dark:bg-slate-900 hover:bg-emerald-600/[0.02] hover:dark:bg-emerald-600/5 hover:shadow-md hover:shadow-emerald-600/5 transition-all duration-500 cursor-pointer"
      onClick={() => {
        router.push(`/jobs/${_id}`);
      }}
    >
      <div className="flex justify-between items-center">
        <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-full">
          <BusIcon size={26} />
        </div>
        <div className="flex items-center space-x-2">
          <p
            className="rounded-full bg-gray-600/5 hover:bg-gray-500 border-gray-600/10 hover:border-gray-600 text-gray-600 hover:text-white md:relative w-8 h-8 flex items-center justify-center"
            title="চাকরিটি ডুপ্লিকেট করুন"
            onClick={(event) => {
              event.stopPropagation();
              console.log("restJob", restJob);
              setCopyJob(restJob);
              router.push(`/jobs/new`);
            }}
          >
            <Copy strokeWidth={1.5} size={16} />
          </p>

          <p
            className="rounded-full bg-emerald-600/5 hover:bg-emerald-500 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 hover:text-white md:relative w-8 h-8 flex items-center justify-center"
            title="চাকরিটি এডিট করুন"
            onClick={(event) => {
              event.stopPropagation();
              router.push(`/jobs/${_id}/edit`);
            }}
          >
            <Edit strokeWidth={1.5} size={16} />
          </p>
          <p
            className="rounded-full bg-red-600/5 hover:bg-red-500 border-red-600/10 hover:border-red-600 text-red-600 hover:text-white md:relative w-8 h-8 flex items-center justify-center"
            title="চাকরিটি ডিলিট করুন"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(true);
              setJobId(_id);
            }}
          >
            <Trash strokeWidth={1.5} size={16} />
          </p>
        </div>
      </div>
      <div className="mt-3">
        <p className="mt-4 text-xl font-semibold transition-all duration-500">
          {title}
        </p>
        <p className="text-slate-800 mt-2">
          {shortDescription?.substring(0, 70) + "..."}
        </p>
        <div className="mt-3 flex items-center justify-between flex-wrap gap-1">
          <p>
            {salary && parseInt(salary) > 0 && (
              <span className="bg-purple-600/5 hover:bg-purple-600/20 dark:bg-purple-600/10 hover:dark:bg-purple-600/30 text-purple-600 px-3 text-[14px] inline-flex space-x-1 font-medium rounded-full mt-2 me-1 transition-all duration-500">
                <Image src={taka_svg} alt="Taka SVG" width={10} />
                <span>{formatEnglishToBangalNum(salary)}</span>
              </span>
            )}
          </p>
          <p>
            <span className="bg-orange-600/5 hover:bg-orange-600/20 dark:bg-orange-600/10 hover:dark:bg-orange-600/30 inline-flex items-center text-orange-600 px-3 text-[14px] font-medium rounded-full transition-all duration-500">
              {jobRole}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
