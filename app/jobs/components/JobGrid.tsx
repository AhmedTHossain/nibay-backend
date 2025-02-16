"use client";

import taka_svg from "@/app/assets/Icons/taka.svg";
import { useJobContext } from "@/app/contexts/JobContext";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";
import { TJob } from "@/utils/types/job";
import { BusIcon, Copy, Edit, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("JobGrid");

  return (
    <div
      className="group relative p-5 rounded-lg border border-emerald-600/20 dark:border-emerald-600/20 bg-white dark:bg-slate-900 hover:bg-emerald-600/5 hover:dark:bg-emerald-600/10 hover:shadow-md hover:shadow-emerald-600/10 cursor-pointer"
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
            className="rounded-full bg-gray-600/10 hover:bg-gray-500 hover:border-gray-600 text-gray-600 hover:text-white w-8 h-8 flex items-center justify-center dark:bg-gray-700/10 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-white"
            title={t("duplicate")}
            onClick={(event) => {
              event.stopPropagation();
              setCopyJob(restJob);
              router.push(`/jobs/new`);
            }}
          >
            <Copy strokeWidth={1.5} size={16} />
          </p>

          <p
            className="rounded-full bg-emerald-600/10 hover:bg-emerald-500 hover:border-emerald-600 text-emerald-600 hover:text-white w-8 h-8 flex items-center justify-center dark:bg-emerald-700/10 dark:hover:bg-emerald-600 dark:text-emerald-300 dark:hover:text-white"
            title={t("edit")}
            onClick={(event) => {
              event.stopPropagation();
              router.push(`/jobs/${_id}/edit`);
            }}
          >
            <Edit strokeWidth={1.5} size={16} />
          </p>

          <p
            className="rounded-full bg-red-600/10 hover:bg-red-500 hover:border-red-600 text-red-600 hover:text-white w-8 h-8 flex items-center justify-center dark:bg-red-700/10 dark:hover:bg-red-600 dark:text-red-300 dark:hover:text-white"
            title={t("delete")}
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
        <p className="mt-4 text-xl font-semibold">{title}</p>
        <p className="text-slate-800 dark:text-slate-300 mt-2 break-words">
          {shortDescription?.substring(0, 70) +
            (shortDescription.length > 70 ? "..." : "")}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          {/* Salary Section - Left Aligned */}
          {salary && parseInt(salary) > 0 && (
            <p className="bg-purple-600/10 hover:bg-purple-600/20 dark:bg-purple-600/15 text-purple-600 px-3 text-[14px] font-medium rounded-full flex items-center gap-1">
              <Image
                unoptimized
                src={taka_svg}
                alt="Taka SVG"
                width={8}
                className="dark:invert"
              />
              <span>{formatEnglishToBangalNum(salary, t("language"))}</span>
            </p>
          )}

          {/* Job Role Section - Right Aligned */}
          <p className="ml-auto truncate bg-orange-600/10 hover:bg-orange-600/20 dark:bg-orange-600/15 text-orange-600 px-3 text-[14px] font-medium rounded-full dark:text-orange-400 dark:hover:bg-orange-600/30">
            {t("roles." + jobRole)}
          </p>
        </div>
      </div>
    </div>
  );
}
