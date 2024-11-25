"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface JobDeleteModalProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function JobDeleteModal(props: JobDeleteModalProps) {
  const { open, setIsOpen } = props;

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle>চাকরি ডিলিট নিশ্চিতকরণ </DialogTitle>
          <DialogDescription>
            আপনি কি এই চাকরিটি ডিলিট করার বিষয়ে নিশ্চিত?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              না
            </Button>
            <Button type="button" variant="destructive">
              হ্যাঁ
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
