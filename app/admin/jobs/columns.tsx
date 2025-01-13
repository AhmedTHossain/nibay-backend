"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
    accessorKey: "department",
    header: "সারসংক্ষেপ"
  },
  {
    accessorKey: "location",
    header: "কর্মস্থল"
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit Job</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Delete Job
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
