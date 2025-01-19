import { api_client } from "@/lib/axios";
import { TJob } from "@/utils/types/job";
import { useEffect, useState } from "react";

const useJobs = () => {
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
  });

  const fetchJobs = async ({
    page = 1,
    limit = 10,
    jobRole,
    jobStatus,
  }: {
    page?: number;
    limit?: number;
    jobRole?: string;
    jobStatus?: string;
  } = {}) => {
    setIsLoading(true);
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());
      if (jobRole) queryParams.append("jobRole", jobRole);
      if (jobStatus) queryParams.append("jobStatus", jobStatus);

      // API request with query parameters
      const res = await api_client.get(`jobs?${queryParams.toString()}`);
      const data = res.data.data;

      // Update state
      setJobs(data.jobs);
      setPagination({
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        totalJobs: data.pagination.totalJobs,
      });
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return { jobs, setJobs, isLoading, pagination, refetch: fetchJobs };
};

export default useJobs;
