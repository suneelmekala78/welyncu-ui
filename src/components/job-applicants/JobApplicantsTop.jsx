import React from "react";

const JobApplicantsTop = () => {
  return (
    <div className="job-applicants-top-section">
      <div className="job-applicants-top-left">
        <div className="job-applicants-top-left-img">
          <img
            src="https://i.pinimg.com/736x/83/c9/41/83c94112d672a379a30f5f9bb6a5e948--symbols.jpg"
            alt="company-img"
          />
        </div>
        <div className="job-applicants-top-left-details">
          <h2 className="job-role">Full Stack Developer</h2>
          <b>Spotify Pvt Ltd</b>
          <div className="job-applicants-top-left-all-details">
            <span>
              <i className="fa fa-location-dot"></i> On Site
            </span>
            <span>
              <i className="fa fa-suitcase"></i> Full time
            </span>
            <span>
              <i className="fa fa-users"></i> 15 applications
            </span>
          </div>
          <span className="posted-time"><i className="fa fa-clock"></i> Posted 5 days ago</span>
        </div>
      </div>
      <div className="job-applicants-top-right">
        <div className="job-applicants-top-right-btns">
          <span>
            <i className="fa fa-ellipsis"></i>
          </span>
          <span className="view-btn">View Details</span>
        </div>
      </div>
    </div>
  );
};

export default JobApplicantsTop;
