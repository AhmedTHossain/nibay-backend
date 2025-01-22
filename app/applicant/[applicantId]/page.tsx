"use client";

import { HeroSection } from "@/app/components/common/HeroSection";
import Header from "@/app/components/header";
import useUserById from "@/app/hooks/users/useUserById";
import { Button } from "@/components/ui/button";
import { api_client } from "@/lib/axios";
import {
  APPLICATION_STATUS,
  EDUCTATION_LEVELS,
  JOB_ROLES,
  MAX_EDUCATION_LEVEL
} from "@/lib/constant";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader, Star, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { toast } from "sonner";

import { useSearchParams } from "next/navigation";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";
import { ImagePreview } from "@/app/components/common/ImagePreview";
import useReviewsByApplicantId from "@/app/hooks/reviews/useReviewsByApplicantId";
import Reviews from "./Reviews";
import ApplicantDetailsView from "@/components/applicant-details-view";

export default function ApplicantProfileRoute({
  params
}: {
  params: { applicantId: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId") as string;
  const { user, isLoading } = useUserById({ userId: params.applicantId });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplicantStatus = async (
    status: keyof typeof APPLICATION_STATUS
  ) => {
    setIsProcessing(true);
    try {
      const response = await api_client.patch(
        `/jobs/${jobId}/${params.applicantId}`,
        {
          status
        }
      );

      if (response.data.status === "success") {
        toast.success(response.data.message);
        router.push(`/jobs/${jobId}/applicant-list`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative">
      {" "}
      {/* Added relative to parent */}
      <Header />
      <HeroSection title="Applicants" />
      <section className="relative lg:mt-12 mt-[74px] mb-10">
        <div className="lg:container container-fluid">
          {isLoading ? (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center min-h-[400px]"
              >
                <Loader size={22} className="animate-spin" />
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and a vertical offset
                animate={{ opacity: 1, y: 0 }} // Fade in and reset vertical position
                transition={{
                  delay: 0.05,
                  duration: 0.5,
                  ease: "easeOut" // Smooth easing
                }}
                className="relative mt-[50px] dark:text-white p-6 rounded-lg"
              >
                {/* Cover Photo */}
                <div className="relative h-[100px] w-full rounded-t-lg bg-gradient-to-b from-emerald-100 to-white dark:from-emerald-700/50 dark:to-dark/10 overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-transparent dark:from-black/10"></div>
                  <div className="relative z-10 flex items-center justify-end gap-2">
                    <span className="text-white text-sm bg-violet-800 px-4 py-2 m-5 mt-10 rounded-3xl dark:bg-violet-700">
                      আবেদন{" "}
                      {
                        APPLICATION_STATUS[
                          user?.applicationStatus as keyof typeof APPLICATION_STATUS
                        ]?.label
                      }
                    </span>
                  </div>
                </div>

                {/* Applicant Details */}
                {user && <ApplicantDetailsView applicant={user} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
