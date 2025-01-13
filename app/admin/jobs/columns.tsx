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

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  status: string;
};

export const jobColumns: ColumnDef<Job>[] = [
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
        <div className="flex space-x-2">
          <Button variant="ghost" className="h-8 w-8 p-0 flex items-center">
            <Edit className="h-4 w-4" />
            <span className="ml-2">এডিট করুন</span>
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-red-600 flex items-center"
          >
            <Trash className="h-4 w-4" />
            <span className="ml-2">ডিলিট করুন</span>
          </Button>
        </div>
      );
    }
  }
];
