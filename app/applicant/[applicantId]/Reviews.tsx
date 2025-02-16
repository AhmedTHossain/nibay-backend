import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import useReviewsByApplicantId from "@/app/hooks/reviews/useReviewsByApplicantId";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { use, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function ApplicantReviews({
  applicantId
}: {
  applicantId: string;
}) {
  const {
    reviews,
    averageRating,
    isLoading: isReviewLoading
  } = useReviewsByApplicantId({ applicantId });

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  const hasReviews = reviews.length > 0;

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating * 10) / 10; // Round to 1 decimal place
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{
                width: `${Math.max(0, Math.min(100, (roundedRating - star + 1) * 100))}%`
              }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        ))}
        <span className="ml-1 text-sm text-gray-600">
          {formatEnglishToBangalNum(roundedRating.toFixed(1), language)}
        </span>
      </div>
    );
  };

  const ratingCounts = reviews.reduce(
    (acc, review) => {
      const rating = Math.floor(review.rating);
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );
  const t = useTranslations("ApplicantReviews"); // Initialize translations
  const language = useTranslations("language")("code");

  return (
    <div className="container p-0 mt-10 max-w-full">
      <Card className="mb-8 border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">
            {t("average_rating")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasReviews ? (
            <>
              <div className="flex items-center mb-4">
                {renderStars(averageRating)}
              </div>
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center text-sm">
                    <span className="w-3 mr-2">{rating}</span>
                    <Progress
                      value={
                        ((ratingCounts[rating] || 0) / reviews.length) * 100
                      }
                      className="h-2 flex-1"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {t("reviews_count", {
                  count: formatEnglishToBangalNum(
                    String(reviews.length),
                    language
                  )
                })}
              </p>
            </>
          ) : (
            <Alert>
              <AlertDescription>{t("no_reviews")}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      {hasReviews ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.reviewerId} className="p-4 border-0">
              <CardContent className="pt-4">
                <div className="flex items-start">
                  <Avatar className="w-10 h-10 mr-4">
                    <AvatarFallback>
                      {review.reviewerName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{review.reviewerName}</h3>
                      <span className="text-sm text-gray-500">
                        {t("review_date", {
                          date: formatEnglishToBangalNum(
                            new Date(review.createdAt).toLocaleDateString(),
                            language
                          )
                        })}
                        {/* Placeholder date */}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("reviewed_for", { jobTitle: review.jobTitle })}
                      </p>
                    </div>
                    <div className="flex items-center mt-1">
                      {renderStars(review.rating)}
                    </div>
                    <p className="mt-2 text-gray-600">{review.feedback}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
