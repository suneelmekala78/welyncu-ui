import React from "react";

const JobDetailsDesc = ({ job }) => {
  return (
    <div className="job-description-card company-about box-shadow">
      <div className="company-about-title">Description</div>
      <div className="company-about-desc">
        <p>{job?.description || "No description provided."}</p>
        {job?.skills?.length > 0 && (
          <>
            <div className="company-about-title" style={{marginTop: "15px"}}>Skills</div>
            <div className="job-post-details-skills">
              {job.skills.map((skill, i) => (
                <div className="job-post-details-skill box-shadow" key={i}>{skill}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobDetailsDesc;
