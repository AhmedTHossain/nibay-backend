"use client";

import applicant_img from "@/app/assets/images/applicant-1.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ApplicantCard() {
  const router = useRouter();

  return (
    <div
      className="group bg-white dark:bg-slate-900 relative overflow-hidden rounded-md shadow dark:shadow-gray-700 text-center p-6 hover:bg-emerald-600/[0.02] hover:dark:bg-emerald-600/5 transition-all duration-500 cursor-pointer"
      onClick={() => {
        router.push("/applicant/1");
      }}
    >
      <Image
        src={applicant_img}
        className=" size-20 rounded-full shadow dark:shadow-gray-700 mx-auto"
        alt=""
      />
      <div className="mt-2">
        <p className="font-semibold text-lg">আব্দুল কালাম</p>
        <p className="text-sm text-slate-800">ড্রাইভার</p>
      </div>

      <div className="mt-6 text-left space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-slate-800 text-sm">শিক্ষাগত যোগ্যতা:</span>
          <span className="text-sm font-semibold">অনার্স</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-800 text-sm ">অভিজ্ঞতা:</span>
          <span className="text-sm font-semibold">৫ থেকে ৮ বছর</span>
        </div>
      </div>
    </div>
  );
}
