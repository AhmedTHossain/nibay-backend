"use client";

import applicant_img from "@/app/assets/images/applicant-1.jpg";
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ApplicantCard() {
  return (
    <div className="group bg-white dark:bg-slate-900 relative overflow-hidden rounded-md shadow dark:shadow-gray-700 text-center p-6">
      <Image
        src={applicant_img}
        className=" size-20 rounded-full shadow dark:shadow-gray-700 mx-auto"
        alt=""
      />
      <div className="mt-2">
        <Link
          className="hover:text-emerald-600 font-semibold text-lg"
          href="/applicant/1"
        >
          Web Designer
        </Link>
        <p className="text-sm text-slate-400">Web Designer</p>
      </div>
      <ul className="mt-2 list-none space-x-0.5">
        <li className="inline">
          <span className="bg-emerald-600/10 inline-block text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full">
            Design
          </span>
        </li>
        <li className="inline">
          <span className="bg-emerald-600/10 inline-block text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full">
            UI
          </span>
        </li>
        <li className="inline">
          <span className="bg-emerald-600/10 inline-block text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full">
            Digital
          </span>
        </li>
      </ul>
      <div className="flex justify-between mt-2">
        <div className="block">
          <span className="text-slate-400">Salery:</span>
          <span className="block text-sm font-semibold">$4k - $4.5k</span>
        </div>
        <div className="block">
          <span className="text-slate-400">Experience:</span>
          <span className="block text-sm font-semibold">2 Years</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 justify-center">
        <Link href="/applicant/1">
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 dark:border-emerald-600 text-white rounded-md"
          >
            Profile
          </Button>
        </Link>
        <a
          className="bg-emerald-600/5 hover:bg-emerald-600 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 hover:text-white rounded-full ms-1"
          href="/candidate-list"
        >
          <MessageCircleMore size={20} />
        </a>
      </div>
      <span className="w-24 text-white p-1 text-center absolute ltr:-rotate-45 rtl:rotate-45 -start-[30px] top-3 bg-yellow-400 flex justify-center">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 1024 1024"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" />
        </svg>
      </span>
      <span className="absolute top-[10px] end-4">
        <a
          className="text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600 text-2xl"
          href="/candidate-list"
        >
          <i className="mdi mdi-heart" />
        </a>
      </span>
    </div>
  );
}
