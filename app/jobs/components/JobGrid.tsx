"use client";

import taka_svg from "@/app/assets/Icons/taka.svg";
import { TJob } from "@/utils/types/job";
import { BusIcon, Edit, MapPin, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface JobGridProps extends TJob {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function JobGrid(props: JobGridProps) {
  const { companyName, location, title, salary, setIsOpen, _id } = props;
  const router = useRouter();

  return (
    <div
      className="group p-6 rounded-lg border border-emerald-600/20 dark:border-emerald-600/40 bg-white dark:bg-slate-900 hover:bg-emerald-600/[0.02] hover:dark:bg-emerald-600/5 hover:shadow-md hover:shadow-emerald-600/5 transition-all duration-500 cursor-pointer"
      onClick={() => {
        router.push(`/jobs/${_id}`);
      }}
    >
      <div className="flex justify-between items-start">
        <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-full mb-2">
          <BusIcon size={26} />
        </div>
        <div className="flex items-center space-x-2">
          <span
            className="rounded-full bg-emerald-600/5 hover:bg-emerald-500 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 hover:text-white md:relative absolute top-0 end-0 md:m-0 m-3 w-8 h-8 flex items-center justify-center"
            onClick={(event) => {
              event.stopPropagation();
              router.push(`/jobs/${_id}/edit`);
            }}
          >
            <Edit strokeWidth={1.5} size={16} />
          </span>
          <span
            className="rounded-full bg-red-600/5 hover:bg-red-500 border-red-600/10 hover:border-red-600 text-red-600 hover:text-white md:relative absolute top-0 end-0 md:m-0 m-3 w-8 h-8 flex items-center justify-center"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(true);
            }}
          >
            <Trash strokeWidth={1.5} size={16} />
          </span>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xl font-semibold transition-all duration-500">
          {companyName} চাকরির বিজ্ঞপ্তি
        </p>
        <p className="text-slate-400 mt-2">{title}</p>
        <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
          <p>
            <span className="bg-purple-600/5 hover:bg-purple-600/20 dark:bg-purple-600/10 hover:dark:bg-purple-600/30 text-purple-600 px-4 text-[14px] inline-flex space-x-1 font-medium rounded-full mt-2 me-1 transition-all duration-500">
              <Image src={taka_svg} alt="Taka SVG" width={10} />
              <span>{salary}</span>
            </span>
          </p>
          <p>
            <span className="bg-emerald-600/5 hover:bg-emerald-600/20 dark:bg-emerald-600/10 hover:dark:bg-emerald-600/30 inline-flex items-center text-emerald-600 px-4 text-[14px] font-medium rounded-full mt-2 transition-all duration-500">
              <MapPin size={14} />
              {location}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
