"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users } from "lucide-react";
import Link from "next/link";
import Header from "../components/header";
import { SidebarNav } from "./components/sidebar-nav";
import { useUserInfo } from "../hooks/useUserInfo";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isLoading } = useUserInfo();
  useEffect(() => {
    if (user && !user.isAdmin) {
      window.location.href = "/";
    }
  }, [user]);
  return (
    <>
      <Header />
      {!isLoading && user && user.isAdmin && (
        <div className="container grid flex-1 gap-12 pt-[100px] md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <SidebarNav />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <h2 className="text-3xl font-bold tracking-tight">ড্যাশবোর্ড</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-emerald-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      মোট চাকরি
                    </CardTitle>
                    <Briefcase className="h-4 w-4 text-emerald-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">২৫</div>
                  </CardContent>
                </Card>
                <Card className="border-emerald-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      সক্রিয় ইউজার
                    </CardTitle>
                    <Users className="h-4 w-4 text-emerald-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">১৫০</div>
                  </CardContent>
                </Card>
                <Link
                  href={`/admin/users/?type=institution`}
                  className="no-underline"
                >
                  <Card className="hover:shadow-lg transition-shadow duration-200 border-green-100 h-full flex flex-col">
                    <CardHeader className="bg-green-50 border-b border-green-100 flex flex-row items-center gap-3 space-y-0 p-3">
                      <CardTitle className="text-green-800 flex items-center justify-center text-md h-[100px] w-full text-center">
                        প্রাতিষ্ঠানিক ইউজার
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
                <Link
                  href={`/admin/users/?type=individual`}
                  className="no-underline"
                >
                  <Card className="hover:shadow-lg transition-shadow duration-200 border-green-100 h-full flex flex-col">
                    <CardHeader className="bg-green-50 border-b border-green-100 flex flex-row items-center gap-3 space-y-0 p-3">
                      <CardTitle className="text-green-800 flex items-center justify-center text-md h-[100px] w-full text-center">
                        ব্যক্তিগত ইউজার
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
