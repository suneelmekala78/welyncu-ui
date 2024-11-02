import React from "react";

const JobDetailsTop = ({ apply, setApply }) => {
  return (
    <div className="company-profile-top-section box-shadow">
      <div className="company-top-banner">
        <img
          src="https://www.wework.com/ideas/wp-content/uploads/sites/4/2017/06/Collab1.jpg"
          alt="banner-img"
        />
      </div>
      <div className="company-top-details">
        <div className="company-details-left">
          <div className="company-profile-name">UI/UX Designer</div>
          <div className="job-details-top">
            <span className="job-details-top-company-name">Google</span>
            <span className="job-details-top-location">
              <i className="fa fa-location-dot"></i>Melbourne, AU
            </span>
            <span className="job-details-top-posted-time">
              Posted 5 days ago
            </span>
          </div>
        </div>
        <div className="company-details-right job-details-right">
          <div className="job-details-top-btn company-profile-topbtn company-website-btn">
            Save
          </div>
          <div
            className="job-details-top-btn company-profile-topbtn company-follow-btn btn-background"
            onClick={() => setApply(true)}
          >
            Apply
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsTop;
