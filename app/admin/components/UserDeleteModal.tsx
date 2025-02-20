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
import { api_client } from "@/lib/axios";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface JobDeleteModalProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: string | undefined;
  setShouldRemove: Dispatch<SetStateAction<boolean>>;
}

export function UserDeleteModal(props: JobDeleteModalProps) {
  const t = useTranslations("UserDeleteModal");
  const { open, setIsOpen, userId, setShouldRemove } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await api_client.delete(`user/${userId}`);
      if (res.data.status === "success") {
        toast.success(res.data.message);
        setIsOpen(false);
        setShouldRemove(true);
      } else {
        console.error("Failed to delete the user:", res.data.error);
        toast.error(res.data.error);
      }
    } catch (err) {
      console.error("Failed to delete the user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle>{t("delete_confirmation")}</DialogTitle>
          <DialogDescription>{t("delete_description")}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              {t("no")}
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isLoading}
              onClick={handleDelete}
            >
              {isLoading && <Loader className="animate-spin" />} {t("yes")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
