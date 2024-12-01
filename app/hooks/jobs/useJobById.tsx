import { api_client } from "@/lib/axios";
import { TJob } from "@/utils/types/job";
import { useEffect, useState } from "react";

const useJobById = ({ jobId }: { jobId: string }) => {
  const [job, setJob] = useState<TJob>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      api_client
        .get(`jobs/${jobId}`)
        .then((res) => {
          setJob(res.data.data);
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    }

    fetchJobs();
  }, []);

  return { job, isLoading };
};

export default useJobById;
