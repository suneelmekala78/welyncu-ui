import React from "react";

const JobDetailsMain = ({ job }) => {
  return (
    <div className="job-details-main all-applicants-main">
      <div className="job-details-main-left">
        <div className="job-description box-shadow">
          <div className="job-description-title">Job Description</div>
          <div className="job-description-text">
            <p>{job?.description || "No description provided."}</p>
          </div>
        </div>

        {job?.screeningQuestions?.length > 0 && (
          <div className="job-description box-shadow">
            <div className="job-description-title">Questions for Applicant</div>
            <div className="job-description-text">
              {job.screeningQuestions.map((q, i) => (
                <div className="desc-question" key={i}>
                  {i + 1}) {q.question}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="job-details-main-right">
        <div className="company-overview job-details-overview-card box-shadow">
          <div className="company-overview-title">Job Details</div>
          <div className="company-overview-details">
            <div className="overview-details-item job-post-details-overview">
              <div className="overview-item-title">Experience</div>
              <div className="overview-item-value">{job?.experience || "Not specified"}</div>
            </div>
            <div className="overview-details-item job-post-details-overview">
              <div className="overview-item-title">Job Type</div>
              <div className="overview-item-value">{job?.jobType || "Not specified"}</div>
            </div>
            <div className="overview-details-item job-post-details-overview">
              <div className="overview-item-title">Employment Type</div>
              <div className="overview-item-value">{job?.employmentType || "Not specified"}</div>
            </div>
            <div className="overview-details-item job-post-details-overview">
              <div className="overview-item-title">Location</div>
              <div className="overview-item-value">{job?.location || "Not specified"}</div>
            </div>
            <div className="overview-details-item job-post-details-overview">
              <div className="overview-item-title">Salary Range</div>
              <div className="overview-item-value">{job?.salaryRange || "Not specified"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsMain;
