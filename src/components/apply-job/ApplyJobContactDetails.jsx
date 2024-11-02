import React from "react";

const ApplyJobContactDetails = () => {
  return (
    <div className="apply-job-contact-section">
      <div className="apply-job-contact-section-top">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
          alt="profile-pic"
        />
        <div className="details">
          <div className="user-name">Suneel Mekala</div>
          <div className="role">
            Full Stack Developer | Content Writer | Social Media Manager
          </div>
          <div className="location">SPSR Nellore, Andhra Pradesh</div>
        </div>
      </div>

      <div className="personal-inputs">
        <div className="personal-flex-inputs">
          <div className="personal-input">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" />
          </div>
          <div className="personal-input">
            <label htmlFor="phone">Phone No.</label>
            <input type="text" id="phone" />
          </div>
        </div>

        <div className="apply-job-resumes">
          <div className="apply-job-resumes-title">Select Resume</div>
          <div className="apply-job-all-resumes">
            <div
              className="resume-box"
              style={{ backgroundColor: "blueviolet" }}
            >
              <div className="resume-box-top">
                <img
                  src="https://marketplace.canva.com/EAFYHVf4VeM/1/0/1131w/canva-professional-cv-resume-yrjTFOhxzP8.jpg"
                  alt="resume"
                />
              </div>
              <div className="resume-box-bottom">
                <div className="resume-box-bottom-left">
                  Fullstack Developer Resume
                </div>
                <div className="resume-box-bottom-right">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
              </div>
            </div>

            <div className="resume-box" style={{ backgroundColor: "deeppink" }}>
              <div className="resume-box-top">
                <img
                  src="https://techguruplus.com/wp-content/uploads/2022/12/Resume-CV-Templates-Word-doc-013.jpg"
                  alt="resume"
                />
              </div>
              <div className="resume-box-bottom">
                <div className="resume-box-bottom-left">My first resume</div>
                <div className="resume-box-bottom-right">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="resume-bottom-btns">
          <div className="resume-btn">Back</div>
          <div className="resume-btn btn-background">Next</div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobContactDetails;
