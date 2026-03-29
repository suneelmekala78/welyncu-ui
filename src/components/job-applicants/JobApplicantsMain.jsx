import React from "react";

const JobApplicantsMain = ({ applications, selectedApp, setSelectedApp, statusFilter, setStatusFilter, onStatusUpdate }) => {
  const timeAgo = (date) => {
    if (!date) return "";
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  const current = selectedApp || applications?.[0];

  return (
    <div className="all-applicants-main">
      <div className="all-applicants">
        <ul className="all-jobs-filters all-applicants-main-filters box-shadow">
          <li className={statusFilter === "all" ? "active" : ""} onClick={() => setStatusFilter("all")}>All</li>
          <li className={statusFilter === "shortlisted" ? "active" : ""} onClick={() => setStatusFilter("shortlisted")}>Shortlisted</li>
          <li className={statusFilter === "rejected" ? "active" : ""} onClick={() => setStatusFilter("rejected")}>Rejected</li>
        </ul>
        <div className="all-users box-shadow">
          <h4 className="applications-count">{applications?.length || 0} Applications</h4>
          {applications?.map((app) => (
            <div className="applicant" key={app._id} onClick={() => setSelectedApp(app)} style={{cursor: "pointer", background: current?._id === app._id ? "#f0f0f0" : ""}}>
              <div className="applicant-left">
                <img
                  src={app.applicant?.profileUrl || "https://via.placeholder.com/40"}
                  alt="user-pic"
                />
                <div className="applicant-details">
                  <div className="user-name">{app.applicant?.fullName}</div>
                  <div className="user-role">{app.applicant?.headline || ""}</div>
                  <div className="applied">{timeAgo(app.appliedAt)}</div>
                </div>
              </div>
              <div className="applicant-right">
                <span style={{fontSize: "12px", color: app.status === "shortlisted" ? "green" : app.status === "rejected" ? "red" : "#666"}}>{app.status}</span>
              </div>
            </div>
          ))}
          {applications?.length === 0 && <p style={{padding: "15px", color: "#666"}}>No applications</p>}
        </div>
      </div>
      {current && (
        <div className="application-details box-shadow">
          <div className="application-top">
            <div className="application-top-left">
              <div className="applicant-details">
                <div className="user-name">{current.applicant?.fullName}'s application</div>
                <div className="user-role">{current.applicant?.headline || ""}</div>
                <div className="applied">Applied {timeAgo(current.appliedAt)}</div>
              </div>
            </div>
            <div className="application-top-right">
              <div style={{display: "flex", gap: "8px"}}>
                <div className="resume-btn btn-background" style={{fontSize: "12px", cursor: "pointer"}} onClick={() => onStatusUpdate(current._id, "shortlisted")}>Shortlist</div>
                <div className="resume-btn" style={{fontSize: "12px", cursor: "pointer", color: "red"}} onClick={() => onStatusUpdate(current._id, "rejected")}>Reject</div>
              </div>
            </div>
          </div>
          {current.answers?.length > 0 && (
            <div className="application-questions-answers">
              <div className="questions-title">Question & Answers</div>
              {current.answers.map((qa, i) => (
                <div className="question-box" key={i}>
                  <div className="question">{i + 1}) {qa.question}</div>
                  <div className="answer">A) {qa.answer}</div>
                </div>
              ))}
            </div>
          )}
          <div className="applied-resume">
            <span className="resume-title">Contact: {current.email} | {current.phone}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicantsMain;
