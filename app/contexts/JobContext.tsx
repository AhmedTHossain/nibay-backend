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
  pagination: Pagination;
  setJobs: Dispatch<SetStateAction<TJob[]>>;
  copyJob: TJob | null;
  setCopyJob: Dispatch<SetStateAction<TJob | null>>;
  isLoading: boolean;
  refetch: any;
  addJob: (job: TJob) => Promise<void>;
  updateJob: (id: string, updatedJob: TJob) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}

const JobContext = createContext<JobContextValue | undefined>(undefined);

export const JobProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copyJob, setCopyJob] = useState<TJob | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0
  });

  const fetchJobs = async ({
    page = 1,
    limit = 12,
    jobRole,
    jobStatus,
    userId
  }: {
    page?: number;
    limit?: number;
    jobRole?: string;
    jobStatus?: string;
    userId?: string;
  } = {}) => {
    setIsLoading(true);
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());
      if (jobRole) queryParams.append("jobRole", jobRole);
      if (jobStatus) queryParams.append("jobStatus", jobStatus);
      if (userId) queryParams.append("userId", userId);

      // API request with query parameters
      const res = await api_client.get(`jobs?${queryParams.toString()}`);
      const data = res.data.data;

      // Update state
      setJobs(data.jobs);
      setPagination({
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        totalJobs: data.pagination.totalJobs
      });
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addJob = async (job: TJob) => {
    try {
      const res = await api_client.post("/api/jobs", job);
      setJobs([...jobs, res.data.data]);
    } catch (error) {
      console.error("Failed to add job:", error);
    }
  };

  const updateJob = async (id: string, updatedJob: TJob) => {
    try {
      const res = await api_client.put(`/api/jobs/${id}`, updatedJob);
      setJobs(jobs.map((job) => (job._id === id ? res.data.data : job)));
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await api_client.delete(`/api/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        pagination,
        setJobs,
        isLoading,
        refetch: fetchJobs,
        setCopyJob,
        copyJob,
        addJob,
        updateJob,
        deleteJob
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
