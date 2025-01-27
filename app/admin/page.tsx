import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "./layout";
import { Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">ড্যাশবোর্ড</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট চাকরি</CardTitle>
            <Briefcase className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">২৫</div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">সক্রিয় ইউজার</CardTitle>
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
  );
}
