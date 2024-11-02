import React from "react";
import "./applyJob.css";
import ApplyJobContactDetails from "./ApplyJobContactDetails";
// import ApplicationQuestions from "./ApplicationQuestions";

const ApplyJob = ({ setApply }) => {
  return (
    <>
      <div className="apply-job-section">
        <div className="apply-job-container box-shadow p-15">
          <div className="apply-job-title">
            Apply for Full Stack Developer role{" "}
            <i className="fa fa-xmark" onClick={() => setApply(false)}></i>
          </div>
          <ApplyJobContactDetails />
          {/* <ApplicationQuestions/> */}
        </div>
      </div>
    </>
  );
};

export default ApplyJob;
