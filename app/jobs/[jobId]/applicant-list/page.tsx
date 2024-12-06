"use client";

import { HeroSection } from "@/app/components/common/HeroSection";
import Header from "@/app/components/header";
import Footer from "@/components/sections/Footer";
import { ApplicantCard } from "../../components/ApplicantCard";
import { ApplicantFilter } from "../../components/ApplicantFilter";

export default function ApplicantListRoute() {
  return (
    <>
      <Header />
      <HeroSection title="Applicants" />
      <section className="relative md:my-24 my-16">
        <div className="container">
          <div className="">
            <ApplicantFilter />
          </div>

          <div className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
          </div>
          <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
            <div className="md:col-span-12 text-center">
              <nav aria-label="Page navigation example">
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <a
                      className="size-[40px] inline-flex justify-center items-center text-slate-800 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                      href="/candidate-list"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        className="text-[20px] rtl:rotate-180 rtl:-mt-1"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0V0z" />
                        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      className="size-[40px] inline-flex justify-center items-center text-slate-800 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                      href="/candidate-list"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="page"
                      className="size-[40px] inline-flex justify-center items-center text-slate-800 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                      href="/candidate-list"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-emerald-600 border border-emerald-600"
                      href="/candidate-list"
                    >
                      3
                    </a>
                  </li>
                  <li>
                    <a
                      className="size-[40px] inline-flex justify-center items-center text-slate-800 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                      href="/candidate-list"
                    >
                      4
                    </a>
                  </li>
                  <li>
                    <a
                      className="size-[40px] inline-flex justify-center items-center text-slate-800 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                      href="/candidate-list"
                    >
                      5
                    </a>
                  </li>
                  <li>
                    <a
                      className="size-[40px] inline-flex justify-center items-center text-slate-800 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                      href="/candidate-list"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        className="text-[20px] rtl:rotate-180 rtl:-mt-1"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0V0z" />
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
