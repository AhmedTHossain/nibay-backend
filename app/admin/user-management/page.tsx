"use client";

import Header from "@/app/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SidebarNav } from "../components/sidebar-nav";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");

  return (
    <>
      <Header isAdminRoute={true} />
      <div className="container grid flex-1 gap-12 pt-[100px] md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SidebarNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("user_management")}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href={`/admin/users/?type=institution`}
                className="no-underline"
              >
                <Card className="hover:shadow-lg transition-shadow duration-200 border-green-100 h-full flex flex-col">
                  <CardHeader className="bg-green-50 border-b border-green-100 flex flex-row items-center gap-3 space-y-0 p-3">
                    <CardTitle className="text-green-800 flex items-center justify-center text-md h-[100px] w-full text-center">
                      {t("institution_user")}
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
                      {t("individual_user")}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
              <Link href={`/admin/users/?type=mobile`} className="no-underline">
                <Card className="hover:shadow-lg transition-shadow duration-200 border-green-100 h-full flex flex-col">
                  <CardHeader className="bg-green-50 border-b border-green-100 flex flex-row items-center gap-3 space-y-0 p-3">
                    <CardTitle className="text-green-800 flex items-center justify-center text-md h-[100px] w-full text-center">
                      {t("mobile_user")}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
