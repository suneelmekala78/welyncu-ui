import React, { useState } from "react";
import "../components/job-details/jobDetails.css";
import TopNav from "../components/topnav/TopNav";
import JobDetailsTop from "../components/job-details/JobDetailsTop";
import JobDetailsLeft from "../components/job-details/JobDetailsLeft";
import JobDetailsMid from "../components/job-details/JobDetailsMid";
import JobDetailsRight from "../components/job-details/JobDetailsRight";
import ApplyJob from "../components/apply-job/ApplyJob";

const JobDetails = () => {
  const [apply, setApply] = useState(false);

  return (
    <>
      <TopNav />
      <div className="job-details-page">
        <JobDetailsTop setApply={setApply} />
        <div className="company-main-section">
          <div className="company-main-left">
            <JobDetailsLeft />
          </div>
          <div className="company-main-mid">
            <JobDetailsMid />
          </div>
          <div className="company-main-right">
            <JobDetailsRight />
          </div>
        </div>
      </div>

      <div className={apply ? "apply-job apply-job-active" : "apply-job"}>
        <ApplyJob setApply={setApply} />
      </div>
    </>
  );
};

export default JobDetails;
