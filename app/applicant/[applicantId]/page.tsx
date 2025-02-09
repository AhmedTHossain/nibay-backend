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
import {
  Briefcase,
  Check,
  Edit,
  List,
  Loader,
  Mail,
  MapIcon,
  MapPin,
  MapPinCheck,
  Phone,
  Star,
  TimerOff,
  Trash,
  X
} from "lucide-react";
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
import Footer from "@/components/sections/Footer";
import { Link } from "@radix-ui/react-navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DocumentCard from "@/components/document-card";
import ApplicantReviews from "./Reviews";

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
        window.location.reload();
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
      <section className="relative md:py-16 py-16">
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
            <>
              {user?.isDeleted ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="flex items-center justify-center flex-col space-y-4">
                    <Trash size={64} />
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                      আবেদনকারী মুছে ফেলা হয়েছে
                    </h2>
                    <p className="text-base text-slate-500 dark:text-slate-400">
                      এই আবেদনকারীর তথ্য মুছে ফেলা হয়েছে
                    </p>
                  </div>
                </div>
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
                  >
                    {/* Cover Photo */}
                    {/* <div className="relative h-[100px] w-full rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent dark:from-black/10"></div>
                  <div className="relative z-10 flex items-center justify-end p-5">
                    <span className="text-white text-sm bg-violet-800 px-4 py-2 rounded-3xl dark:bg-violet-700">
                      আবেদন{" "}
                      {
                        APPLICATION_STATUS[
                          user?.applicationStatus as keyof typeof APPLICATION_STATUS
                        ]?.label
                      }
                    </span>
                  </div>
                </div> */}

                    {/* Applicant Details */}
                    {/* {user && <ApplicantDetailsView applicant={user} />} */}

                    <div className="container">
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                            <div className="lg:col-span-4 md:col-span-6">
                              <div className="shadow dark:shadow-gray-700 rounded-md bg-white dark:bg-slate-900 sticky top-24">
                                {user && (
                                  <div className="flex items-center space-x-4 mb-4 pt-4 mx-5">
                                    <Avatar className="h-20 w-20">
                                      <AvatarImage
                                        src={user?.profilePhoto}
                                        alt="user?"
                                        className="object-cover"
                                      />
                                      <AvatarFallback className="text-3xl">
                                        {user?.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h2 className="text-2xl font-semibold">
                                        {user?.name}
                                      </h2>
                                      <p className="text-gray-500">
                                        {JOB_ROLES[Number(user?.role)].label}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                <div className="p-5">
                                  <h5 className="flex items-center justify-between text-lg font-semibold">
                                    আবেদনকারীর তথ্য
                                  </h5>
                                </div>
                                <div className="p-6 border-t border-slate-100 dark:border-t-gray-700">
                                  <ul className="list-none">
                                    {user?.phone && (
                                      <li className="flex items-center mt-3">
                                        <Phone className="mr-2" />
                                        <div className="ms-4">
                                          <p className="font-medium">
                                            ফোন নাম্বার{" "}
                                          </p>
                                          <span className="text-emerald-600 font-medium text-sm">
                                            {formatEnglishToBangalNum(
                                              user?.phone
                                            )}
                                          </span>
                                        </div>
                                      </li>
                                    )}
                                    {user?.email && (
                                      <li className="flex items-center mt-3">
                                        <Mail className="mr-2" />
                                        <div className="ms-4">
                                          <p className="font-medium">ইমেইল </p>
                                          <span className="text-emerald-600 font-medium text-sm">
                                            {user?.email}
                                          </span>
                                        </div>
                                      </li>
                                    )}
                                    {user?.division && (
                                      <li className="flex items-center mt-3">
                                        <MapPin className="mr-2" />
                                        <div className="ms-4">
                                          <p className="font-medium">বিভাগ </p>
                                          <span className="text-emerald-600 font-medium text-sm">
                                            {user?.division}
                                          </span>
                                        </div>
                                      </li>
                                    )}
                                    {user?.district && (
                                      <li className="flex items-center mt-3">
                                        <MapIcon className="mr-2" />
                                        <div className="ms-4">
                                          <p className="font-medium">জেলা </p>
                                          <span className="text-emerald-600 font-medium text-sm">
                                            {user?.district}
                                          </span>
                                        </div>
                                      </li>
                                    )}
                                    {user?.yearsOfExperience && (
                                      <li className="flex items-center mt-3">
                                        <Briefcase className="mr-2" />
                                        <div className="ms-4">
                                          <p className="font-medium">
                                            অভিজ্ঞতা{" "}
                                          </p>
                                          <span className="text-emerald-600 font-medium text-sm">
                                            {formatEnglishToBangalNum(
                                              user?.yearsOfExperience
                                            )}{" "}
                                            বছর
                                          </span>
                                        </div>
                                      </li>
                                    )}
                                    {user?.maxEducationLevel && (
                                      <li className="flex items-center mt-3">
                                        <MapPinCheck className="mr-2" />
                                        <div className="ms-4">
                                          <p className="font-medium">
                                            শিক্ষাগত যোগ্যতা{" "}
                                          </p>
                                          <span className="text-emerald-600 font-medium text-sm">
                                            {
                                              EDUCTATION_LEVELS[
                                                Number(user?.maxEducationLevel)
                                              ].label
                                            }
                                          </span>
                                        </div>
                                      </li>
                                    )}

                                    <li className="mt-10 flex items-center gap-4 justify-between">
                                      <Button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleApplicantStatus("ACCEPTED");
                                        }}
                                        disabled={isProcessing}
                                        className="rounded-md bg-emerald-600/5 hover:bg-emerald-500 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 duration-200 transition-all hover:text-white md:relative flex items-center justify-center px-3 py-2 space-x-1 cursor-pointer text-sm font-medium"
                                      >
                                        <Check className="h-4 w-4" /> গ্রহন
                                      </Button>
                                      <Button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleApplicantStatus("SHORT_LISTED");
                                        }}
                                        disabled={isProcessing}
                                        className="rounded-md bg-yellow-600/5 hover:bg-yellow-500 border-yellow-600/10 hover:border-yellow-600 text-yellow-600 duration-200 transition-all hover:text-white md:relative flex items-center justify-center px-3 py-2 space-x-1 cursor-pointer text-sm font-medium"
                                      >
                                        <List className="h-4 w-4" /> শর্টলিস্ট
                                      </Button>
                                      <Button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleApplicantStatus("REJECTED");
                                        }}
                                        disabled={isProcessing}
                                        className="rounded-md bg-red-600/5 hover:bg-red-500 border-red-600/10 hover:border-red-600 text-red-600 duration-200 transition-all hover:text-white md:relative flex items-center justify-center px-3 py-2 space-x-1 cursor-pointer text-sm font-medium"
                                      >
                                        <X className="h-4 w-4" /> বাতিল
                                      </Button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="lg:col-span-8 md:col-span-6">
                              {user && (
                                <>
                                  <div className="flex items-start justify-end">
                                    {user && (
                                      <span className="text-white text-sm bg-violet-800 px-4 py-2 rounded-3xl dark:bg-violet-700">
                                        আবেদন{" "}
                                        {
                                          APPLICATION_STATUS[
                                            user?.applicationStatus as keyof typeof APPLICATION_STATUS
                                          ]?.label
                                        }
                                      </span>
                                    )}
                                  </div>
                                  <h5 className="mt-12 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    প্রয়োজনীয় নথিপত্র
                                  </h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <DocumentCard
                                      key="DOC001"
                                      document={{
                                        name: "জাতীয় পরিচয়পত্র",
                                        status: user?.nidCopy
                                          ? "verified"
                                          : "not_uploaded",
                                        thumbnail: user?.nidCopy
                                      }}
                                    />
                                    <DocumentCard
                                      key="DOC001"
                                      document={{
                                        name: "সার্টিফিকেট",
                                        status:
                                          user?.maxEducationLevelCertificateCopy
                                            ? "verified"
                                            : "not_uploaded",
                                        thumbnail:
                                          user?.maxEducationLevelCertificateCopy
                                      }}
                                    />
                                    <DocumentCard
                                      key="DOC001"
                                      document={{
                                        name: "ড্রাইভিং লাইসেন্স",
                                        status: user?.drivingLicenseCopy
                                          ? "verified"
                                          : "not_uploaded",
                                        thumbnail: user?.drivingLicenseCopy
                                      }}
                                    />
                                  </div>

                                  {user?.role === "9" && (
                                    <>
                                      <h5 className="mt-12 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        অতিরিক্ত নথিপত্র
                                      </h5>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <DocumentCard
                                          key="DOC001"
                                          document={{
                                            name: "চেয়ারম্যান সার্টিফিকেট",
                                            status:
                                              user?.chairmanCertificateCopy
                                                ? "verified"
                                                : "not_uploaded",
                                            thumbnail:
                                              user?.chairmanCertificateCopy
                                          }}
                                        />
                                        <DocumentCard
                                          key="DOC001"
                                          document={{
                                            name: "পোর্ট এন্ট্রি পারমিট",
                                            status: user?.portEntryPermitCopy
                                              ? "verified"
                                              : "not_uploaded",
                                            thumbnail: user?.portEntryPermitCopy
                                          }}
                                        />
                                      </div>
                                    </>
                                  )}
                                  <ApplicantReviews applicantId={user._id} />
                                </>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
