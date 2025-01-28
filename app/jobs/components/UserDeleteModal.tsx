"use client";

import { useJobContext } from "@/app/contexts/JobContext";
import useJobs from "@/app/hooks/jobs/useJobs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { api_client } from "@/lib/axios";
import { Loader } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface JobDeleteModalProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: string | undefined;
}

export function UserDeleteModal(props: JobDeleteModalProps) {
  const { open, setIsOpen, userId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await api_client.delete(`user/${userId}`);
      if (res.data.status === "success") {
        // setJobs((prevJobs) => prevJobs.filter((item) => item._id !== jobId));
        toast.success(res.data.message);
        if (pathname.includes("jobs")) {
          router.push("/jobs");
        }
        setIsOpen(false);
      }
    } catch (err) {
      console.error("Failed to delete the job:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle>ইউজার ডিলিট নিশ্চিতকরণ </DialogTitle>
          <DialogDescription>
            আপনি কি এই ইউজার ডিলিট করার বিষয়ে নিশ্চিত?
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
            <Button
              type="button"
              variant="destructive"
              disabled={isLoading}
              onClick={() => {
                handleDelete();
              }}
            >
              {isLoading && <Loader className="animate-spin" />} হ্যাঁ
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
