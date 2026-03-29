import React from "react";

const JobApplicantsTop = ({ job, view, setView }) => {
  const timeAgo = (date) => {
    if (!date) return "";
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  return (
    <div className="job-applicants-top-section">
      <div className="job-applicants-top-left">
        <div className="job-applicants-top-left-img">
          <img
            src={job?.companyLogo || "https://i.pinimg.com/736x/83/c9/41/83c94112d672a379a30f5f9bb6a5e948--symbols.jpg"}
            alt="company-img"
          />
        </div>
        <div className="job-applicants-top-left-details">
          <h2 className="job-role">{job?.title}</h2>
          <b>{job?.company}</b>
          <div className="job-applicants-top-left-all-details">
            <span>
              <i className="fa fa-location-dot"></i> {job?.jobType}
            </span>
            <span>
              <i className="fa fa-suitcase"></i> {job?.employmentType}
            </span>
            <span>
              <i className="fa fa-users"></i> {job?.applications?.length || 0} applications
            </span>
          </div>
          <span className="posted-time"><i className="fa fa-clock"></i> Posted {timeAgo(job?.createdAt)}</span>
        </div>
      </div>
      <div className="job-applicants-top-right">
        <div className="job-applicants-top-right-btns">
          <span>
            <i className="fa fa-ellipsis"></i>
          </span>
          <span className="view-btn" onClick={() => setView(!view)}>{view ? "View Applicants" : "View Details"}</span>
        </div>
      </div>
    </div>
  );
};

export default JobApplicantsTop;
