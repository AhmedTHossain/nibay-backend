"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Star } from "lucide-react";
import { Applicant } from "@/utils/types/applicant";
import { JOB_ROLES, USER_ROLE } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { api_client } from "@/lib/axios";
import { sub } from "date-fns";

interface Review {
  rating: number;
  feedback: string;
}

function ApplicantReview({
  applicant,
  onSubmit,
  onGoBack
}: {
  applicant: Applicant;
  onSubmit: (review: Review) => void;
  onGoBack: () => void;
}) {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackCount, setFeedbackCount] = useState(0);

  const handleSubmit = () => {
    onSubmit({ rating, feedback });
  };

  const handleJobClick = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={applicant.profilePhoto}
            alt={applicant.name}
            className="object-cover"
          />
          <AvatarFallback>
            {applicant.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center space-y-1">
          <h3 className="text-lg font-semibold">{applicant.name}</h3>
          <p className="text-sm text-gray-500">
            {USER_ROLE[applicant.role as keyof typeof USER_ROLE]?.label}
          </p>
          <button
            onClick={() => {
              handleJobClick(applicant.jobId);
            }}
            className="text-sm text-blue-500 hover:underline"
          >
            {applicant.jobShortDescription}
          </button>
        </div>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2 relative">
        <Label htmlFor="feedback">মন্তব্য (অপশনাল)</Label>
        <Textarea
          id="feedback"
          value={feedback}
          maxLength={500}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setFeedback(e.target.value);
              setFeedbackCount(e.target.value.length);
            }
          }}
          placeholder="আপনার মন্তব্য লিখুন"
        />
        <span
          className={`absolute bottom-2 right-2 text-xs text-gray-500"
            }`}
        >
          {feedbackCount}/500
        </span>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onGoBack}>
          <ArrowLeft className="mr-2" />
          পিছনে যান
        </Button>
        <Button
          disabled={rating === 0}
          onClick={handleSubmit}
          className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:text-white"
        >
          সাবমিট
        </Button>
      </div>
    </div>
  );
}

interface ApplicantReviewModalProps {
  pendingReviews: Applicant[];
  submitReview: (jobId: string, applicantId: string, review: Review) => void;
  isSubmitting: boolean;
}

export default function ApplicantReviewModal({
  pendingReviews,
  submitReview,
  isSubmitting
}: ApplicantReviewModalProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(pendingReviews.length > 0);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );

  useEffect(() => {
    setIsOpen(pendingReviews.length > 0);
  }, [pendingReviews]);

  const handleApplicantClick = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleReviewSubmit = (review: Review) => {
    if (selectedApplicant) {
      submitReview(selectedApplicant?.jobId, selectedApplicant._id, review);
    }
    setSelectedApplicant(null);
  };

  const handleGoBack = () => {
    setSelectedApplicant(null);
  };

  const handleJobClick = (jobId: string, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/jobs/${jobId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] dark:bg-slate-800">
        <DialogHeader>
          <DialogTitle>আবেদনকারীর রিভিউ</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {selectedApplicant ? (
            <ApplicantReview
              applicant={selectedApplicant}
              onSubmit={handleReviewSubmit}
              onGoBack={handleGoBack}
            />
          ) : (
            <ul className="space-y-4">
              {pendingReviews.map((applicant) => (
                <li key={applicant._id}>
                  <button
                    className="w-full text-left flex items-center space-x-4 px-4 py-3 rounded-lg shadow-lg border-0 bg-gray-50 hover:bg-emerald-50 dark:hover:bg-slate-600/25 dark:bg-slate-700 transition-colors focus:outline-none"
                    onClick={() => handleApplicantClick(applicant)}
                  >
                    <Avatar>
                      <AvatarImage
                        src={applicant.profilePhoto}
                        alt={applicant.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {applicant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-semibold block">
                        {applicant.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block">
                        {
                          USER_ROLE[applicant.role as keyof typeof USER_ROLE]
                            ?.label
                        }
                      </span>
                      <span
                        className="text-sm text-blue-500 hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobClick(applicant.jobId, e);
                        }}
                      >
                        {applicant.jobShortDescription}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
