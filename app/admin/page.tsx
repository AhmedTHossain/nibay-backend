"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Loader, User, Users } from "lucide-react";
import Header from "../components/header";
import { SidebarNav } from "./components/sidebar-nav";
import { use, useEffect, useState } from "react";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";
import { api_client } from "@/lib/axios";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface DashboardPageData {
  totalJobs: string;
  totalActiveJobs: string;
  totalInstitutionJobs: string;
  totalIndividualJobs: string;
  totalEmployers: string;
  totalIndividualEmployers: string;
  totalInstitutionEmployers: string;
  totalMobileUsers: string;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardPageData | null>(
    null
  );
  const t = useTranslations("dashboard");
  const language = useTranslations("language")("code");

  useEffect(() => {
    async function fetchData() {
      const response = await api_client.get("/dashboard");
      const result = response.data;
      setDashboardData(result.data);
      console.log("Dashboard: ", dashboardData);
      console.log("Result: ", result.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Header isAdminRoute={true} />
      <div className="container grid flex-1 gap-12 pt-[100px] md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SidebarNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
            {dashboardData ? (
              <>
                <h3 className="text-xl font-semibold pt-5 tracking-tight">
                  {t("jobAds.title")}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("jobAds.total")}
                      </CardTitle>
                      <Briefcase className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatEnglishToBangalNum(
                          String(dashboardData.totalJobs),
                          language
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("jobAds.active")}
                      </CardTitle>
                      <Briefcase className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatEnglishToBangalNum(
                          String(dashboardData.totalActiveJobs),
                          language
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("jobAds.institutional")}
                      </CardTitle>
                      <Briefcase className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatEnglishToBangalNum(
                          String(dashboardData.totalInstitutionJobs),
                          language
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("jobAds.individual")}
                      </CardTitle>
                      <Briefcase className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatEnglishToBangalNum(
                          String(dashboardData.totalIndividualJobs),
                          language
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-xl font-semibold pt-5 tracking-tight">
                  {t("employers.title")}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("employers.total")}
                      </CardTitle>
                      <Users className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatEnglishToBangalNum(
                          String(dashboardData.totalEmployers),
                          language
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("employers.institutional")}
                      </CardTitle>
                      <Users className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatEnglishToBangalNum(
                          String(dashboardData.totalInstitutionEmployers),
                          language
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("employers.individual")}
                      </CardTitle>
                      <Users className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatEnglishToBangalNum(
                          String(dashboardData.totalIndividualEmployers),
                          language
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-xl font-semibold pt-5 tracking-tight">
                  {t("jobSeekers.title")}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("jobSeekers.total")}
                      </CardTitle>
                      <Users className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatEnglishToBangalNum(
                          String(dashboardData.totalMobileUsers),
                          language
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  className="h-full"
                >
                  <Loader size={22} className="animate-spin" />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
