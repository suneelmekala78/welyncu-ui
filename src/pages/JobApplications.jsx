import React, { useState } from "react";
import "../components/job-applicants/jobApplicants.css";
import TopNav from "../components/topnav/TopNav";
import JobApplicantsTop from "../components/job-applicants/JobApplicantsTop";
import JobApplicantsMain from "../components/job-applicants/JobApplicantsMain";
import JobDetailsMain from "../components/job-applicants/JobDetailsMain";

const JobApplications = () => {
  const [view, setView] = useState(false);
  return (
    <>
      <TopNav />
      <div className="job-applicants-page">
        <div className="job-applicants-top">
          <JobApplicantsTop view={view} setView={setView} />
        </div>
        <div className="job-applicants-main">
          {view ? <JobApplicantsMain /> : <JobDetailsMain />}
        </div>
      </div>
    </>
  );
};

export default JobApplications;
