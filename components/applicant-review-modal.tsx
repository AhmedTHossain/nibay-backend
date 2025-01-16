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
import { Star } from "lucide-react";
import { Applicant } from "@/utils/types/applicant";
import { JOB_ROLES } from "@/lib/constant";
import { useRouter } from "next/navigation";

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

  const handleSubmit = () => {
    onSubmit({ rating, feedback });
  };

  const handleJobClick = (jobId: string) => {
    console.log(`Job clicked: ${applicant.jobShortDescription}`);
    router.push(`/jobs/${jobId}`);
    // Here you would typically navigate to the job details page or open a modal with job details
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar>
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
        <div>
          <h3 className="text-lg font-semibold">{applicant.name}</h3>
          <p className="text-sm text-gray-500">{applicant.role}</p>
          <button
            onClick={() => {
              handleJobClick(applicant.jobId);
            }}
            className="text-sm text-blue-500 hover:underline"
          >
            {applicant.jobShortDescription}
          </button>
        </div>
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
      <div className="space-y-2">
        <Label htmlFor="feedback">মন্তব্য (অপশনাল)</Label>
        <Input
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="আপনার মন্তব্য লিখুন"
        />
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onGoBack}>
          পিছনে যান
        </Button>
        <Button
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
}

export default function ApplicantReviewModal({
  pendingReviews
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
    console.log(`Review submitted for ${selectedApplicant?.name}:`, review);
    // Here you would typically send this data to your backend
    setSelectedApplicant(null);
  };

  const handleGoBack = () => {
    setSelectedApplicant(null);
  };

  const handleJobClick = (jobId: string, e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Job clicked: ${jobId}`);
    router.push(`/jobs/${jobId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>আবেদনকারী রিভিউ</DialogTitle>
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
                    className="w-full text-left flex items-center space-x-4 p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-800/25 transition-colors"
                    onClick={() => handleApplicantClick(applicant)}
                  >
                    <Avatar>
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
                    <div>
                      <span className="font-semibold block">
                        {applicant.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block">
                        {applicant.role}
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
