import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

export function Hero() {
  return (
    <Carousel className="w-full" opts={{ loop: true }}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className=" relative overflow-hidden md:py-32 py-16 rounded-3xl shadow dark:shadow-gray-700 m-3 bg-[url('./assets/images/bg-feature-job.jpg')] bg-top bg-no-repeat bg-cover">
              <div className="absolute inset-0 bg-slate-950/70" />
              <div className="container relative">
                <div className="md:flex">
                  <div className="lg:w-2/3 md:w-1/2">
                    <h4 className="text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 font-bold">
                      Find &amp; Hire Experts <br /> for any Job
                    </h4>
                    <p className="text-white/70 text-lg max-w-xl">
                      Find Jobs, Employment &amp; Career Opportunities. Some of
                      the companies we&apos;ve helped recruit excellent
                      applicants over the years.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

// <section className="py-20 w-full table relative bg-[url('./assets/images/bg-feature-job.jpg')] bg-top bg-no-repeat bg-cover">
//         <div className="absolute inset-0 bg-slate-900/70" />
