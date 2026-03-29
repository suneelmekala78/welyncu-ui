import React from "react";

const JobDetailsTop = ({ job, setApply }) => {
  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

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
          <div className="company-profile-name">{job?.title}</div>
          <div className="job-details-top">
            <span className="job-details-top-company-name">{job?.company}</span>
            <span className="job-details-top-location">
              <i className="fa fa-location-dot"></i>{job?.location}
            </span>
            <span className="job-details-top-posted-time">
              Posted {timeAgo(job?.createdAt)}
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
