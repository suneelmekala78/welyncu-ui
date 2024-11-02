import React from "react";
import JobCard from "../jobs/JobCard";

const SimilarJobs = () => {
  return (
    <div className="similar-jobs-card box-shadow">
      <div className="similar-jobs-title">Similar Jobs</div>
      <div className="all-similar-jobs">
        <div className="similar-job">
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
    </div>
  );
};

export default SimilarJobs;
