"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users } from "lucide-react";
import Link from "next/link";
import Header from "../components/header";
import { SidebarNav } from "./components/sidebar-nav";
import { useUserInfo } from "../hooks/useUserInfo";
import { useEffect } from "react";

export default function DashboardPage() {
  return (
    <>
      <Header />
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
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
