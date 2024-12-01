import Footer from "@/components/sections/Footer";
import { HeroSection } from "../components/common/HeroSection";
import { WhySection } from "../components/common/WhySection";
import Header from "../components/header";
import { JobBox } from "./components/JobBox";
import { JobFilter } from "./components/JobFilter";

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
          <JobBox />
        </div>

        <WhySection />
      </section>

      <Footer />
    </>
  );
}
