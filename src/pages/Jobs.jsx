import React from "react";
import '../components/jobs/jobs.css';
import TopNav from "../components/topnav/TopNav";
import JobsLeft from "../components/jobs/JobsLeft";
import JobsMid from "../components/jobs/JobsMid";
import JobsRight from "../components/jobs/JobsRight";

const Jobs = () => {
  return (
    <>
      <TopNav />
      <div className="jobs-page">
        <div className="jobs-left">
          <JobsLeft />
        </div>
        <div className="jobs-middle">
            <JobsMid/>
        </div>
        <div className="jobs-right">
          <JobsRight/>
        </div>
      </div>
    </>
  );
};

export default Jobs;
