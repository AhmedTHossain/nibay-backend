import { api_client } from "@/lib/axios";
import { TJob } from "@/utils/types/job";
import { useEffect, useState } from "react";

const useJobs = () => {
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await api_client.get("jobs");
      setJobs(res.data.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return { jobs, setJobs, isLoading, refetch: fetchJobs };
};

export default useJobs;
