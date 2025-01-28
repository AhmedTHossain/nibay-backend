import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface ApplicantListModalProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ApplicantListModal(props: ApplicantListModalProps) {
  const { open, setIsOpen } = props;

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Applicant list</DialogTitle>
          <DialogDescription>List down</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
