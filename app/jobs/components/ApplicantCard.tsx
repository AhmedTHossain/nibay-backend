"use client";

import applicant_img from "@/app/assets/images/applicant-1.jpg";
import { Button } from "@/components/ui/button";
import {
  APPLICATION_STATUS,
  EDUCTATION_LEVELS,
  MAX_EDUCATION_LEVEL,
  USER_ROLE
} from "@/lib/constant";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";
import { TUser } from "@/utils/types/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface ApplicantCardProps extends TUser {
  setApplicantId: Dispatch<SetStateAction<string | null>>;
  handleApplicantStatus: (status: keyof typeof APPLICATION_STATUS) => void;
}

export function ApplicantCard(props: ApplicantCardProps) {
  const router = useRouter();

  const { handleApplicantStatus, setApplicantId, ...applicant } = props;

  return (
    <div
      className="relative group bg-white dark:bg-slate-900 overflow-hidden rounded-md shadow dark:shadow-gray-700 text-center p-6 hover:bg-emerald-600/[0.02] hover:dark:bg-emerald-600/5 transition-all duration-500 cursor-pointer"
      onClick={() => {
        console.log(applicant?.applicant)
        //@ts-expect-error not necessary at this point
        router.push(`/applicant/${applicant?.applicant.id}`);
      }}
    >
      <p className="text-[9px] font-semibold absolute top-3 right-2 bg-violet-800 text-violet-200 py-1 px-2 rounded-3xl">
        {applicant?.applicationStatus}
      </p>
      <Image
        src={applicant_img}
        className=" size-20 rounded-full shadow dark:shadow-gray-700 mx-auto"
        alt=""
      />
      <div className="mt-2">
        <p className="font-semibold text-lg">{applicant?.name}</p>
        <p className="text-sm text-slate-800">
          {USER_ROLE[Number(applicant?.role) as keyof typeof USER_ROLE]}
        </p>
      </div>

      <div className="mt-6 text-left space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-slate-800 text-sm">শিক্ষাগত যোগ্যতা:</span>
          <span className="text-sm font-semibold">
            {
              EDUCTATION_LEVELS.find(
                (item) =>
                  item.value ===
                  MAX_EDUCATION_LEVEL[
                    Number(
                      applicant?.maxEducationLevel
                    ) as keyof typeof MAX_EDUCATION_LEVEL
                  ]
              )?.label
            }
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-800 text-sm ">অভিজ্ঞতা:</span>
          <span className="text-sm font-semibold">
            {formatEnglishToBangalNum(applicant.yearsOfExperience)} বছর
          </span>
        </div>

        <div className="flex items-center justify-between pt-5">
          <button
            className="text-xs bg-[#10b981] p-[7px] text-white rounded-sm"
            onClick={(event) => {
              event.stopPropagation();
              setApplicantId(applicant?._id);
              handleApplicantStatus("ACCEPTED");
            }}
          >
            Accept
          </button>
          <button
            className="text-xs bg-red-700 p-[7px] text-white rounded-sm"
            onClick={(event) => {
              event.stopPropagation();
              setApplicantId(applicant?._id);
              handleApplicantStatus("REJECTED");
            }}
          >
            Reject
          </button>
          <button
            className="rounded-sm p-[7px] border transition-all duration-200 border-gray-600 hover:bg-gray-600 hover:text-white bg-transparent text-gray-800 text-xs"
            onClick={(event) => {
              event.stopPropagation();
              setApplicantId(applicant?._id);
              handleApplicantStatus("SHORT_LISTED");
            }}
          >
            Short list
          </button>

          {/* <Button className="bg-[#10b981] hover:bg-[#10b981] text-xs">
            Accept
          </Button>
          <Button className="bg-red-600 hover:bg-red-600 text-xs">
            Reject
          </Button>
          <Button className="border border-gray-600 hover:bg-gray-600 hover:text-white bg-transparent text-gray-800 text-xs">
            Short listed
          </Button> */}
        </div>
      </div>
    </div>
  );
}
