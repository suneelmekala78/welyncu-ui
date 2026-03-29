import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../components/job-applicants/jobApplicants.css";
import TopNav from "../components/topnav/TopNav";
import JobApplicantsTop from "../components/job-applicants/JobApplicantsTop";
import JobApplicantsMain from "../components/job-applicants/JobApplicantsMain";
import JobDetailsMain from "../components/job-applicants/JobDetailsMain";
import { getJobApi, getJobApplicationsApi, updateApplicationStatusApi } from "../helper/apis";
import { toast } from "react-toastify";

const JobApplications = () => {
  const { id } = useParams();
  const [view, setView] = useState(false);
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const jobRes = await getJobApi(id);
      setJob(jobRes?.data?.job || null);
      const appRes = await getJobApplicationsApi(id);
      setApplications(appRes?.data?.applications || []);
    };
    if (id) fetchData();
  }, [id]);

  const handleStatusUpdate = async (appId, status) => {
    const res = await updateApplicationStatusApi(id, appId, status);
    if (res?.data?.status === "success") {
      toast.success(`Application ${status}`);
      setApplications((prev) =>
        prev.map((a) => a._id === appId ? { ...a, status } : a)
      );
    }
  };

  const filtered = statusFilter === "all"
    ? applications
    : applications.filter((a) => a.status === statusFilter);

  return (
    <>
      <TopNav />
      <div className="job-applicants-page">
        <div className="job-applicants-top">
          <JobApplicantsTop job={job} view={view} setView={setView} />
        </div>
        <div className="job-applicants-main">
          {view ? (
            <JobApplicantsMain
              applications={filtered}
              selectedApp={selectedApp}
              setSelectedApp={setSelectedApp}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onStatusUpdate={handleStatusUpdate}
            />
          ) : (
            <JobDetailsMain job={job} />
          )}
        </div>
      </div>
    </>
  );
};

export default JobApplications;
