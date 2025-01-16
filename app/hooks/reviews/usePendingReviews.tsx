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
