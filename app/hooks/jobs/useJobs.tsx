import { api_client } from "@/lib/axios";
import { TJob } from "@/utils/types/job";
import { useEffect, useState } from "react";

const useJobs = () => {
  const [jobs, setJobs] = useState<TJob[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      api_client
        .get("jobs")
        .then((res) => {
          setJobs(res.data.data);
          setIsLoading(false);
        })
        .catch(() => {})
        .finally(() => {});
    }

    fetchJobs();
  }, []);

  return { jobs, isLoading };
};

export default useJobs;
