import React from "react";
import '../components/job-applicants/jobApplicants.css'
import TopNav from "../components/topnav/TopNav";
import JobApplicantsTop from "../components/job-applicants/JobApplicantsTop";
// import JobApplicantsMain from "../components/job-applicants/JobApplicantsMain";
import JobDetailsMain from "../components/job-applicants/JobDetailsMain";

const JobApplications = () => {
  return (
    <>
      <TopNav />
      <div className="job-applicants-page">
        <div className="job-applicants-top">
            <JobApplicantsTop/>
        </div>
        <div className="job-applicants-main">
            {/* <JobApplicantsMain/> */}
            <JobDetailsMain/>
        </div>
      </div>
    </>
  );
};

export default JobApplications;
