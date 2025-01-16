"use client";

import { useState } from "react";
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

// Updated mock data for applicants
const applicants = [
  {
    id: 1,
    name: "John Doe",
    role: "Frontend Developer",
    job: "Senior React Developer",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "UX Designer",
    job: "Lead Product Designer",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 3,
    name: "Bob Johnson",
    role: "Backend Developer",
    job: "Python Engineer",
    avatar: "/placeholder.svg?height=40&width=40"
  }
];

interface Applicant {
  id: number;
  name: string;
  role: string;
  job: string;
  avatar: string;
}

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
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit({ rating, feedback });
  };

  const handleJobClick = () => {
    console.log(`Job clicked: ${applicant.job}`);
    // Here you would typically navigate to the job details page or open a modal with job details
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={applicant.avatar} alt={applicant.name} />
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
            onClick={handleJobClick}
            className="text-sm text-blue-500 hover:underline"
          >
            {applicant.job}
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
        <Label htmlFor="feedback">Feedback (optional)</Label>
        <Input
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here"
        />
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onGoBack}>
          Go Back
        </Button>
        <Button onClick={handleSubmit}>Submit Review</Button>
      </div>
    </div>
  );
}

export default function ApplicantReviewModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );

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

  const handleJobClick = (job: string, e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Job clicked: ${job}`);
    // Here you would typically navigate to the job details page or open a modal with job details
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pending Applicants</DialogTitle>
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
              {applicants.map((applicant) => (
                <li key={applicant.id}>
                  <button
                    className="w-full text-left flex items-center space-x-4 p-2 rounded hover:bg-gray-100 transition-colors"
                    onClick={() => handleApplicantClick(applicant)}
                  >
                    <Avatar>
                      <AvatarImage
                        src={applicant.avatar}
                        alt={applicant.name}
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
                      <span className="text-sm text-gray-500 block">
                        {applicant.role}
                      </span>
                      <span
                        className="text-sm text-blue-500 hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobClick(applicant.job, e);
                        }}
                      >
                        {applicant.job}
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
