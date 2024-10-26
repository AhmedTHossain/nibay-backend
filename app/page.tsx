import {
  Briefcase,
  BriefcaseBusinessIcon,
  HeartIcon,
  MapPin,
  MapPinIcon,
  PlayIcon
} from "lucide-react";
import Header from "./components/header";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import HeroImage from "@/app/assets/Illustrations/hero.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Feature1 from "@/app/assets/images/feature-1.jpg";
import Feature2 from "@/app/assets/images/feature-2.jpg";
import Feature3 from "@/app/assets/images/feature-3.jpg";
import FacebookIcon from "@/app/assets/Icons/facebook.svg";
import GoogleIcon from "@/app/assets/Icons/google.svg";
import BookmarkIcon from "@/app/assets/Icons/bookmark.svg";
import Blog1 from "@/app/assets/images/blog-1.jpg";
import Blog2 from "@/app/assets/images/blog-2.jpg";
import Blog3 from "@/app/assets/images/blog-3.jpg";
import AppLogo from "@/app/assets/logo.png";

export default function Home() {
  return (
    <div>
      <Header />

      <section className="relative py-36 table w-full bg-gradient-to-b from-emerald-600/20 dark:from-emerald-600/40 via-emerald-600/10 dark:via-emerald-600/20 to-transparent">
        <div className="container">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center mt-10 gap-[30px]">
            <div className="md:order-1 order-2">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-800 md:p-8 p-6 lg:me-10 relative">
                <h4 className="mb-3 text-3xl font-semibold">
                  Find Your Expected Job
                </h4>
                <p className="text-slate-400 text-sm">
                  Find Jobs, Employment &amp; Career Opportunities. Some of the
                  companies we&apos;ve helped recruit excellent applicants over
                  the years.
                </p>
                <form className="mt-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="form-label font-medium block">
                        Search
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
                          placeholder="Search your Keywords"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label font-medium block">
                        Location
                      </label>
                      <div className="relative mt-2 flex items-center px-4 py-2 bg-gray-50 dark:bg-slate-800">
                        <span className="">
                          <MapPin size={18} color="#10b981" />
                        </span>
                        <Select>
                          <SelectTrigger className="w-full bg-transparent dark:bg-transparent border-0 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Choose</SelectLabel>
                              <SelectItem value="dhaka">Dhaka</SelectItem>
                              <SelectItem value="chattogram">
                                Chattogram
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="form-label font-medium block">
                        Job Type
                      </label>
                      <div className="relative mt-2 flex items-center px-4 py-2 bg-gray-50 dark:bg-slate-800">
                        <span className="">
                          <BriefcaseBusinessIcon size={18} color="#10b981" />
                        </span>
                        <Select>
                          <SelectTrigger className="w-full bg-transparent dark:bg-transparent border-0 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Choose</SelectLabel>
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
                        Search
                      </Button>
                    </div>
                  </div>

                  {/* <div className="grid grid-cols-1">
                    <div className="mb-4">
                      <label className="form-label font-medium">Search :</label>
                      <div className="filter-search-form relative mt-2">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 24 24"
                          className="icons"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm-5-2v2H9V4h6zM4 8h16v4h-3v-2h-2v2H9v-2H7v2H4V8zm0 11v-5h3v2h2v-2h6v2h2v-2h3.001v5H4z" />
                        </svg>
                        <input
                          name="name"
                          type="text"
                          id="job-keyword"
                          className="form-input filter-input-box bg-gray-50 dark:bg-slate-800"
                          placeholder="Search your Keywords"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label font-medium">
                        Location :
                      </label>
                      <div className="filter-search-form relative mt-2">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 256 256"
                          className="icons"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
                        </svg>
                        <div className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0 css-b62m3t-container">
                          <span
                            id="react-select-2-live-region"
                            className="css-7pg0cj-a11yText"
                          />
                          <span
                            aria-live="polite"
                            aria-atomic="false"
                            aria-relevant="additions text"
                            className="css-7pg0cj-a11yText"
                          />
                          <div className=" css-13cymwt-control">
                            <div className=" css-hlgwow">
                              <div
                                className=" css-1jqq78o-placeholder"
                                id="react-select-2-placeholder"
                              >
                                Select...
                              </div>
                              <div className=" css-19bb58m" data-value="">
                                <input
                                  className=""
                                  autoCapitalize="none"
                                  autoComplete="off"
                                  autoCorrect="off"
                                  id="react-select-2-input"
                                  spellCheck="false"
                                  tabIndex={0}
                                  type="text"
                                  aria-autocomplete="list"
                                  aria-expanded="false"
                                  aria-haspopup="true"
                                  role="combobox"
                                  aria-describedby="react-select-2-placeholder"
                                  defaultValue=""
                                  style={{
                                    color: "inherit",
                                    background: "0px center",
                                    opacity: 1,
                                    width: "100%",
                                    gridArea: "1 / 2",
                                    font: "inherit",
                                    minWidth: 2,
                                    border: 0,
                                    margin: 0,
                                    outline: 0,
                                    padding: 0
                                  }}
                                />
                              </div>
                            </div>
                            <div className=" css-1wy0on6">
                              <span className=" css-1u9des2-indicatorSeparator" />
                              <div
                                className=" css-1xc3v61-indicatorContainer"
                                aria-hidden="true"
                              >
                                <svg
                                  height={20}
                                  width={20}
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                  focusable="false"
                                  className="css-8mmkcg"
                                >
                                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label font-medium">
                        Job Type :
                      </label>
                      <div className="filter-search-form relative mt-2">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 24 24"
                          className="icons"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm-5-2v2H9V4h6zM4 8h16v4h-3v-2h-2v2H9v-2H7v2H4V8zm0 11v-5h3v2h2v-2h6v2h2v-2h3.001v5H4z" />
                        </svg>
                        <div className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0 css-b62m3t-container">
                          <span
                            id="react-select-3-live-region"
                            className="css-7pg0cj-a11yText"
                          />
                          <span
                            aria-live="polite"
                            aria-atomic="false"
                            aria-relevant="additions text"
                            className="css-7pg0cj-a11yText"
                          />
                          <div className=" css-13cymwt-control">
                            <div className=" css-hlgwow">
                              <div
                                className=" css-1jqq78o-placeholder"
                                id="react-select-3-placeholder"
                              >
                                Select...
                              </div>
                              <div className=" css-19bb58m" data-value="">
                                <input
                                  className=""
                                  autoCapitalize="none"
                                  autoComplete="off"
                                  autoCorrect="off"
                                  id="react-select-3-input"
                                  spellCheck="false"
                                  tabIndex={0}
                                  type="text"
                                  aria-autocomplete="list"
                                  aria-expanded="false"
                                  aria-haspopup="true"
                                  role="combobox"
                                  aria-describedby="react-select-3-placeholder"
                                  defaultValue=""
                                  style={{
                                    color: "inherit",
                                    background: "0px center",
                                    opacity: 1,
                                    width: "100%",
                                    gridArea: "1 / 2",
                                    font: "inherit",
                                    minWidth: 2,
                                    border: 0,
                                    margin: 0,
                                    outline: 0,
                                    padding: 0
                                  }}
                                />
                              </div>
                            </div>
                            <div className=" css-1wy0on6">
                              <span className=" css-1u9des2-indicatorSeparator" />
                              <div
                                className=" css-1xc3v61-indicatorContainer"
                                aria-hidden="true"
                              >
                                <svg
                                  height={20}
                                  width={20}
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                  focusable="false"
                                  className="css-8mmkcg"
                                >
                                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <input
                        type="submit"
                        id="search"
                        name="search"
                        className="btn bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white searchbtn submit-btn rounded-md"
                        defaultValue="Search"
                      />
                    </div>
                  </div> */}
                </form>
              </div>
            </div>
            <div className="md:order-2 order-1">
              <Image src={HeroImage} alt="Hero image" />
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

        <div className="container md:mt-24 mt-16">
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
          <div className="grid grid-cols-1 mt-8 gap-[30px]">
            <div className="group relative overflow-hidden md:flex justify-between items-center rounded shadow hover:shadow-md dark:shadow-gray-700 transition-all duration-500 p-5">
              <div className="flex items-center">
                <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                  <Image src={FacebookIcon} alt="facebook icon" />
                </div>
                <a
                  className="text-lg hover:text-emerald-600 font-semibold transition-all duration-500 ms-3 min-w-[180px]"
                  href="/job-detail-one/1"
                >
                  Facebook
                </a>
              </div>
              <div className="md:block flex justify-between md:mt-0 mt-4">
                <span className="block">
                  <span className="bg-emerald-600/10 inline-block text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full">
                    Full Time
                  </span>
                </span>
                <span className="flex items-center text-slate-400 text-sm md:mt-1 mt-0">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 1024 1024"
                    className="me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                    <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" />
                  </svg>{" "}
                  20th Feb 2023
                </span>
              </div>
              <div className="md:block flex justify-between md:mt-0 mt-2">
                <span className="text-slate-400 flex items-center">
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
                  Australia
                </span>
                <span className="block font-semibold md:mt-1 mt-0">
                  $4,000 - $4,500
                </span>
              </div>
              <div className="md:mt-0 mt-4 flex items-center gap-2">
                <span className="btn btn-icon rounded-full bg-emerald-600/5 hover:bg-emerald-50 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 hover:text-white md:relative absolute top-0 end-0 md:m-0 m-3 w-10 h-10 flex items-center justify-center">
                  <Image
                    src={BookmarkIcon}
                    alt="bookmark icon"
                    width={12}
                    height={12}
                    className="text-emerald-600"
                  />
                </span>
                <Button className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-8 gap-[30px]">
            <div className="group relative overflow-hidden md:flex justify-between items-center rounded shadow hover:shadow-md dark:shadow-gray-700 transition-all duration-500 p-5">
              <div className="flex items-center">
                <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                  <Image src={GoogleIcon} alt="google icon" />
                </div>
                <a
                  className="text-lg hover:text-emerald-600 font-semibold transition-all duration-500 ms-3 min-w-[180px]"
                  href="/job-detail-one/2"
                >
                  Google
                </a>
              </div>
              <div className="md:block flex justify-between md:mt-0 mt-4">
                <span className="block">
                  <span className="bg-emerald-600/10 inline-block text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full">
                    Part Time
                  </span>
                </span>
                <span className="flex items-center text-slate-400 text-sm md:mt-1 mt-0">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 1024 1024"
                    className="me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                    <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" />
                  </svg>{" "}
                  20th Feb 2023
                </span>
              </div>
              <div className="md:block flex justify-between md:mt-0 mt-2">
                <span className="text-slate-400 flex items-center">
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
                  USA
                </span>
                <span className="block font-semibold md:mt-1 mt-0">
                  $4,000 - $4,500
                </span>
              </div>
              <div className="md:mt-0 mt-4 flex items-center gap-2">
                <span className="btn btn-icon rounded-full bg-emerald-600/5 hover:bg-emerald-50 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 hover:text-white md:relative absolute top-0 end-0 md:m-0 m-3 w-10 h-10 flex items-center justify-center">
                  <Image
                    src={BookmarkIcon}
                    alt="bookmark icon"
                    width={12}
                    height={12}
                    className="text-emerald-600"
                  />
                </span>
                <Button className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white">
                  Apply Now
                </Button>
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

      <footer className="relative bg-slate-900 dark:bg-slate-800">
        <div className="container">
          <div className="grid grid-cols-1">
            <div className="relative py-12">
              <div className="relative w-full">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                  <div className="md:col-span-3">
                    <a
                      className="flex justify-center md:justify-start focus:outline-none"
                      href="/index-three"
                    >
                      <Image src={AppLogo} alt="App logo" />
                    </a>
                  </div>
                  <div className="md:col-span-9">
                    <ul className="list-disc footer-list md:text-left text-center space-x-3">
                      <li className="inline-block">
                        <a
                          className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out font-medium me-4"
                          href="/index"
                        >
                          Home
                        </a>
                      </li>
                      <li className="inline-block mt-[10px] md:mt-0">
                        <a
                          className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out font-medium me-4"
                          href="/services"
                        >
                          How it works
                        </a>
                      </li>
                      <li className="inline-block mt-[10px] md:mt-0">
                        <a
                          className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out font-medium me-4"
                          href="/index-three"
                        >
                          Create a job
                        </a>
                      </li>
                      <li className="inline-block mt-[10px] md:mt-0">
                        <a
                          className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out font-medium me-4"
                          href="/aboutus"
                        >
                          About us
                        </a>
                      </li>
                      <li className="inline-block mt-[10px] md:mt-0">
                        <a
                          className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out font-medium"
                          href="/contact"
                        >
                          Contact us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[30px] px-0 border-t border-gray-800 dark:border-gray-700">
          <div className="container text-center">
            <div className="flex items-center justify-between">
              <div className="md:text-left text-center">
                <p className="text-gray-300 font-medium flex space-x-1">
                  <span>©2024 Jobstack. Design &amp; Develop with</span>
                  <span>
                    <HeartIcon fill="red" strokeWidth={0} size={18} />
                  </span>
                  <span>by</span>
                  <a
                    className="text-reset"
                    href="https://shreethemes.in/"
                    target="_blank"
                  >
                    Shreethemes
                  </a>
                </p>
              </div>
              <ul className="list-none md:text-right text-center flex space-x-3">
                <li className="inline">
                  <a
                    className="text-white"
                    href="https://1.envato.market/shreethemes-portfolio"
                    target="_blank"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 1024 1024"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z" />
                    </svg>
                  </a>
                </li>
                <li className="inline">
                  <a
                    className="text-white"
                    href="https://dribbble.com/shreethemes"
                    target="_blank"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.66 6.98a9.932 9.932 0 0 0-3.641-3.64C15.486 2.447 13.813 2 12 2s-3.486.447-5.02 1.34c-1.533.893-2.747 2.107-3.64 3.64S2 10.187 2 12s.446 3.487 1.34 5.02a9.924 9.924 0 0 0 3.641 3.64C8.514 21.553 10.187 22 12 22s3.486-.447 5.02-1.34a9.932 9.932 0 0 0 3.641-3.64C21.554 15.487 22 13.813 22 12s-.446-3.487-1.34-5.02zM12 3.66c2 0 3.772.64 5.32 1.919-.92 1.174-2.286 2.14-4.1 2.9-1.002-1.813-2.088-3.327-3.261-4.54A7.715 7.715 0 0 1 12 3.66zM5.51 6.8a8.116 8.116 0 0 1 2.711-2.22c1.212 1.201 2.325 2.7 3.34 4.5-2 .6-4.114.9-6.341.9-.573 0-1.006-.013-1.3-.04A8.549 8.549 0 0 1 5.51 6.8zM3.66 12c0-.054.003-.12.01-.2.007-.08.01-.146.01-.2.254.014.641.02 1.161.02 2.666 0 5.146-.367 7.439-1.1.187.373.381.793.58 1.26-1.32.293-2.674 1.006-4.061 2.14S6.4 16.247 5.76 17.5c-1.4-1.587-2.1-3.42-2.1-5.5zM12 20.34c-1.894 0-3.594-.587-5.101-1.759.601-1.187 1.524-2.322 2.771-3.401 1.246-1.08 2.483-1.753 3.71-2.02a29.441 29.441 0 0 1 1.56 6.62 8.166 8.166 0 0 1-2.94.56zm7.08-3.96a8.351 8.351 0 0 1-2.58 2.621c-.24-2.08-.7-4.107-1.379-6.081.932-.066 1.765-.1 2.5-.1.799 0 1.686.034 2.659.1a8.098 8.098 0 0 1-1.2 3.46zm-1.24-5c-1.16 0-2.233.047-3.22.14a27.053 27.053 0 0 0-.68-1.62c2.066-.906 3.532-2.006 4.399-3.3 1.2 1.414 1.854 3.027 1.96 4.84-.812-.04-1.632-.06-2.459-.06z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
