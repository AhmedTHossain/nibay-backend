"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { jobColumns } from "./columns";
import { useJobContext } from "@/app/contexts/JobContext";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const router = useRouter();
  const { jobs, isLoading } = useJobContext();

  console.log(jobs);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">চাকরি</h2>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => router.push("/admin/jobs/new")}
        >
          <Plus className="mr-2 h-4 w-4" /> নতুন চাকরি তৈরি করুন
        </Button>
      </div>
      <DataTable
        columns={jobColumns}
        data={jobs}
        isLoading={isLoading}
        searchKey="title"
      />
    </div>
  );
}
