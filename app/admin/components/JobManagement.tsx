import { useJobContext } from "@/app/contexts/JobContext";
import { TJob } from "@/utils/types/job";
import { useState, useEffect } from "react";

export default function JobManagement() {
  const { jobs, addJob, updateJob, deleteJob } = useJobContext();
  const [newJob, setNewJob] = useState<TJob>({
    _id: "",
    user: "",
    applicationDeadline: new Date(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: "",
    shortDescription: "",
    longDescription: "",
    experience: "",
    division: "",
    district: "",
    qualification: "",
    salary: null,
    jobRole: "",
    applicants: [],
    isBirthCertificateRequired: false,
    isPortEntryPermitRequired: false,
    status: "",
    __v: 0,
    applicationStatus: "PENDING"
  });

  const handleAddJob = () => {
    addJob(newJob);
    setNewJob({
      _id: "",
      user: "",
      applicationDeadline: new Date(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: "",
      shortDescription: "",
      longDescription: "",
      experience: "",
      division: "",
      district: "",
      qualification: "",
      salary: null,
      jobRole: "",
      applicants: [],
      isBirthCertificateRequired: false,
      isPortEntryPermitRequired: false,
      status: "",
      __v: 0,
      applicationStatus: "PENDING"
    });
  };

  return (
    <div>
      <h2>Job Management</h2>
      <input
        type="text"
        placeholder="Job Title"
        value={newJob.title}
        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Job Description"
        value={newJob.shortDescription}
        onChange={(e) =>
          setNewJob({ ...newJob, shortDescription: e.target.value })
        }
      />
      <button onClick={handleAddJob}>Add Job</button>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            {job.title} - {job.shortDescription}
            <button onClick={() => updateJob(job._id, job)}>Edit</button>
            <button onClick={() => deleteJob(job._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
