"use client";

import { JOB_ITEMS } from "@/app/assets/resources";
import { JobGrid } from "./JobGrid";
import { useState } from "react";
import { JobDeleteModal } from "./JobDeleteModal";

export function JobBox() {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <JobDeleteModal open={open} setIsOpen={setIsOpen} />

      {JOB_ITEMS.map((item) => {
        return <JobGrid key={item.id} {...item} setIsOpen={setIsOpen} />;
      })}
    </>
  );
}
