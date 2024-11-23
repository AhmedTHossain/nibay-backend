import Feature2 from "@/app/assets/images/feature-2.jpg";
import Feature3 from "@/app/assets/images/feature-3.jpg";
import get_job_bg from "@/app/assets/images/get-job-bg.jpg";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import { WhySection } from "../components/common/WhySection";
import Header from "../components/header";

export default function AboutRoute() {
  return (
    <>
      <Header />

      {/* <HeroSection title="About us" /> */}

      <section className="relative md:py-24 py-16">
        <div className="container md:pb-16">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
            <div className="lg:col-span-5 md:col-span-6">
              <div className="relative">
                <div className="relative">
                  <Image
                    src={Feature3}
                    className="lg:w-[400px] w-[280px] rounded-md shadow dark:shadow-gray-700"
                    alt=""
                  />
                  <div className="absolute top-0 translate-y-2/4 end-0 text-center">
                    <a
                      data-type="youtube"
                      data-id="S_CGed6E610"
                      className="lightbox  size-20 rounded-full shadow-lg dark:shadow-gray-700 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-emerald-600 dark:text-white"
                      href="/aboutus"
                    >
                      <PlayIcon />
                    </a>
                  </div>
                </div>
                <div className="absolute md:-end-5 end-0 -bottom-16">
                  <Image
                    src={Feature2}
                    className="lg:w-[280px] w-[200px] border-8 border-white dark:border-slate-900 rounded-md shadow dark:shadow-gray-700"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 md:col-span-6 mt-14 md:mt-0">
              <div className="lg:ms-5">
                <h3 className="mb-6 md:text-[26px] text-2xl md:leading-normal leading-normal font-semibold">
                  লক্ষ লক্ষ কাজ।
                  <br /> আপনার জন্য সঠিক যে একটি খুঁজুন.
                </h3>
                <p className="text-slate-400 max-w-xl">
                  ওয়েবে সব খোলা অবস্থান অনুসন্ধান করুন. আপনার নিজের পান
                  ব্যক্তিগতকৃত বেতন অনুমান। 30000+ এর উপর রিভিউ পড়ুন
                  বিশ্বব্যাপী কোম্পানি।
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
                    </svg>
                    আগামীকালের জন্য ডিজিটাল মার্কেটিং সমাধান
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
                    আমাদের প্রতিভাবান এবং অভিজ্ঞ মার্কেটিং এজেন্সি
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
                    আপনার ব্র্যান্ডের সাথে মেলে আপনার নিজের ত্বক তৈরি করুন
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
                    যোগাযোগ করুন
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WhySection />
        <div className="container md:mt-24 mt-16">
          <div className="grid grid-cols-1">
            <div className="relative overflow-hidden bg-emerald-600 rounded-md shadow dark:shadow-gray-700">
              <div className="grid md:grid-cols-2 items-center gap-[30px]">
                <div className="relative">
                  <Image src={get_job_bg} alt="" />
                  <div className="absolute md:bottom-1/2 md:translate-y-1/2 md:-end-10 ltr:md:translate-x-0 rtl:md:translate-x-0 -bottom-10 end-1/2 ltr:translate-x-1/2 rtl:-translate-x-1/2 text-center">
                    <a
                      data-id="S_CGed6E610"
                      className="lightbox  size-20 rounded-full shadow-lg dark:shadow-gray-700 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-emerald-600 dark:text-white"
                      href="/aboutus"
                    >
                      <PlayIcon />
                    </a>
                  </div>
                </div>
                <div>
                  <div className="text-white p-4">
                    <h4 className="leading-normal text-4xl mb-3 font-semibold">
                      দ্রুত আপনার স্বপ্নের কাজ পান।
                    </h4>
                    <p className="text-white/70 text-lg max-w-xl">
                      ওয়েবে সব খোলা অবস্থান অনুসন্ধান করুন. আপনার নিজের
                      ব্যক্তিগতকৃত বেতন অনুমান পান. বিশ্বব্যাপী 30000+ কোম্পানির
                      রিভিউ পড়ুন।
                    </p>
                    <ul className="list-none text-white/70 mt-4">
                      <li className="mb-1 flex items-center">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 24 24"
                          className="text-white text-xl me-2"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                          <path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z" />
                        </svg>
                        আগামীকালের জন্য ডিজিটাল মার্কেটিং সমাধান
                      </li>
                      <li className="mb-1 flex items-center">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 24 24"
                          className="text-white text-xl me-2"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                          <path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z" />
                        </svg>{" "}
                        আমাদের প্রতিভাবান এবং অভিজ্ঞ মার্কেটিং এজেন্সি
                      </li>
                      <li className="mb-1 flex items-center">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 24 24"
                          className="text-white text-xl me-2"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                          <path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z" />
                        </svg>{" "}
                        আপনার ব্র্যান্ডের সাথে মেলে আপনার নিজের ত্বক তৈরি করুন
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container md:mt-24 mt-16">
          <div className="container">
            <div className="relative grid md:grid-cols-3 grid-cols-1 items-center gap-[30px] z-1">
              <div className="counter-box text-center">
                <h1 className="lg:text-5xl text-4xl font-semibold mb-2 dark:text-white">
                  <span>১৫৫৮</span>হাজার+
                </h1>
                <h5 className="counter-head text-sm font-semibold text-slate-400 uppercase">
                  চাকরি পেয়েছেন
                </h5>
              </div>
              <div className="counter-box text-center">
                <h1 className="lg:text-5xl text-4xl font-semibold mb-2 dark:text-white">
                  <span>২৫</span>+
                </h1>
                <h5 className="counter-head text-sm font-semibold text-slate-400 uppercase">
                  শাখা
                </h5>
              </div>
              <div className="counter-box text-center">
                <h1 className="lg:text-5xl text-4xl font-semibold mb-2 dark:text-white">
                  <span>৯</span>+
                </h1>
                <h5 className="counter-head text-sm font-semibold text-slate-400 uppercase">
                  বছরের অভিজ্ঞতা
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="container md:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
              প্রশ্ন ও উত্তর
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              ওয়েবে সব খোলা অবস্থান অনুসন্ধান করুন. আপনার নিজের পান
              ব্যক্তিগতকৃত বেতন অনুমান। 30000+ এর উপর রিভিউ পড়ুন বিশ্বব্যাপী
              কোম্পানি।
            </p>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 text-emerald-600 me-3"
              >
                <circle cx={12} cy={12} r={10} />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1={12} y1={17} x2="12.01" y2={17} />
              </svg>
              <div className="flex-1">
                <h5 className="mb-2 text-lg font-semibold">
                  কিভাবে আমি চাকরির জন্য আবেদন করব?
                </h5>
                <p className="text-slate-400">
                  আবেদনের জন্য, প্রথমে চাকরির বিবরণ স্ক্রীনে যান চাকরির তালিকায়
                  ট্যাপ করে। তারপর, &quot;আবেদন করুন&quot; বোতামে ট্যাপ করুন এবং
                  আপনার আবেদন সম্পূর্ণ করতে সমস্ত প্রয়োজনীয় নথি আপলোড করুন।
                </p>
              </div>
            </div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 text-emerald-600 me-3"
              >
                <circle cx={12} cy={12} r={10} />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1={12} y1={17} x2="12.01" y2={17} />
              </svg>
              <div className="flex-1">
                <h5 className="mb-2 text-lg font-semibold">
                  বিভিন্ন আবেদন স্ট্যাটাসের অর্থ কী?
                  <span className="text-emerald-600" />{" "}
                </h5>
                <p className="text-slate-400">
                  আমি কি চাকরির আপডেটের জন্য কোম্পানিগুলোকে অনুসরণ করতে পারি?
                  আমি কিভাবে আমার প্রোফাইল রেটিং এবং নিয়োগকর্তাদের মন্তব্য
                  দেখতে পারি যদি আমাকে অ্যাপটি ব্যবহার করতে সাহায্য প্রয়োজন
                  হয়, তাহলে আমি কি করব?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
