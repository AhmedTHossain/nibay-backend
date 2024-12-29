import { api_client } from "@/lib/axios";
import { TJob } from "@/utils/types/job";
import { useEffect, useState } from "react";

const useJobById = ({ jobId }: { jobId: string }) => {
  const [job, setJob] = useState<TJob>();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchJob() {
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

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line
  }, []);

  return { job, isLoading, refetch: fetchJob };
};

export default useJobById;
