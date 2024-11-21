import { HeroSection } from "@/app/components/common/HeroSection";
import Header from "@/app/components/header";

export default function ApplicantProfileRoute() {
  return (
    <>
      <Header />
      <HeroSection title="Applicants" />
      <section className="relative lg:mt-24 mt-[74px]">
        <div className="lg:container container-fluid">
          {/* <div className="relative shrink-0">
            <Image
              src="/static/media/bg5.634b5f6c21dce4640652.jpg"
              className="h-64 w-full object-cover lg:rounded-xl shadow dark:shadow-gray-700"
              alt=""
            />
          </div> */}
          <div className="md:flex ms-4 -mt-12">
            <div className="md:w-full">
              <div className="relative flex items-end justify-between">
                <div className="relative flex items-end">
                  {/* <img
                    src="/static/media/01.6ac85de7298319b1f8d5.jpg"
                    className="size-28 rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                    alt=""
                  /> */}
                  <div className="ms-4">
                    <h5 className="text-lg font-semibold">Steven Townsend</h5>
                    <p className="text-slate-400">Web Designer</p>
                  </div>
                </div>
                <div className="">
                  <a
                    className="btn btn-icon rounded-full bg-emerald-600/5 hover:bg-emerald-600 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 hover:text-white flex justify-center items-center"
                    href="/candidate-profile-setting"
                  >
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
                      className="size-4"
                    >
                      <circle cx={12} cy={12} r={3} />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
