"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/app/components/common/Avatar";
import { Textarea } from "@/components/ui/textarea";
import usePendingReviews from "@/app/hooks/reviews/usePendingReviews";

interface PendingReviewModalProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function PendingReviewModal(props: PendingReviewModalProps) {
  const { open, setIsOpen } = props;
  const { isLoading, pendingReviews } = usePendingReviews();

  console.log("------------", pendingReviews);

  return (
    <Dialog open={open} onOpenChange={setIsOpen} defaultOpen>
      <DialogContent className="sm:max-w-2xl rounded-full">
        <DialogHeader>
          <DialogTitle>Pending Reviews</DialogTitle>
          {/* <DialogDescription>List down</DialogDescription> */}
        </DialogHeader>

        <Accordion type="single" collapsible className="mt-1">
          <AccordionItem value="1" key="1">
            <AccordionTrigger>
              <div>
                <div className="flex items-center gap-2">
                  <Avatar title="FS" image={""} />
                  <div>
                    <p className="text-sm font-semibold">Fahim Shahrier</p>
                    <div className="mt-2"></div>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <form className="space-y-2">
                <div>
                  <Textarea
                    rows={5}
                    className="focus:outline-none focus:ring-0 focus-visible:ring-0"
                  />
                </div>
                <div className="flex justify-end">
                  <Button>Save</Button>
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="2" key="2">
            <AccordionTrigger>lorem</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              rerum asperiores excepturi doloribus quibusdam, animi, ab numquam
              vero omnis temporibus totam cumque ea atque esse non voluptatum
              laboriosam eveniet eligendi!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
