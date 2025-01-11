"use client";

import { HeroSection } from "@/app/components/common/HeroSection";
import Header from "@/app/components/header";
import useUserById from "@/app/hooks/users/useUserById";
import { Button } from "@/components/ui/button";
import { api_client } from "@/lib/axios";
import { APPLICATION_STATUS, EDUCTATION_LEVELS, JOB_ROLES, MAX_EDUCATION_LEVEL } from "@/lib/constant";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader, Star, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useSearchParams } from "next/navigation";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";

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

  const handleApplicantStatus = async (status: keyof typeof APPLICATION_STATUS) => {
    setIsProcessing(true);
    try {
      const response = await api_client.patch(`/jobs/${jobId}/${params.applicantId}`, {
        status
      });

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
    <div className="relative">  {/* Added relative to parent */}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.5 }}
                className="relative mt-[100px]"
              >

                {/* Cover Photo */}
                <div className="relative h-[100px] w-full rounded-t-lg bg-gradient-to-b from-emerald-100 to-white overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-transparent"></div>
                  <div className="relative z-10 flex items-center justify-end gap-2">
                    <span className="text-white text-sm bg-violet-800 px-4 py-2 m-5 mt-10 rounded-3xl">
                      আবেদন {APPLICATION_STATUS[user?.applicationStatus as keyof typeof APPLICATION_STATUS]?.label}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute right-6 top-[160px] flex gap-3 z-50">
                  <button
                    className="text-white bg-[#10b981] hover:bg-[#0ea371] px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50 relative z-50"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleApplicantStatus("ACCEPTED");
                    }}
                    disabled={isProcessing}
                  >
                    <Check className="h-4 w-4" />
                    গ্রহণ করুন
                  </button>

                  <button
                    className="text-gray-800 border border-gray-600 hover:bg-gray-600 hover:text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50 relative z-50"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleApplicantStatus("SHORT_LISTED");
                    }}
                    disabled={isProcessing}
                  >
                    <Star className="h-4 w-4" />
                    শর্টলিস্ট করুন
                  </button>

                  <button
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50 relative z-50"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleApplicantStatus("REJECTED");
                    }}
                    disabled={isProcessing}
                  >
                    <X className="h-4 w-4" />
                    বাতিল করুন
                  </button>
                </div>

                {/* Profile Content */}
                <div className="bg-white rounded-b-lg shadow-sm relative z-10">
                  {/* Profile Photo and Basic Info */}
                  <div className="relative mt-5 px-6">
                    <div className="flex items-end gap-6">
                      {user?.profilePhoto ? (
                        <Image
                          alt={user?.name as string}
                          src={`${user?.profilePhoto}`}
                          className="size-32 rounded-full border-4 border-white shadow-lg"
                          width={128}
                          height={128}
                        />
                      ) : (
                        <div className="size-32 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
                          <span className="text-4xl text-gray-400">👤</span>
                        </div>
                      )}
                      <div className="mb-8 items-center">
                        <h1 className="text-2xl font-bold">{user?.name}</h1>
                        <p className="text-gray-600">
                          {JOB_ROLES[user?.role as keyof typeof JOB_ROLES]?.label}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Sections */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">ব্যক্তিগত তথ্য</h2>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">শিক্ষাগত যোগ্যতা:</span>
                            <span>{EDUCTATION_LEVELS.find(
                              (level) => level.id === Number(user?.maxEducationLevel)
                            )?.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">অভিজ্ঞতা:</span>
                            <span>{formatEnglishToBangalNum(user?.yearsOfExperience)} বছর</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">যোগাযোগের তথ্য</h2>
                        <div className="space-y-3">
                          {user?.email && (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">ইমেইল:</span>
                              <span>{user.email}</span>
                            </div>
                          )}
                          {user?.phone && (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">ফোন:</span>
                              <span>{user.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">বিভাগ:</span>
                            <span>{user?.division}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">জেলা:</span>
                            <span>{user?.district}</span>
                          </div>
                        </div>
                      </div>

                      {/* Documents */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">নথিপত্র</h2>
                        <div className="space-y-4">
                          <div>
                            <p className="text-gray-600 mb-2">এন আইডি নং: {user?.nidNumber}</p>
                            {user?.nidCopy && (
                              <div className="mt-2">
                                <p className="text-gray-600 mb-2">এন আইডি কপি:</p>
                                <Image
                                  alt="NID Copy"
                                  src={`${user.nidCopy}`}
                                  className="rounded-lg border"
                                  width={200}
                                  height={120}
                                  objectFit="cover"
                                />
                                <a
                                  href={`${user.nidCopy}`}
                                  download
                                  className="text-blue-500 hover:underline mt-2 block"
                                >
                                  ডাউনলোড করুন
                                </a>
                              </div>
                            )}
                          </div>

                          {user?.maxEducationLevel && (
                            <div>
                              {user?.maxEducationLevelCertificateCopy && (
                                <div className="mt-2">
                                  <p className="text-gray-600 mb-2">সার্টিফিকেট কপি:</p>
                                  <Image
                                    alt="Driving License Copy"
                                    src={user.maxEducationLevelCertificateCopy}
                                    className="rounded-lg border"
                                    width={200}
                                    height={120}
                                    objectFit="cover"
                                  />
                                  <a
                                    href={`${user.maxEducationLevelCertificateCopy}`}
                                    download
                                    className="text-blue-500 hover:underline mt-2 block"
                                  >
                                    ডাউনলোড করুন
                                  </a>
                                </div>
                              )}
                            </div>
                          )}

                          {user?.drivingLicense && (
                            <div>
                              <p className="text-gray-600 mb-2">
                                ড্রাইভিং লাইসেন্স: {user.drivingLicense}
                              </p>
                              {user?.drivingLicenseCopy && (
                                <div className="mt-2">
                                  <p className="text-gray-600 mb-2">ড্রাইভিং লাইসেন্স কপি:</p>
                                  <Image
                                    alt="Driving License Copy"
                                    src={user.drivingLicenseCopy}
                                    className="rounded-lg border"
                                    width={200}
                                    height={120}
                                    objectFit="cover"
                                  />
                                  <a
                                    href={`${user.drivingLicenseCopy}`}
                                    download
                                    className="text-blue-500 hover:underline mt-2 block"
                                  >
                                    ডাউনলোড করুন
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Extra documents */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">অতিরিক্ত নথিপত্র</h2>
                        <div className="space-y-3">
                          {console.log(user) && "asdf"}
                          {user?.chairmanCertificateCopy || user?.portEntryPermitCopy ? (
                            <>
                              {user?.chairmanCertificateCopy && (
                                <div className="mt-2">
                                  <p className="text-gray-600 mb-2">চেয়ারম্যান সার্টিফিকেট কপি:</p>
                                  <Image
                                    alt="Driving License Copy"
                                    src={user.chairmanCertificateCopy}
                                    className="rounded-lg border"
                                    width={200}
                                    height={120}
                                    objectFit="cover"
                                  />
                                  <a
                                    href={`${user.chairmanCertificateCopy}`}
                                    download
                                    className="text-blue-500 hover:underline mt-2 block"
                                  >
                                    ডাউনলোড করুন
                                  </a>
                                </div>
                              )}

                              {user?.portEntryPermitCopy && (
                                <div className="mt-2">
                                  <p className="text-gray-600 mb-2">পোর্ট এন্ট্রি পারমিট কপি:</p>
                                  <Image
                                    alt="Driving License Copy"
                                    src={user.portEntryPermitCopy}
                                    className="rounded-lg border"
                                    width={200}
                                    height={120}
                                    objectFit="cover"
                                  />
                                  <a
                                    href={`${user.portEntryPermitCopy}`}
                                    download
                                    className="text-blue-500 hover:underline mt-2 block"
                                  >
                                    ডাউনলোড করুন
                                  </a>
                                </div>
                              )}
                            </>
                          ) : (
                            <span className="text-gray-600">কোনো অতিরিক্ত নথি নেই</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section >
    </div >
  );
}