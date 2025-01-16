import { api_client } from "@/lib/axios";
import { Applicant } from "@/utils/types/applicant";
import { TJob } from "@/utils/types/job";
import { useEffect, useState } from "react";

const usePendingReviews = () => {
  const [pendingReviews, setPendingReviews] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await api_client.get("reviews");
      res.data.data = [
        {
          _id: 1,
          name: "Sharif Minhazul Islam",
          role: "চেকার",
          jobId: "67757996173ff7d2fdbe29a7",
          jobShortDescription: "test job 1",
          profilePhoto: "uploads/1736580368943-image (2).webp"
        },
        {
          _id: 2,
          name: "Fahim Shahriar",
          role: "ফোরম্যান",
          jobId: "6781342a2f8a480677508479",
          jobShortDescription: "Test Job 02",
          profilePhoto: "uploads/1736580368943-image (2).webp"
        }
      ] as Applicant[];
      setPendingReviews(res.data.data);
    } catch (error) {
      console.error("Failed to fetch pending reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    pendingReviews,
    setPendingReviews,
    isLoading,
    refetch: fetchReviews
  };
};

export default usePendingReviews;
