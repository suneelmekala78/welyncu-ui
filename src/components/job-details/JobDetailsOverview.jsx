import React from "react";

const JobDetailsOverview = () => {
  return (
    <div className="company-overview job-details-overview-card box-shadow">
      <div className="company-overview-title">Job Details</div>
      <div className="company-overview-details">
        <div className="overview-details-item">
          <div className="overview-item-title">Experience</div>
          <div className="overview-item-value">Fresher</div>
        </div>
        <div className="overview-details-item">
          <div className="overview-item-title">Job Type</div>
          <div className="overview-item-value">On Office</div>
        </div>
        <div className="overview-details-item">
          <div className="overview-item-title">Employment Type</div>
          <div className="overview-item-value">Full-time</div>
        </div>
        <div className="overview-details-item">
          <div className="overview-item-title">Location</div>
          <div className="overview-item-value">Google Pvt Ltd, Ashok Nagar, High Tech City, Hyderabad, Telangana, India</div>
        </div>
        <div className="overview-details-item">
          <div className="overview-item-title">Salary Range</div>
          <div className="overview-item-value">5LPA - 8LPA</div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsOverview;
