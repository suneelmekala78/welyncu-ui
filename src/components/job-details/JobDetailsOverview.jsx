import React from "react";

const JobDetailsOverview = ({ job }) => {
  return (
    <div className="company-overview job-details-overview-card box-shadow">
      <div className="company-overview-title">Job Details</div>
      <div className="company-overview-details">
        <div className="overview-details-item">
          <div className="overview-item-title">Experience</div>
          <div className="overview-item-value">{job?.experience || "Not specified"}</div>
        </div>
        <div className="overview-details-item">
          <div className="overview-item-title">Job Type</div>
          <div className="overview-item-value">{job?.jobType || "Not specified"}</div>
        </div>
        <div className="overview-details-item">
          <div className="overview-item-title">Employment Type</div>
          <div className="overview-item-value">{job?.employmentType || "Not specified"}</div>
        </div>
        <div className="overview-details-item">
          <div className="overview-item-title">Location</div>
          <div className="overview-item-value">{job?.location || "Not specified"}</div>
        </div>
        <div className="overview-details-item">
          <div className="overview-item-title">Salary Range</div>
          <div className="overview-item-value">{job?.salaryRange || "Not specified"}</div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsOverview;
