import React from "react";

const JobPostDetails = () => {
  return (
    <div className="job-post-details-section box-shadow p-15">
      <div className="job-post-title">Post Job</div>
      <div className="job-post-details">
        <div className="job-post-details-title">Job Details :</div>
        <div className="job-post-details-container">
          <div className="personal-inputs">
            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="fname">Job title</label>
                <input type="text" id="fname" />
              </div>
              <div className="personal-input">
                <label htmlFor="lname">Company</label>
                <input type="text" id="lname" />
              </div>
            </div>
            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="email">Workplace type</label>
                <input type="text" id="email" />
              </div>
              <div className="personal-input">
                <label htmlFor="phone">Job type</label>
                <input type="text" id="phone" />
              </div>
            </div>
            <div className="personal-input">
              <label htmlFor="job-title">Job location</label>
              <input type="text" id="job-title" />
            </div>

            <div className="job-post-details-title">Description :</div>
            <div className="personal-input">
              {/* <label htmlFor="job-title">Job location</label> */}
              <input type="text" id="job-title" />
            </div>

            <div className="job-post-details-title">Skills :</div>
            <div className="job-post-details-skills">
                <div className="job-post-details-skill box-shadow">HTML <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">CSS <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">JavaScript <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">React <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">Node.js <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">Express <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">MongoDB <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">Python <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">C <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">Web development <i className="fa fa-xmark"></i></div>
            </div>

            <div className="job-post-details-title">How did you hear about WeLink jobs ?</div>
            <div className="personal-input">
              {/* <label htmlFor="job-title">Job location</label> */}
              <input type="text" id="job-title" />
            </div>

            <div className="resume-bottom-btns">
              <div className="resume-btn">Back</div>
              <div className="resume-btn btn-background">Next</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostDetails;
