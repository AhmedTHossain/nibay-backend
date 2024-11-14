"use client";

import Feature3 from "@/app/assets/images/feature-3.jpg";
import HeroSub2 from "@/app/assets/images/hero-sub-2.jpg";
import Footer from "@/components/sections/Footer";
import {
  HowItWorks,
  howItWorksItems
} from "@/components/sections/home/how-it-works";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Briefcase, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { JOB_ITEMS } from "./assets/resources";
import Header from "./components/header";
import { JobFilter } from "./jobs/components/JobFilter";
import { JobGrid } from "./jobs/components/JobGrid";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
    // eslint-disable-next-line
  }, []);

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

      <section
        className="py-36 md:h-screen h-auto items-center flex relative overflow-hidden"
        id="home"
      >
        <div className="container relative">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
            <div className="lg:col-span-7 md:col-span-6 mt-14 md:mt-0">
              <div className="lg:me-8">
                <h4 className="lg:leading-loose leading-normal text-4xl lg:text-5xl mb-5 font-bold">
                  আপনার
                  <span className="before:block before:absolute before:-inset-2 before:-skew-y-6 before:bg-emerald-600 relative inline-block">
                    <span className="relative text-white font-bold">
                      প্রত্যাশিত
                    </span>
                  </span>{" "}
                  <br /> চাকরি খুঁজুন
                </h4>
                <p className="text-slate-400 text-lg max-w-xl">
                  চাকরি, কর্মসংস্থান এবং ক্যারিয়ারের সুযোগ খুঁজুন। আমরা বছরের
                  পর বছর ধরে চমৎকার আবেদনকারীদের নিয়োগ করতে সাহায্য করেছি এমন
                  কিছু কোম্পানি।
                </p>
                <div className="bg-white dark:bg-slate-900 border-0 shadow rounded p-3 mt-4">
                  <form action="#">
                    <div className="registration-form text-dark text-start">
                      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                        <div className="filter-search-form relative filter-border">
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

                        <div className="filter-search-form relative filter-border">
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
                          <Button className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 w-full h-full">
                            অনুসন্ধান
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 md:col-span-6">
              <div className="relative">
                <div className="relative flex justify-end">
                  <Image
                    src={Feature3}
                    className="lg:w-[400px] w-[280px] rounded-xl shadow dark:shadow-gray-700"
                    alt=""
                  />
                  <div className="absolute lg:bottom-20 -bottom-24 xl:-end-20 lg:-end-10 end-2 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-60 z-2">
                    <h5 className="text-lg font-semibold mb-3">
                      5k+ candidates get job
                    </h5>
                  </div>
                </div>
                <div className="absolute md:-start-5 start-0 -bottom-16">
                  <Image
                    src={HeroSub2}
                    className="lg:w-[280px] w-[200px] border-8 border-white dark:border-slate-900 rounded-xl"
                    alt=""
                  />
                  <div className="absolute flex justify-between items-center -top-6 md:-start-10 start-2 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-max">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 256 256"
                      className="text-[24px] text-amber-500"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M172,228a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,228ZM230.94,58.48A115.25,115.25,0,0,0,190.4,13.86a12,12,0,1,0-12.8,20.29,90.1,90.1,0,0,1,32,35.38A12,12,0,0,0,220.3,76a11.86,11.86,0,0,0,5.51-1.35A12,12,0,0,0,230.94,58.48ZM46.37,69.53a90.1,90.1,0,0,1,32-35.38A12,12,0,1,0,65.6,13.86,115.25,115.25,0,0,0,25.06,58.48a12,12,0,0,0,5.13,16.17A11.86,11.86,0,0,0,35.7,76,12,12,0,0,0,46.37,69.53Zm173.51,98.35A20,20,0,0,1,204,200H52a20,20,0,0,1-15.91-32.12c7.17-9.33,15.73-26.62,15.88-55.94A76,76,0,0,1,204,112C204.15,141.26,212.71,158.55,219.88,167.88ZM196.34,176c-8.16-13-16.19-33.57-16.34-63.94A52,52,0,1,0,76,112c-.15,30.42-8.18,51-16.34,64Z" />
                    </svg>
                    <p className="text-lg font-semibold mb-0 ms-2">
                      Job Alert Subscribe
                    </p>
                  </div>
                </div>
                {/* <div className="overflow-hidden absolute md:h-[500px] h-[400px] md:w-[500px] w-[400px] bg-gradient-to-tl to-emerald-600/5 via-emerald-600/50 from-emerald-600 bottom-1/2 translate-y-1/2 start-0 z-0 rounded-full" /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-8 py-8">
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
              জব্‌স
            </h3>
          </div>
          <div className="flex justify-end"></div>

          <div className="mt-6">
            <div className="container z-1">
              <div className="flex justify-end">
                <Link href="/">
                  <Button className="bg-emerald-600/5 border-emerald-100 border hover:bg-emerald-600 hover:border-emerald-600 font-semibold text-emerald-600 hover:text-white rounded-md ms-2">
                    Create New Job
                  </Button>
                </Link>
              </div>

              <div className="md:w-5/6 mt-10 mx-auto">
                <JobFilter />
              </div>

              <div className="mt-6">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-[30px]">
                  {JOB_ITEMS.map((item) => {
                    return <JobGrid key={item.id} {...item} />;
                  })}
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
                See More Jobs{" "}
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

      <section className="relative md:py-24 py-16">
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
              কিভাবে এটি কাজ করে?
            </h3>
            {/* <p className="text-slate-400 max-w-xl mx-auto">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30000+
              companies worldwide.
            </p> */}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-1 gap-[30px]">
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
