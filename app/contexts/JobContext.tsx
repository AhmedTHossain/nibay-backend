"use client";

import { api_client } from "@/lib/axios";
import { TJob } from "@/utils/types/job";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";

interface JobContextValue {
  jobs: TJob[];
  setJobs: Dispatch<SetStateAction<TJob[]>>;
  copyJob: TJob | null;
  setCopyJob: Dispatch<SetStateAction<TJob | null>>;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const JobContext = createContext<JobContextValue | undefined>(undefined);

export const JobProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copyJob, setCopyJob] = useState<TJob | null>(null);

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

  return (
    <JobContext.Provider
      value={{
        jobs,
        setJobs,
        isLoading,
        refetch: fetchJobs,
        setCopyJob,
        copyJob
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
};
