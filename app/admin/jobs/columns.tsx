"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { TJob } from "@/utils/types/job";

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  status: string;
};

export const jobColumns: ColumnDef<TJob>[] = [
  {
    accessorKey: "title",
    header: "শিরোনাম"
  },
  {
    accessorKey: "shortDescription",
    header: "সারসংক্ষেপ"
  },
  {
    accessorKey: "division",
    header: "বিভাগ"
  },
  {
    accessorKey: "status",
    header: "অবস্থা"
  },
  {
    header: "অ্যাকশন",
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;

      return (
        <div className="flex justify-center space-x-2">
          <Button
            variant="ghost"
            className="h-8 px-3 flex items-center border border-emerald-800 rounded-md text-emerald-800 hover:bg-emerald-50 transition"
          >
            <Edit className="h-4 w-4" />
            <span>এডিট</span>
          </Button>
          <Button
            variant="ghost"
            className="h-8 px-3 flex items-center border border-red-600 rounded-md text-red-600 hover:bg-red-50 hover:text-red-600 transition"
          >
            <Trash className="h-4 w-4" />
            <span>ডিলিট</span>
          </Button>
        </div>
      );
    }
  }
];
