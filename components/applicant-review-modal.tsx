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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (rating === 0) {
      setError("দয়া করে একটি রেটিং নির্বাচন করুন");
      return;
    }
    setError("");
    onSubmit({ rating, feedback });
  };

  const handleJobClick = () => {
    router.push(`/jobs/${applicant.jobId}`);
  };

  return (
    <>
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        <Avatar className="w-32 h-32">
          <AvatarImage
            src={applicant.profilePhoto}
            alt={applicant.name}
            className="object-cover"
          />
          <AvatarFallback className="text-3xl">
            {applicant.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mt-14 dark:text-white">
            {applicant.name}
          </h2>
          <p className="text-xl text-gray-600 dark:text-white">
            {JOB_ROLES[Number(applicant.role)]?.label}
          </p>
        </div>
        <div className="space-y-4 star-rating">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 cursor-pointer transition-all duration-150 text-gray-400 dark:text-gray-400
                      ${star <= rating ? "text-[#c5a502] fill-[#c5a502] scale-110 !text-[#c5a502]" : ""}
                      hover:text-[#c5a502] hover:fill-[#c5a502] hover:scale-110`}
                onMouseEnter={() => {
                  const stars = document.querySelectorAll(
                    ".star-rating .lucide-star"
                  );
                  stars.forEach((s, index) => {
                    if (index < star) {
                      s.classList.add(
                        "!text-[#c5a502]",
                        "dark:text-[#c5a502]",
                        "fill-[#c5a502]",
                        "scale-110"
                      );
                    } else {
                      s.classList.remove(
                        "!text-[#c5a502]",
                        "dark:text-[#c5a502]",
                        "fill-[#c5a502]",
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
                        "!text-[#c5a502]",
                        "dark:text-[#c5a502]",
                        "fill-[#c5a502]",
                        "scale-110"
                      );
                    } else {
                      s.classList.remove(
                        "!text-[#c5a502]",
                        "dark:text-[#c5a502]",
                        "fill-[#c5a502]",
                        "scale-110"
                      );
                    }
                  });
                }}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-md text-center text-gray-700 dark:text-white">
              এই কর্মী সম্পর্কে মতামত আমাদের সাথে শেয়ার করুন
            </h3>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="আপনার মন্তব্য এখানে লিখুন..."
              className="min-h-[150px] text-lg p-4 rounded-2xl border-0 bg-gray-50 dark:bg-slate-950 focus:outline-none"
            />
          </div>
        </div>
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
        <div className="space-y-4">
          <Button
            onClick={onGoBack}
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-800 mb-8 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            পিছনে যান
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            className="w-[90%] h-16 text-md font-semibold bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white rounded-full absolute -bottom-4 left-1/2 transform -translate-x-1/2"
          >
            রিভিউ সাবমিট করুন
          </Button>
          {/* absolute -top-16 left-1/2 transform -translate-x-1/2 */}
        </div>
      </motion.div>
    </>
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
      <DialogContent
        className={`bg-white dark:bg-slate-800 ${selectedApplicant ? "max-w-md px-10" : "max-w-xl"}`}
      >
        {!selectedApplicant && (
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              আবেদনকারীর রিভিউ
            </DialogTitle>
            <DialogDescription className="pt-4 text-gray-700 dark:text-gray-300 text-justify">
              আপনার পর্যালোচনা আমাদের অন্য ব্যবহারকারীদের সহায়তা করতে এবং তাদের
              অভিজ্ঞতা উন্নত করতে সাহায্য করবে। দয়া করে আপনার মতামত শেয়ার
              করুন!
            </DialogDescription>
          </DialogHeader>
        )}
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
                    className="bg-purple-600/10 dark:bg-purple-900 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-700"
                  >
                    {formatEnglishToBangalNum(String(pendingReviews.length))} টি
                    রিভিউ বাকি
                  </Badge>
                </div>
                <ScrollArea className="max-h-[50vh] overflow-auto">
                  <div className="space-y-4">
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
                          className="focus:outline-none"
                        >
                          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm border">
                            <div className="flex items-start justify-start gap-4">
                              <Avatar className="w-24 h-24">
                                <AvatarImage
                                  src={applicant.profilePhoto}
                                  alt={applicant.name}
                                  className="object-cover"
                                />
                                <AvatarFallback className="text-xl">
                                  {applicant.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex items-start justify-between w-full">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                      {applicant.name}
                                    </h3>
                                    <Badge
                                      variant="secondary"
                                      className="ml-2 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300"
                                    >
                                      {JOB_ROLES[Number(applicant.role)]?.label}
                                    </Badge>
                                  </div>
                                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                    {applicant?.email && (
                                      <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span>{applicant.email}</span>
                                      </div>
                                    )}
                                    {applicant?.phone && (
                                      <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        <span>
                                          {formatEnglishToBangalNum(
                                            applicant.phone
                                          )}
                                        </span>
                                      </div>
                                    )}
                                    {applicant?.address && (
                                      <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{applicant.address}</span>
                                      </div>
                                    )}
                                    {applicant?.jobId && (
                                      <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        <span>
                                          <a
                                            href="#"
                                            onClick={(e) =>
                                              handleJobClick(applicant.jobId, e)
                                            }
                                            className="text-emerald-600 dark:text-emerald-300 hover:underline"
                                          >
                                            {applicant.jobTitle}
                                          </a>
                                        </span>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4" />
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
                            <Separator className="my-4" />
                          )}
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
