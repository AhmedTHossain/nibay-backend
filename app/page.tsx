"use client";

import FacebookIcon from "@/app/assets/Icons/facebook.svg";
import GoogleIcon from "@/app/assets/Icons/google.svg";
import Blog1 from "@/app/assets/images/blog-1.jpg";
import Blog2 from "@/app/assets/images/blog-2.jpg";
import Blog3 from "@/app/assets/images/blog-3.jpg";
import Feature1 from "@/app/assets/images/feature-1.jpg";
import Feature2 from "@/app/assets/images/feature-2.jpg";
import Feature3 from "@/app/assets/images/feature-3.jpg";
import HeroSub2 from "@/app/assets/images/hero-sub-2.jpg";
import Footer from "@/components/sections/Footer";
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
import {
  ArrowUpRight,
  Bookmark,
  Briefcase,
  BusIcon,
  MapPin,
  MapPinIcon,
  PlayIcon
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./components/header";
import Link from "next/link";

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
                    {/* <ul className="list-none relative">
                      <li className="inline-block relative">
                        <a href="/index-six">
                          <img
                            src="/static/media/01.6ac85de7298319b1f8d5.jpg"
                            className="size-10 rounded-full shadow-md dark:shadow-gray-700 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500"
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="inline-block relative -ms-3">
                        <a href="/index-six">
                          <img
                            src="/static/media/02.7df14e12e444ad660802.jpg"
                            className="size-10 rounded-full shadow-md dark:shadow-gray-700 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500"
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="inline-block relative -ms-3">
                        <a href="/index-six">
                          <img
                            src="/static/media/03.ba5f8794c055cc1488b5.jpg"
                            className="size-10 rounded-full shadow-md dark:shadow-gray-700 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500"
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="inline-block relative -ms-3">
                        <a href="/index-six">
                          <img
                            src="/static/media/04.35463172278c4051b5f4.jpg"
                            className="size-10 rounded-full shadow-md dark:shadow-gray-700 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500"
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="inline-block relative -ms-3">
                        <a href="/index-six">
                          <img
                            src="/static/media/05.a7ab2c82813cb95da9d6.jpg"
                            className="size-10 rounded-full shadow-md dark:shadow-gray-700 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500"
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="inline-block relative -ms-3">
                        <a
                          className="btn btn-icon table-cell rounded-full bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white hover:z-1 hover:scale-105  items-center justify-center"
                          href="/index-six"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 1024 1024"
                            className="mx-auto"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z" />
                            <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z" />
                          </svg>
                        </a>
                      </li>
                    </ul> */}
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

      <section className="relative md:py-12 py-8">
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
              Popular Jobs
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30000+
              companies worldwide.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            <div className="group p-6 rounded-lg border border-emerald-600/20 dark:border-emerald-600/40 bg-white dark:bg-slate-900 hover:bg-emerald-600/[0.02] hover:dark:bg-emerald-600/5 hover:shadow-md hover:shadow-emerald-600/5 transition-all duration-500">
              <div className="flex justify-between items-start">
                <div>
                  <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-full mb-2">
                    <BusIcon size={26} />
                  </div>
                  <a
                    className="text-lg hover:text-emerald-600 font-semibold transition-all duration-500"
                    href="/employer-detail/1"
                  >
                    Shohag Paribahan
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="rounded-full bg-emerald-600/5 hover:bg-emerald-500 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 hover:text-white md:relative absolute top-0 end-0 md:m-0 m-3 w-10 h-10 flex items-center justify-center">
                    <Bookmark strokeWidth={1.5} size={18} />
                  </span>
                  <span className="rounded-full bg-emerald-600/5 hover:bg-emerald-500 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 hover:text-white md:relative absolute top-0 end-0 md:m-0 m-3 w-10 h-10 flex items-center justify-center">
                    <ArrowUpRight strokeWidth={1.5} size={18} />
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <Link
                  className="text-xl hover:text-emerald-600 font-semibold transition-all duration-500"
                  href="/jobs/1"
                >
                  Shohag Paribahan (PVT) Ltd. চাকরির বিজ্ঞপ্তি
                </Link>
                <p className="text-slate-400 mt-2">
                  ঢাকা-চট্টগ্রাম রুটের জন্য ২ জন অভিজ্ঞ যাত্রীর গাইড প্রয়োজন
                </p>
                <div className="mt-3">
                  <a href="/index-seven">
                    <span className="bg-orange-500/5 hover:bg-orange-500/20 dark:bg-orange-500/10 hover:dark:bg-orange-500/30 inline-block text-orange-500 px-4 text-[14px] font-medium rounded-full mt-2 me-1 transition-all duration-500">
                      Full Time
                    </span>
                  </a>
                  <a href="/index-seven">
                    <span className="bg-purple-600/5 hover:bg-purple-600/20 dark:bg-purple-600/10 hover:dark:bg-purple-600/30 inline-block text-purple-600 px-4 text-[14px] font-medium rounded-full mt-2 me-1 transition-all duration-500">
                      $4,000 - $4,500
                    </span>
                  </a>
                  <a href="/index-seven">
                    <span className="bg-emerald-600/5 hover:bg-emerald-600/20 dark:bg-emerald-600/10 hover:dark:bg-emerald-600/30 inline-flex items-center text-emerald-600 px-4 text-[14px] font-medium rounded-full mt-2 transition-all duration-500">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 256 256"
                        className="me-1"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
                      </svg>
                      চট্টগ্রাম
                    </span>
                  </a>
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
              How it&apos;s Work?
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30000+
              companies worldwide.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-6 gap-[30px]">
            <div className="p-6 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-800 transition duration-500 rounded-2xl mt-6 text-center">
              <div className="size-14 bg-emerald-600/5 text-emerald-600 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                  <polygon points="12 15 17 21 7 21 12 15" />
                </svg>
              </div>
              <div className="content mt-7">
                <a
                  className="title h5 text-lg font-semibold hover:text-emerald-600"
                  href="/index-three"
                >
                  Create Account
                </a>
                <p className="text-slate-400 mt-3">
                  The phrasal sequence of the is now so that many campaign and
                  benefit
                </p>
                <div className="mt-5">
                  <a
                    className="btn btn-link text-emerald-600 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out inline-flex items-center"
                    href="/index-three"
                  >
                    Read More{" "}
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
            <div className="p-6 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-800 transition duration-500 rounded-2xl mt-6 text-center">
              <div className="size-14 bg-emerald-600/5 text-emerald-600 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path d="M15 1H9v2h6V1zm4.03 6.39l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0012 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 007.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-.32-5H6.35a5.992 5.992 0 003.41 3.56l-.11-.06 2.03-3.5zm5.97-4a6.012 6.012 0 00-3.34-3.54L12.26 11h5.39zm-7.04 7.83c.45.11.91.17 1.39.17 1.34 0 2.57-.45 3.57-1.19l-2.11-3.9-2.85 4.92zM7.55 8.99A5.965 5.965 0 006 13c0 .34.04.67.09 1h4.72L7.55 8.99zm8.79 8.14A5.94 5.94 0 0018 13c0-.34-.04-.67-.09-1h-4.34l2.77 5.13zm-3.01-9.98C12.9 7.06 12.46 7 12 7c-1.4 0-2.69.49-3.71 1.29l2.32 3.56 2.72-4.7z" />
                </svg>
              </div>
              <div className="content mt-7">
                <a
                  className="title h5 text-lg font-semibold hover:text-emerald-600"
                  href="/index-three"
                >
                  Complete Your Profile
                </a>
                <p className="text-slate-400 mt-3">
                  The phrasal sequence of the is now so that many campaign and
                  benefit
                </p>
                <div className="mt-5">
                  <a
                    className="btn btn-link text-emerald-600 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out inline-flex items-center"
                    href="/index-three"
                  >
                    Read More{" "}
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
            <div className="p-6 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-800 transition duration-500 rounded-2xl mt-6 text-center">
              <div className="size-14 bg-emerald-600/5 text-emerald-600 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5" />
                  <path d="M16 19h6" />
                  <path d="M19 16v6" />
                  <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                </svg>
              </div>
              <div className="content mt-7">
                <a
                  className="title h5 text-lg font-semibold hover:text-emerald-600"
                  href="/index-three"
                >
                  Apply Job or Hire
                </a>
                <p className="text-slate-400 mt-3">
                  The phrasal sequence of the is now so that many campaign and
                  benefit
                </p>
                <div className="mt-5">
                  <a
                    className="btn btn-link text-emerald-600 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out inline-flex items-center"
                    href="/index-three"
                  >
                    Read More{" "}
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
          </div>
        </div>

        <div className="container md:mt-24 mt-16">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
            <div className="lg:col-span-5 md:col-span-6">
              <div className="relative">
                <div className="grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-6">
                    <div className="grid grid-cols-1 gap-6">
                      <Image
                        src={Feature1}
                        className="shadow rounded-md"
                        alt=""
                      />
                      <Image
                        src={Feature2}
                        className="shadow rounded-md"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="grid grid-cols-1 gap-6">
                      <Image
                        src={Feature3}
                        className="shadow rounded-md"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
                  <a
                    data-type="youtube"
                    data-id="S_CGed6E610"
                    className="lightbox  size-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-emerald-600 dark:text-white"
                    href="#"
                  >
                    <PlayIcon />
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 md:col-span-6">
              <div className="lg:ms-8">
                <h3 className="mb-6 md:text-4xl text-3xl md:leading-normal leading-normal font-bold">
                  Get the job of you dreams <br /> quick &amp; easy.
                </h3>
                <p className="text-slate-400 max-w-xl">
                  Search all the open positions on the web. Get your own
                  personalized salary estimate. Read reviews on over 30000+
                  companies worldwide.
                </p>
                <ul className="list-none text-slate-400 mt-4">
                  <li className="mb-1 flex items-center">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 24 24"
                      className="text-emerald-600 text-xl me-2"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                      <path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z" />
                    </svg>{" "}
                    Digital Marketing Solutions for Tomorrow
                  </li>
                  <li className="mb-1 flex items-center">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 24 24"
                      className="text-emerald-600 text-xl me-2"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                      <path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z" />
                    </svg>{" "}
                    Our Talented &amp; Experienced Marketing Agency
                  </li>
                  <li className="mb-1 flex items-center">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 24 24"
                      className="text-emerald-600 text-xl me-2"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                      <path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z" />
                    </svg>{" "}
                    Create your own skin to match your brand
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="bg-[#10b981] hover:bg-[#10b981]">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="me-1"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={20} height={16} x={2} y={4} rx={2} />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>{" "}
                    Contact us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container md:mt-24 mt-16">
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
        </div>
      </section>

      <section className="py-20 w-full table relative bg-[url('./assets/images/bg-feature-job.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="container relative">
          <div className="grid grid-cols-1 text-center">
            <h3 className="mb-4 md:text-[26px] text-2xl text-white font-medium">
              Get the job that&apos;s right for you
            </h3>
            <p className="text-white/80 max-w-xl mx-auto">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30000+
              companies worldwide.
            </p>
            <a
              data-type="youtube"
              data-id="S_CGed6E610"
              className="lightbox  size-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-emerald-600 mx-auto mt-10"
              href="#"
            >
              <PlayIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
              Find Best Companies
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30000+
              companies worldwide.
            </p>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            <div className="group relative p-6 rounded-md shadow dark:shadow-gray-700 mt-6">
              <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md relative -mt-12">
                <Image src={FacebookIcon} alt="facebook icon" />
              </div>
              <div className="mt-4">
                <a
                  className="text-lg hover:text-emerald-600 font-semibold"
                  href="#"
                >
                  Facebook
                </a>
                <p className="text-slate-400 mt-2">
                  Digital Marketing Solutions for Tomorrow
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                <span className="text-slate-400 flex items-center">
                  <MapPinIcon />
                  Australia
                </span>
                <span className="block font-semibold text-emerald-600">
                  2 Jobs
                </span>
              </div>
            </div>
            <div className="group relative p-6 rounded-md shadow dark:shadow-gray-700 mt-6">
              <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md relative -mt-12">
                <Image src={GoogleIcon} alt="facebook icon" />
              </div>
              <div className="mt-4">
                <a
                  className="text-lg hover:text-emerald-600 font-semibold"
                  href="/employer-detail/2"
                >
                  Google
                </a>
                <p className="text-slate-400 mt-2">
                  Digital Marketing Solutions for Tomorrow
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                <span className="text-slate-400 flex items-center">
                  <MapPinIcon />
                  USA
                </span>
                <span className="block font-semibold text-emerald-600">
                  2 Jobs
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-12 grid-cols-1 mt-6">
            <div className="md:col-span-12 text-center">
              <a
                className="btn btn-link text-slate-400 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out inline-flex items-center"
                href="/index-three"
              >
                See More Companies{" "}
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

        <div className="container md:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
              Latest Blog or News
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30000+
              companies worldwide.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            <div className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700">
              <div className="relative overflow-hidden">
                <Image
                  src={Blog1}
                  className="scale-110 group-hover:scale-100 transition-all duration-500"
                  alt=""
                />
              </div>
              <div className="relative p-6">
                <div className="absolute start-6 -top-4">
                  <span className="bg-emerald-600 text-white text-[12px] px-2.5 py-1 font-semibold rounded-full h-5">
                    arts
                  </span>
                </div>
                <div className="">
                  <div className="flex mb-4">
                    <span className="text-slate-400 text-sm flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        className="text-slate-900 dark:text-white me-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                      </svg>
                      20th February, 2023
                    </span>
                    <span className="text-slate-400 text-sm ms-3 flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 1024 1024"
                        className="text-slate-900 dark:text-white me-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                        <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" />
                      </svg>
                      <i />5 min read
                    </span>
                  </div>
                  <a
                    className="title text-lg font-semibold hover:text-emerald-600 duration-500 ease-in-out"
                    href="/blog-detail/1"
                  >
                    11 Tips to Help You Get New Clients Through Cold Calling
                  </a>
                  <div className="flex justify-between items-center mt-3">
                    <a
                      className="btn btn-link hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out items-center inline-flex"
                      href="/blog-detail/1"
                    >
                      Read More{" "}
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
                    <span className="text-slate-400 text-sm">
                      by{" "}
                      <a
                        className="text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-600 font-medium"
                        href="/index-three"
                      >
                        {" "}
                        Google
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700">
              <div className="relative overflow-hidden">
                <Image
                  src={Blog2}
                  className="scale-110 group-hover:scale-100 transition-all duration-500"
                  alt=""
                />
              </div>
              <div className="relative p-6">
                <div className="absolute start-6 -top-4">
                  <span className="bg-emerald-600 text-white text-[12px] px-2.5 py-1 font-semibold rounded-full h-5">
                    Illustration
                  </span>
                </div>
                <div className="">
                  <div className="flex mb-4">
                    <span className="text-slate-400 text-sm flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        className="text-slate-900 dark:text-white me-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                      </svg>
                      20th February, 2023
                    </span>
                    <span className="text-slate-400 text-sm ms-3 flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 1024 1024"
                        className="text-slate-900 dark:text-white me-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                        <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" />
                      </svg>
                      <i />5 min read
                    </span>
                  </div>
                  <a
                    className="title text-lg font-semibold hover:text-emerald-600 duration-500 ease-in-out"
                    href="/blog-detail/2"
                  >
                    DigitalOcean launches first Canadian data centre in Toronto
                  </a>
                  <div className="flex justify-between items-center mt-3">
                    <a
                      className="btn btn-link hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out items-center inline-flex"
                      href="/blog-detail/2"
                    >
                      Read More{" "}
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
                    <span className="text-slate-400 text-sm">
                      by{" "}
                      <a
                        className="text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-600 font-medium"
                        href="/index-three"
                      >
                        {" "}
                        Facebook
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700">
              <div className="relative overflow-hidden">
                <Image
                  src={Blog3}
                  className="scale-110 group-hover:scale-100 transition-all duration-500"
                  alt=""
                />
              </div>
              <div className="relative p-6">
                <div className="absolute start-6 -top-4">
                  <span className="bg-emerald-600 text-white text-[12px] px-2.5 py-1 font-semibold rounded-full h-5">
                    Music
                  </span>
                </div>
                <div className="">
                  <div className="flex mb-4">
                    <span className="text-slate-400 text-sm flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        className="text-slate-900 dark:text-white me-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                      </svg>
                      20th February, 2023
                    </span>
                    <span className="text-slate-400 text-sm ms-3 flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 1024 1024"
                        className="text-slate-900 dark:text-white me-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                        <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" />
                      </svg>
                      <i />5 min read
                    </span>
                  </div>
                  <a
                    className="title text-lg font-semibold hover:text-emerald-600 duration-500 ease-in-out"
                    href="/blog-detail/3"
                  >
                    Using Banner Stands To Increase Trade Show Traffic
                  </a>
                  <div className="flex justify-between items-center mt-3">
                    <a
                      className="btn btn-link hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out items-center inline-flex"
                      href="/blog-detail/3"
                    >
                      Read More{" "}
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
                    <span className="text-slate-400 text-sm">
                      by{" "}
                      <a
                        className="text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-600 font-medium"
                        href="/index-three"
                      >
                        {" "}
                        Linkedin
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
