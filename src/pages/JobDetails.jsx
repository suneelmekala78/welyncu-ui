import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../components/job-details/jobDetails.css";
import TopNav from "../components/topnav/TopNav";
import JobDetailsTop from "../components/job-details/JobDetailsTop";
import JobDetailsLeft from "../components/job-details/JobDetailsLeft";
import JobDetailsMid from "../components/job-details/JobDetailsMid";
import JobDetailsRight from "../components/job-details/JobDetailsRight";
import ApplyJob from "../components/apply-job/ApplyJob";
import { getJobApi } from "../helper/apis";

const JobDetails = () => {
  const { id } = useParams();
  const [apply, setApply] = useState(false);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await getJobApi(id);
      setJob(res?.data?.job || null);
    };
    if (id) fetchJob();
  }, [id]);

  if (!job) return <><TopNav /><div style={{padding: "40px", textAlign: "center"}}>Loading...</div></>;

  return (
    <>
      <TopNav />
      <div className="job-details-page">
        <JobDetailsTop job={job} setApply={setApply} />
        <div className="company-main-section">
          <div className="company-main-left">
            <JobDetailsLeft job={job} />
          </div>
          <div className="company-main-mid">
            <JobDetailsMid job={job} />
          </div>
          <div className="company-main-right">
            <JobDetailsRight />
          </div>
        </div>
      </div>

      <div className={apply ? "apply-job apply-job-active" : "apply-job"}>
        <ApplyJob job={job} setApply={setApply} />
      </div>
    </>
  );
};

export default JobDetails;
