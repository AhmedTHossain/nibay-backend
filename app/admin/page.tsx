"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Loader, User, Users } from "lucide-react";
import Header from "../components/header";
import { SidebarNav } from "./components/sidebar-nav";
import { use, useEffect, useState } from "react";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";
import { api_client } from "@/lib/axios";
import { AnimatePresence, motion } from "framer-motion";

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
  const [dashboardData, setDashboardData] = useState<DashboardPageData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await api_client.get('/dashboard');
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
            <h2 className="text-3xl font-bold tracking-tight">ড্যাশবোর্ড</h2>
            {dashboardData ? (
              <>
                <h3 className="text-xl font-semibold pt-5 tracking-tight">চাকরির বিজ্ঞাপন</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        মোট চাকরির বিজ্ঞাপন
                      </CardTitle>
                      <Briefcase className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatEnglishToBangalNum(String(dashboardData.totalJobs))}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        সক্রিয় চাকরির বিজ্ঞাপন
                      </CardTitle>
                      <Briefcase className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatEnglishToBangalNum(String(dashboardData.totalActiveJobs))}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        প্রাতিষ্ঠানিক চাকরির বিজ্ঞাপন
                      </CardTitle>
                      <Briefcase className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatEnglishToBangalNum(String(dashboardData.totalInstitutionJobs))}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        ব্যক্তিগত চাকরির বিজ্ঞাপন
                      </CardTitle>
                      <Briefcase className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatEnglishToBangalNum(String(dashboardData.totalIndividualJobs))}</div>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-xl font-semibold pt-5 tracking-tight">চাকরির নিয়োগকর্তা</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        মোট নিয়োগকর্তার সংখ্যা
                      </CardTitle>
                      <Users className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatEnglishToBangalNum(String(dashboardData.totalEmployers))}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        প্রাতিষ্ঠানিক নিয়োগকর্তার সংখ্যা
                      </CardTitle>
                      <Users className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatEnglishToBangalNum(String(dashboardData.totalInstitutionEmployers))}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        ব্যক্তিগত নিয়োগকর্তার সংখ্যা
                      </CardTitle>
                      <Users className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatEnglishToBangalNum(String(dashboardData.totalIndividualEmployers))}</div>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-xl font-semibold pt-5 tracking-tight">চাকরির সন্ধানকারী</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-emerald-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        মোট চাকরির সন্ধানকারী
                      </CardTitle>
                      <Users className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatEnglishToBangalNum(String(dashboardData.totalMobileUsers))}</div>
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
