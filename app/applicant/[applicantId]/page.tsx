"use client";

import { HeroSection } from "@/app/components/common/HeroSection";
import Header from "@/app/components/header";
import useUserById from "@/app/hooks/users/useUserById";
import { Button } from "@/components/ui/button";
import { api_client } from "@/lib/axios";
import {
  EDUCTATION_LEVELS,
  MAX_EDUCATION_LEVEL,
  USER_ROLE
} from "@/lib/constant";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import Image from "next/image";

export default function ApplicantProfileRoute({
  params
}: {
  params: { applicantId: string };
}) {
  const { user, isLoading } = useUserById({ userId: params.applicantId });

  return (
    <>
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
                style={{
                  marginTop: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
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
              >
                <div className="md:flex">
                  <div className="md:w-full">
                    <div className="relative flex items-start justify-between">
                      <div className="relative flex items-end">
                        {user?.profilePhoto && (
                          <Image
                            alt={user?.name as string}
                            src={user?.profilePhoto as string}
                            className="size-28 rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                            width={100}
                            height={100}
                          />
                        )}
                        <div className="ms-4 space-y-2">
                          <h5 className="text-lg font-semibold">
                            নাম: {user?.name}
                          </h5>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-800 text-sm">
                              শিক্ষাগত যোগ্যতা:
                            </span>
                            <span className="text-sm font-semibold">
                              {
                                EDUCTATION_LEVELS.find(
                                  (item) =>
                                    item.value ===
                                    MAX_EDUCATION_LEVEL[
                                      Number(
                                        user?.maxEducationLevel
                                      ) as keyof typeof MAX_EDUCATION_LEVEL
                                    ]
                                )?.label
                              }
                            </span>
                          </div>

                          {user?.email && (
                            <p className="text-slate-800">
                              ইমেইল: {user?.email}
                            </p>
                          )}

                          {user?.phone && (
                            <p className="text-slate-800">ফোন: {user?.phone}</p>
                          )}
                          <p className="text-slate-800">
                            এন আইডি নং: {user?.nidNumber}
                          </p>
                          <p className="text-slate-800">
                            এন আইডি কপি:
                            <Image
                              alt="user image"
                              src={user?.nidCopy as string}
                              className="rounded-md w-40 h-40"
                              width={60}
                              height={60}
                            />
                          </p>
                          <p className="text-slate-800">
                            বিভাগ: {user?.division}
                          </p>
                          <p className="text-slate-800">
                            জেলা: {user?.district}
                          </p>
                          <p className="text-slate-800">
                            ড্রাইভিং লাইসেন্স: {user?.drivingLicense}
                          </p>
                          <p className="text-slate-800">
                            ড্রাইভিং লাইসেন্স কপি:{" "}
                            <Image
                              alt="user image"
                              src={user?.drivingLicenseCopy as string}
                              className="rounded-md w-40 h-40"
                              width={60}
                              height={60}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  );
}
