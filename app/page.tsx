"use client";

import Footer from "@/components/sections/Footer";
import {
  HowItWorks,
  howItWorksItems
} from "@/components/sections/home/how-it-works";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "./components/header";
import { useAuth } from "./hooks/useAuth";
import { JobBox } from "./jobs/components/JobBox";
import { JobFilter } from "./jobs/components/JobFilter";

export default function Home() {
  useAuth();

  return (
    <div>
      <Header />

      {/* <section className="relative py-36 table w-full bg-gradient-to-b from-emerald-600/20 dark:from-emerald-600/40 via-emerald-600/10 dark:via-emerald-600/20 to-transparent">
        <div className="container">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center mt-10 gap-[30px]">
            <div className="md:order-1 order-2">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-800 md:p-8 p-6 lg:me-10 relative">
                <h4 className="mb-3 text-3xl font-semibold">
                  আপনার প্রত্যাশিত চাকরি খুঁজুন
                </h4>
                <p className="text-slate-400 text-sm">
                  চাকরি, কর্মসংস্থান এবং ক্যারিয়ারের সুযোগ খুঁজুন। আমরা বছরের
                  পর বছর ধরে চমৎকার আবেদনকারীদের নিয়োগ করতে সাহায্য করেছি এমন
                  কিছু কোম্পানি।
                </p>
                <form className="mt-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="form-label font-medium block">
                        সঠিক চাকরি খুঁজে নিন
                      </label>
                      <div className="relative mt-2 flex items-center px-4 py-2 bg-gray-50 dark:bg-slate-800">
                        <span className="">
                          <Briefcase size={18} color="#10b981" />
                        </span>
                        <Input
                          name="name"
                          type="text"
                          id="job-keyword"
                          className="border-0 bg-transparent dark:bg-transparent"
                          placeholder="সঠিক চাকরি খুঁজে নিন"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label font-medium block">
                        জেলা
                      </label>
                      <div className="relative mt-2 flex items-center px-4 py-2 bg-gray-50 dark:bg-slate-800">
                        <span className="">
                          <MapPin size={18} color="#10b981" />
                        </span>
                        <Select>
                          <SelectTrigger className="w-full bg-transparent dark:bg-transparent border-0 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="জেলা নির্বাচন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="dhaka">ঢাকা</SelectItem>
                              <SelectItem value="chattogram">
                                চট্টগ্রাম
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="form-label font-medium block">
                        কাজের ধরন
                      </label>
                      <div className="relative mt-2 flex items-center px-4 py-2 bg-gray-50 dark:bg-slate-800">
                        <span className="">
                          <BriefcaseBusinessIcon size={18} color="#10b981" />
                        </span>
                        <Select>
                          <SelectTrigger className="w-full bg-transparent dark:bg-transparent border-0 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="কাজের ধরন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="full-time">
                                Full Time
                              </SelectItem>
                              <SelectItem value="part-time">
                                Part Time
                              </SelectItem>
                              <SelectItem value="freelancer">
                                Freelancer
                              </SelectItem>
                              <SelectItem value="remote-work">
                                Remote
                              </SelectItem>
                              <SelectItem value="office">Office</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Button className="bg-[#10b981] hover:bg-[#10b981]">
                        অনুসন্ধান
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="md:order-2 order-1">
              <Image src={HeroImage} alt="Hero image" />
            </div>
          </div>
        </div>
      </section> */}

      <section className="relative pt-36 ">
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
              একটিভ জব্‌স
            </h3>
          </div>
          <div className="flex justify-end"></div>

          <div className="mt-6">
            <div className="container z-1">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <JobFilter />
                </div>
                <Link href="/jobs/new">
                  <Button
                    size="lg"
                    className="bg-emerald-600/5 border-emerald-500 border hover:bg-emerald-600 hover:border-emerald-600 font-semibold text-emerald-600 hover:text-white rounded-md ms-2"
                  >
                    নতুন চাকরি তৈরি করুন
                  </Button>
                </Link>
              </div>

              <div className="mt-6">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-[30px]">
                  <JobBox />
                </div>

                <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                  <div className="md:col-span-12 text-center">
                    <nav aria-label="Page navigation example">
                      <ul className="inline-flex items-center -space-x-px">
                        <li>
                          <a
                            className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
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
                            className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                            href="/candidate-list"
                          >
                            1
                          </a>
                        </li>
                        <li>
                          <a
                            className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                            href="/candidate-list"
                          >
                            2
                          </a>
                        </li>
                        <li>
                          <a
                            aria-current="page"
                            className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-emerald-600 border border-emerald-600"
                            href="/candidate-list"
                          >
                            3
                          </a>
                        </li>
                        <li>
                          <a
                            className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                            href="/candidate-list"
                          >
                            4
                          </a>
                        </li>
                        <li>
                          <a
                            className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
                            href="/candidate-list"
                          >
                            5
                          </a>
                        </li>
                        <li>
                          <a
                            className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600"
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
            </div>
          </div>

          <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
            <div className="md:col-span-12 text-center">
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
          </div>
        </div>
      </section>

      <section className="relative md:py-28 py-16">
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-1 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
              কিভাবে এটি কাজ করে?
            </h3>
            {/* <p className="text-slate-400 max-w-xl mx-auto">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30000+
              companies worldwide.
            </p> */}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
            {howItWorksItems.map((item) => {
              return <HowItWorks key={item.id} {...item} />;
            })}
          </div>
        </div>

        {/* <div className="container md:mt-24 mt-16">
          <div className="grid md:grid-cols-12 grid-cols-1 pb-8 items-end">
            <div className="lg:col-span-8 md:col-span-6 text-left">
              <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
                Browse by Categories
              </h3>
              <p className="text-slate-400 max-w-xl">
                Search your career opportunity with our categories
              </p>
            </div>
            <div className="lg:col-span-4 md:col-span-6 text-right hidden md:block">
              <a
                className="btn btn-link text-slate-400 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out inline-flex items-center"
                href="/index-three"
              >
                All Categories{" "}
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
          </div>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            <div className="group p-4 rounded-md shadow dark:shadow-gray-700 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all duration-500">
              <h5 className="text-lg font-semibold group-hover:text-white">
                Human Resource
              </h5>
              <span className="block text-slate-400 group-hover:text-white/50 text-sm mt-1">
                90 Jobs Available
              </span>
              <div className="mt-2">
                <a
                  className="text-emerald-600 dark:text-white/80 group-hover:text-white font-medium items-center inline-flex"
                  href="/job-grid-one"
                >
                  Explore Jobs
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
            </div>
            <div className="group p-4 rounded-md shadow dark:shadow-gray-700 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all duration-500">
              <h5 className="text-lg font-semibold group-hover:text-white">
                It &amp; Networking
              </h5>
              <span className="block text-slate-400 group-hover:text-white/50 text-sm mt-1">
                90 Jobs Available
              </span>
              <div className="mt-2">
                <a
                  className="text-emerald-600 dark:text-white/80 group-hover:text-white font-medium items-center inline-flex"
                  href="/job-grid-one"
                >
                  Explore Jobs
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
            </div>
            <div className="group p-4 rounded-md shadow dark:shadow-gray-700 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all duration-500">
              <h5 className="text-lg font-semibold group-hover:text-white">
                Sales &amp; Marketing
              </h5>
              <span className="block text-slate-400 group-hover:text-white/50 text-sm mt-1">
                90 Jobs Available
              </span>
              <div className="mt-2">
                <a
                  className="text-emerald-600 dark:text-white/80 group-hover:text-white font-medium items-center inline-flex"
                  href="/job-grid-one"
                >
                  Explore Jobs
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
            </div>
            <div className="group p-4 rounded-md shadow dark:shadow-gray-700 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all duration-500">
              <h5 className="text-lg font-semibold group-hover:text-white">
                Accounting
              </h5>
              <span className="block text-slate-400 group-hover:text-white/50 text-sm mt-1">
                90 Jobs Available
              </span>
              <div className="mt-2">
                <a
                  className="text-emerald-600 dark:text-white/80 group-hover:text-white font-medium items-center inline-flex"
                  href="/job-grid-one"
                >
                  Explore Jobs
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
            </div>
            <div className="group p-4 rounded-md shadow dark:shadow-gray-700 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all duration-500">
              <h5 className="text-lg font-semibold group-hover:text-white">
                Delivery Boy
              </h5>
              <span className="block text-slate-400 group-hover:text-white/50 text-sm mt-1">
                90 Jobs Available
              </span>
              <div className="mt-2">
                <a
                  className="text-emerald-600 dark:text-white/80 group-hover:text-white font-medium items-center inline-flex"
                  href="/job-grid-one"
                >
                  Explore Jobs
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
            </div>
            <div className="group p-4 rounded-md shadow dark:shadow-gray-700 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all duration-500">
              <h5 className="text-lg font-semibold group-hover:text-white">
                Data Science
              </h5>
              <span className="block text-slate-400 group-hover:text-white/50 text-sm mt-1">
                90 Jobs Available
              </span>
              <div className="mt-2">
                <a
                  className="text-emerald-600 dark:text-white/80 group-hover:text-white font-medium items-center inline-flex"
                  href="/job-grid-one"
                >
                  Explore Jobs
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
            </div>
            <div className="group p-4 rounded-md shadow dark:shadow-gray-700 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all duration-500">
              <h5 className="text-lg font-semibold group-hover:text-white">
                Project Manager
              </h5>
              <span className="block text-slate-400 group-hover:text-white/50 text-sm mt-1">
                90 Jobs Available
              </span>
              <div className="mt-2">
                <a
                  className="text-emerald-600 dark:text-white/80 group-hover:text-white font-medium items-center inline-flex"
                  href="/job-grid-one"
                >
                  Explore Jobs
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
            </div>
            <div className="group p-4 rounded-md shadow dark:shadow-gray-700 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all duration-500">
              <h5 className="text-lg font-semibold group-hover:text-white">
                Engineering
              </h5>
              <span className="block text-slate-400 group-hover:text-white/50 text-sm mt-1">
                90 Jobs Available
              </span>
              <div className="mt-2">
                <a
                  className="text-emerald-600 dark:text-white/80 group-hover:text-white font-medium items-center inline-flex"
                  href="/job-grid-one"
                >
                  Explore Jobs
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
            </div>
            <div className="group p-4 rounded-md shadow dark:shadow-gray-700 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all duration-500">
              <h5 className="text-lg font-semibold group-hover:text-white">
                Help Center
              </h5>
              <span className="block text-slate-400 group-hover:text-white/50 text-sm mt-1">
                90 Jobs Available
              </span>
              <div className="mt-2">
                <a
                  className="text-emerald-600 dark:text-white/80 group-hover:text-white font-medium items-center inline-flex"
                  href="/job-grid-one"
                >
                  Explore Jobs
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
            </div>
            <div className="group p-4 rounded-md shadow dark:shadow-gray-700 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all duration-500">
              <h5 className="text-lg font-semibold group-hover:text-white">
                Full Stack Developer
              </h5>
              <span className="block text-slate-400 group-hover:text-white/50 text-sm mt-1">
                90 Jobs Available
              </span>
              <div className="mt-2">
                <a
                  className="text-emerald-600 dark:text-white/80 group-hover:text-white font-medium items-center inline-flex"
                  href="/job-grid-one"
                >
                  Explore Jobs
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
            </div>
          </div>
        </div> */}
      </section>

      <Footer />
    </div>
  );
}
