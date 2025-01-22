"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Briefcase,
  Clock,
  Mail,
  MapPin,
  Phone,
  Star,
  User
} from "lucide-react";
import { Applicant } from "@/utils/types/applicant";
import { JOB_ROLES, USER_ROLE } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { api_client } from "@/lib/axios";
import { sub } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";

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
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      setError("Please select a star rating before submitting.");
      return;
    }
    setError("");
    onSubmit({ rating, feedback });
  };

  const handleJobClick = () => {
    router.push(`/jobs/${applicant.jobId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-32 h-32 border-2 border-emerald-500">
          <AvatarImage
            src={applicant.profilePhoto}
            alt={applicant.name}
            className="object-cover"
          />
          <AvatarFallback className="text-3xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
            {applicant.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="text-center flex flex-col items-center space-y-1">
          <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
            {applicant.name}
          </h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            {
              // @ts-expect-error
              JOB_ROLES[applicant.role as keyof typeof JOB_ROLES]?.label
            }
          </p>
          <button
            onClick={handleJobClick}
            className="text-sm font-medium text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors flex items-start justify-center mt-1"
          >
            {applicant.jobShortDescription}
          </button>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6 bg-gray-50 dark:bg-gray-800">
          <div className="space-y-4 star-rating">
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                রেটিং
              </Label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 cursor-pointer transition-all duration-150 
                      ${star <= rating ? "text-yellow-400 fill-yellow-400 scale-110" : "text-gray-300 dark:text-gray-600"}
                      hover:text-yellow-400 hover:fill-yellow-400 hover:scale-110`}
                    onMouseEnter={() => {
                      const stars = document.querySelectorAll(
                        ".star-rating .lucide-star"
                      );
                      stars.forEach((s, index) => {
                        if (index < star) {
                          s.classList.add(
                            "text-yellow-400",
                            "fill-yellow-400",
                            "scale-110"
                          );
                        } else {
                          s.classList.remove(
                            "text-yellow-400",
                            "fill-yellow-400",
                            "scale-110"
                          );
                        }
                      });
                    }}
                    onMouseLeave={() => {
                      const stars = document.querySelectorAll(
                        ".star-rating .lucide-star"
                      );
                      stars.forEach((s, index) => {
                        if (index < rating) {
                          s.classList.add(
                            "text-yellow-400",
                            "fill-yellow-400",
                            "scale-110"
                          );
                        } else {
                          s.classList.remove(
                            "text-yellow-400",
                            "fill-yellow-400",
                            "scale-110"
                          );
                        }
                      });
                    }}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2 relative">
              <Label
                htmlFor="feedback"
                className="text-lg font-semibold text-emerald-700 dark:text-emerald-300"
              >
                মন্তব্য (অপশনাল)
              </Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="আপনার মতামত লিখুন..."
                className="h-24 resize-none bg-white dark:bg-gray-700 dark:text-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
              <span className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
                {formatEnglishToBangalNum(String(feedbackCount))}/৫০০
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onGoBack}
          className="border-emerald-500 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-700 dark:border-emerald-300"
        >
          <ArrowLeft className="w-4 h-4" />
          পিছনে যান
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-700 dark:hover:bg-emerald-800"
        >
          রিভিউ সাবমিট করুন
        </Button>
      </div>
    </motion.div>
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
      <DialogContent className="max-w-2xl bg-white dark:bg-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            আবেদনকারীর রিভিউ
          </DialogTitle>
          <DialogDescription className="pt-4 text-gray-700 dark:text-gray-300">
            আপনার পর্যালোচনা আমাদের অন্য ব্যবহারকারীদের সহায়তা করতে এবং তাদের
            অভিজ্ঞতা উন্নত করতে সাহায্য করবে। দয়া করে আপনার মতামত শেয়ার করুন!
          </DialogDescription>
        </DialogHeader>
        <div>
          <AnimatePresence mode="wait">
            {selectedApplicant ? (
              <ApplicantReview
                applicant={selectedApplicant}
                onSubmit={handleReviewSubmit}
                onGoBack={handleGoBack}
              />
            ) : (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700"
                  >
                    {formatEnglishToBangalNum(String(pendingReviews.length))} টি
                    রিভিউ বাকি
                  </Badge>
                </div>
                <ScrollArea className="h-auto rounded-md border border-emerald-100 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/50">
                  <div className="p-4 space-y-4">
                    <motion.ul
                      key="list"
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {pendingReviews.map((applicant, index) => (
                        <motion.li
                          key={applicant._id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div key={applicant._id}>
                            <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm border border-emerald-100 dark:border-emerald-700">
                              <div className="flex items-start justify-start gap-4">
                                <Avatar className="w-24 h-24 border-2 border-emerald-500">
                                  <AvatarImage
                                    src={applicant.profilePhoto}
                                    alt={applicant.name}
                                    className="object-cover"
                                  />
                                  <AvatarFallback className="text-xl bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300">
                                    {applicant.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex items-start justify-between w-full">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                        {applicant.name}
                                      </h3>
                                      <Badge
                                        variant="secondary"
                                        className="ml-2 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300"
                                      >
                                        {
                                          JOB_ROLES[
                                            applicant.role as keyof typeof JOB_ROLES
                                          ]?.label
                                        }
                                      </Badge>
                                    </div>
                                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                      {applicant?.email && (
                                        <div className="flex items-center gap-2">
                                          <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                          <span>{applicant.email}</span>
                                        </div>
                                      )}
                                      {applicant?.phone && (
                                        <div className="flex items-center gap-2">
                                          <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                          <span>
                                            {formatEnglishToBangalNum(
                                              applicant.phone
                                            )}
                                          </span>
                                        </div>
                                      )}
                                      {applicant?.address && (
                                        <div className="flex items-center gap-2">
                                          <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                          <span>{applicant.address}</span>
                                        </div>
                                      )}
                                      {applicant?.jobId && (
                                        <div className="flex items-center gap-2">
                                          <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                          <span>
                                            <a
                                              href="#"
                                              onClick={(e) =>
                                                handleJobClick(
                                                  applicant.jobId,
                                                  e
                                                )
                                              }
                                              className="text-emerald-600 dark:text-emerald-300 hover:underline"
                                            >
                                              {applicant.jobTitle}
                                            </a>
                                          </span>
                                        </div>
                                      )}
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                        <span>
                                          আবেদনটি গ্রহণ করেছেন{" "}
                                          {formatEnglishToBangalNum(
                                            new Date(
                                              applicant?.statusChangeDate
                                            ).toLocaleDateString()
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() =>
                                      handleApplicantClick(applicant)
                                    }
                                    className="bg-emerald-600 dark:bg-emerald-700 dark:text-white hover:bg-emerald-700 dark:hover:bg-emerald-800"
                                  >
                                    রিভিউ দিন
                                  </Button>
                                </div>
                              </div>
                            </div>
                            {index < pendingReviews.length - 1 && (
                              <Separator className="my-4 bg-emerald-100 dark:bg-emerald-700" />
                            )}
                          </div>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </ScrollArea>
              </div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
