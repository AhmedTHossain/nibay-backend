import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import useReviewsByApplicantId from '@/app/hooks/reviews/useReviewsByApplicantId';

export default function ApplicantReviews({ applicantId }: { applicantId: string }) {
    const { reviews, averageRating, isLoading: isReviewLoading } = useReviewsByApplicantId({ applicantId });

    const renderStars = (rating: number) => {
        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                            }`}
                    />
                ))}
            </div>
        );
    };

    const ratingCounts = reviews.reduce((acc, review) => {
        const rating = Math.floor(review.rating);
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Card className="mb-8">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold">{"asdf"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center mb-4">
                        <span className="text-4xl font-bold mr-2">{averageRating.toFixed(1)}</span>
                        {renderStars(averageRating)}
                    </div>
                    <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center text-sm">
                                <span className="w-3 mr-2">{rating}</span>
                                <Progress
                                    value={(ratingCounts[rating] || 0) / reviews.length * 100}
                                    className="h-2 flex-1"
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{reviews.length} reviews</p>
                </CardContent>
            </Card>
            <div className="space-y-4">
                {reviews.map((review) => (
                    <Card>
                        <CardContent className="pt-4">
                            <div className="flex items-start">
                                <Avatar className="w-10 h-10 mr-4">
                                    <AvatarFallback>{review.reviewerName?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold">{review.reviewerName}</h3>
                                        <span className="text-sm text-gray-500">
                                            {new Date(review.createdAt).toLocaleDateString()} {/* Placeholder date */}
                                        </span>
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
        </div>
    );
}

