"use client";

import useUserById from "@/app/hooks/users/useUserById";
import { Button } from "@/components/ui/button";
import { api_client } from "@/lib/axios";
import {
  APPLICATION_STATUS,
  EDUCTATION_LEVELS,
  MAX_EDUCATION_LEVEL,
  USER_ROLE
} from "@/lib/constant";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";
import { TUser } from "@/utils/types/user";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "sonner";

interface ApplicantCardProps extends TUser {
  application: {
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
  };
}

export function ApplicantCard(props: ApplicantCardProps) {
  const router = useRouter();

  const { application } = props;
  const { user, isLoading } = useUserById({ userId: application?.applicant.id });

  if (!isLoading) {
    console.log(user?.profilePhoto);
  }

  function handleApplicantStatus(status: keyof typeof APPLICATION_STATUS) {
    api_client
      .patch(`/jobs/${application?.job.id}/${application?.applicant.id}`, {
        status
      })
      .then((res) => {
        if (res.data.status === "success") {
          router.push(`/jobs/${application?.job.id}`);
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { });
  }

  return (
    <div
      className="w-[290px] relative group bg-white dark:bg-slate-900 overflow-hidden rounded-md shadow dark:shadow-gray-700 text-center p-6 hover:bg-emerald-600/[0.02] hover:dark:bg-emerald-600/5 transition-all duration-500 cursor-pointer"
      onClick={() => {
        console.log(application?.applicant)
        router.push(`/applicant/${application?.applicant.id}?jobId=${application?.job.id}`);
      }}
    >
      <p className="text-xs font-semibold absolute top-3 right-2 bg-violet-800 text-violet-200 py-1 px-2 rounded-3xl">
        {APPLICATION_STATUS[application?.applicationStatus as keyof typeof APPLICATION_STATUS].label}
      </p>
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
            <Loader size={22} className="animate-spin" />
          </motion.div>
        </AnimatePresence>
      ) : (
        <>
          <Image unoptimized
            src={`${user?.profilePhoto || "/"}`}
            width={60}
            height={60}
            className="size-20 rounded-full shadow dark:shadow-gray-700 mx-auto"
            alt="Profile Photo"
          />
          <div className="mt-2">
            <p className="font-semibold text-lg text-slate-800 dark:text-slate-200">{application?.applicant.name}</p>
            <p className="text-sm text-slate-800 dark:text-slate-400">
              {USER_ROLE[Number(user?.role) as keyof typeof USER_ROLE]?.label}
            </p>
          </div>

          <div className="mt-6 text-left space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-slate-800 dark:text-slate-200 text-sm min-w-[100px] shrink-0 pr-0 mr-0">শিক্ষাগত যোগ্যতা</span>
              <span className="p-0 m-0">:</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                {
                  EDUCTATION_LEVELS.find(level => level.id === Number(user?.maxEducationLevel))?.label
                }
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-800 dark:text-slate-200 text-sm min-w-[100px]">অভিজ্ঞতা</span>
              <span className="p-0 m-0">:</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {formatEnglishToBangalNum(user?.yearsOfExperience)} বছর
              </span>
            </div>

            <div className="flex items-center justify-between pt-5">
              <button
                className="text-xs bg-[#10b981] p-[7px] text-white rounded-sm"
                onClick={(event) => {
                  event.stopPropagation();
                  handleApplicantStatus("ACCEPTED");
                }}
              >
                গ্রহণ করুন
              </button>
              <button
                className="text-xs bg-red-700 p-[7px] text-white rounded-sm"
                onClick={(event) => {
                  event.stopPropagation();
                  handleApplicantStatus("REJECTED");
                }}
              >
                বাতিল করুন
              </button>
              <button
                className="rounded-sm p-[7px] border transition-all duration-200 border-gray-600 hover:bg-gray-600 hover:text-white bg-transparent text-gray-800 text-xs dark:text-white"
                onClick={(event) => {
                  event.stopPropagation();
                  handleApplicantStatus("SHORT_LISTED");
                }}
              >
                শর্টলিস্ট করুন
              </button>
            </div>
          </div>
        </>

      )}
    </div>
  );
}
