import React, { useState, useEffect } from "react";
import '../components/jobs/jobs.css';
import TopNav from "../components/topnav/TopNav";
import JobsLeft from "../components/jobs/JobsLeft";
import JobsMid from "../components/jobs/JobsMid";
import JobsRight from "../components/jobs/JobsRight";
import { getJobsApi, getMyJobsApi } from "../helper/apis";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("jobs");
  const [filters, setFilters] = useState({ experience: "", employmentType: "", jobType: "" });

  const fetchJobs = async () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (filters.experience) params.append("experience", filters.experience);
    if (filters.employmentType) params.append("employmentType", filters.employmentType);
    if (filters.jobType) params.append("jobType", filters.jobType);

    const res = await getJobsApi(params.toString());
    setJobs(res?.data?.jobs || []);
  };

  const fetchMyJobs = async () => {
    const res = await getMyJobsApi();
    setJobs(res?.data?.jobs || []);
  };

  useEffect(() => {
    if (tab === "jobs") fetchJobs();
    else fetchMyJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const onSearch = () => {
    if (tab === "jobs") fetchJobs();
  };

  const onApply = () => {
    if (tab === "jobs") fetchJobs();
  };

  return (
    <>
      <TopNav />
      <div className="jobs-page">
        <div className="jobs-left">
          <JobsLeft filters={filters} setFilters={setFilters} onApply={onApply} />
        </div>
        <div className="jobs-middle">
          <JobsMid jobs={jobs} search={search} setSearch={setSearch} onSearch={onSearch} tab={tab} setTab={setTab} />
        </div>
        <div className="jobs-right">
          <JobsRight />
        </div>
      </div>
    </>
  );
};

export default Jobs;
