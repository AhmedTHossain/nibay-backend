import Footer from "@/components/sections/Footer";
import { JOB_ITEMS } from "../assets/resources";
import { HeroSection } from "../components/common/HeroSection";
import { WhySection } from "../components/common/WhySection";
import Header from "../components/header";
import { JobFilter } from "./components/JobFilter";
import { JobGrid } from "./components/JobGrid";

export default function JobsRoute() {
  return (
    <>
      <Header />

      <HeroSection title="জব্‌স" />

      <section className="relative -mt-[42px] md:pb-24 pb-16">
        <div className="container z-1">
          <div className="md:w-5/6 mx-auto">
            <JobFilter />
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            {JOB_ITEMS.map((item) => {
              return <JobGrid key={item.id} {...item} />;
            })}
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

        <WhySection />
      </section>

      <Footer />
    </>
  );
}
