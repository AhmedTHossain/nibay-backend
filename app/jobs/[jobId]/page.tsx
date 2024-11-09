import Header from "@/app/components/header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";

export default function JobDetailsRoute() {
  return (
    <>
      <Header />
      <section
        className={`relative table w-full py-36 bg-[url('./assets/images/about-hero.jpg')] bg-top bg-no-repeat bg-cover`}
      >
        <div className="absolute inset-0 bg-emerald-900/90" />
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="md:text-3xl z-10 text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">
              Shohag Paribahan (PVT) Ltd. চাকরির বিজ্ঞপ্তি
            </h3>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-4 md:col-span-6">
              <div className="shadow dark:shadow-gray-700 rounded-md bg-white dark:bg-slate-900 sticky top-20">
                <div className="p-6">
                  <h5 className="text-lg font-semibold">Job Information</h5>
                </div>
                <div className="p-6 border-t border-slate-100 dark:border-t-gray-700">
                  <ul className="list-none">
                    <li className="flex items-center">
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
                        className="size-5"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy={7} r={4} />
                        <polyline points="17 11 19 13 23 9" />
                      </svg>
                      <div className="ms-4">
                        <p className="font-medium">Employee Type:</p>
                        <span className="text-emerald-600 font-medium text-sm">
                          Full Time
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center mt-3">
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
                        className="size-5"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx={12} cy={10} r={3} />
                      </svg>
                      <div className="ms-4">
                        <p className="font-medium">Location:</p>
                        <span className="text-emerald-600 font-medium text-sm">
                          Australia
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center mt-3">
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
                        className="size-5"
                      >
                        <rect
                          x={2}
                          y={3}
                          width={20}
                          height={14}
                          rx={2}
                          ry={2}
                        />
                        <line x1={8} y1={21} x2={16} y2={21} />
                        <line x1={12} y1={17} x2={12} y2={21} />
                      </svg>
                      <div className="ms-4">
                        <p className="font-medium">Job Type:</p>
                        <span className="text-emerald-600 font-medium text-sm">
                          Web Designer / Developer
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center mt-3">
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
                        className="size-5"
                      >
                        <rect
                          x={2}
                          y={7}
                          width={20}
                          height={14}
                          rx={2}
                          ry={2}
                        />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      <div className="ms-4">
                        <p className="font-medium">Experience:</p>
                        <span className="text-emerald-600 font-medium text-sm">
                          2+ years
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center mt-3">
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
                        className="size-5"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                      <div className="ms-4">
                        <p className="font-medium">Qualifications:</p>
                        <span className="text-emerald-600 font-medium text-sm">
                          MCA
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center mt-3">
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
                        className="size-5"
                      >
                        <line x1={12} y1={1} x2={12} y2={23} />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      <div className="ms-4">
                        <p className="font-medium">Salary:</p>
                        <span className="text-emerald-600 font-medium text-sm">
                          $4,000 - $4,500
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center mt-3">
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
                        className="size-5"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <div className="ms-4">
                        <p className="font-medium">Date posted:</p>
                        <span className="text-emerald-600 font-medium text-sm">
                          28th Feb, 2023
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 md:col-span-6">
              <h5 className="text-lg font-semibold">Job Description:</h5>
              <p className="text-slate-400 mt-4">
                One disadvantage of Lorum Ipsum is that in Latin certain letters
                appear more frequently than others - which creates a distinct
                visual impression. Moreover, in Latin only words at the
                beginning of sentences are capitalized.
              </p>
              <p className="text-slate-400 mt-4">
                This means that Lorem Ipsum cannot accurately represent, for
                example, German, in which all nouns are capitalized. Thus, Lorem
                Ipsum has only limited suitability as a visual filler for German
                texts. If the fill text is intended to illustrate the
                characteristics of different typefaces.
              </p>
              <p className="text-slate-400 mt-4">
                It sometimes makes sense to select texts containing the various
                letters and symbols specific to the output language.
              </p>
              <h5 className="text-lg font-semibold mt-6">
                Responsibilities and Duties:{" "}
              </h5>
              <p className="text-slate-400 mt-4">
                It sometimes makes sense to select texts containing the various
                letters and symbols specific to the output language.
              </p>
              <ul className="list-none">
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Participate in requirements analysis
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Write clean, scalable code using C# and .NET frameworks
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Test and deploy applications and systems
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Revise, update, refactor and debug code
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Improve existing software
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Develop documentation throughout the software development life
                  cycle (SDLC)
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Serve as an expert on applications and provide technical
                  support
                </li>
              </ul>
              <h5 className="text-lg font-semibold mt-6">
                Required Experience, Skills and Qualifications:{" "}
              </h5>
              <p className="text-slate-400 mt-4">
                It sometimes makes sense to select texts containing the various
                letters and symbols specific to the output language.
              </p>
              <ul className="list-none">
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Proven experience as a .NET Developer or Application Developer
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  good understanding of SQL and Relational Databases,
                  specifically Microsoft SQL Server.
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Experience designing, developing and creating RESTful web
                  services and APIs
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Basic know how of Agile process and practices
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Good understanding of object-oriented programming.
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Good understanding of concurrent programming.
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Sound knowledge of application architecture and design.
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-emerald-600 me-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                  Excellent problem solving and analytical skills
                </li>
              </ul>
              <div className="mt-5">
                <Button className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
