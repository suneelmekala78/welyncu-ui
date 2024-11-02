import React from "react";

const JobDetailsMain = () => {
  return (
    <div className="job-details-main all-applicants-main">
      <div className="job-details-main-left">
        <div className="job-description box-shadow">
          <div className="job-description-title">Job Description</div>
          <div className="job-description-text">
            <p>
              About Us: SunTech Services IT Company is a leading technology
              solutions provider dedicated to delivering innovative and reliable
              IT services to our global clientele. Our dynamic and collaborative
              work environment fosters creativity and growth, enabling our team
              to excel and push the boundaries of technology.
            </p>
            <p>
              Position Overview: We are seeking a talented and passionate MERN
              Stack Developer to join our growing team. The ideal candidate will
              have a strong foundation in the MERN (MongoDB, Express.js,
              React.js, and Node.js) stack and a proven track record of building
              scalable web applications. As a MERN Stack Developer at SunTech
              Services, you will be responsible for designing, developing, and
              maintaining complex applications that meet the needs of our
              clients.
            </p>
          </div>
        </div>

        <div className="job-description box-shadow">
          <div className="job-description-title">Questions for Applicant</div>
          <div className="job-description-text">
            <div className="desc-question">
              1) How many years of experience do you have with React.js?
            </div>
            <div className="desc-question">
              2) How many years of experience do you have with Node.js?
            </div>
            <div className="desc-question">
              3) Did you completed your graduation?
            </div>
          </div>
        </div>
      </div>
      <div className="job-details-main-right">
        <div className="company-overview job-details-overview-card box-shadow">
          <div className="company-overview-title">Job Details</div>
          <div className="company-overview-details">
            <div className="overview-details-item job-post-details-overview">
              <div className="overview-item-title">Experience</div>
              <div className="overview-item-value">Fresher</div>
            </div>
            <div className="overview-details-item job-post-details-overview">
              <div className="overview-item-title">Job Type</div>
              <div className="overview-item-value">On Office</div>
            </div>
            <div className="overview-details-item job-post-details-overview">
              <div className="overview-item-title">Employment Type</div>
              <div className="overview-item-value">Full-time</div>
            </div>
            <div className="overview-details-item job-post-details-overview">
              <div className="overview-item-title">Location</div>
              <div className="overview-item-value">
                Google Pvt Ltd, Ashok Nagar, High Tech City, Hyderabad,
                Telangana, India
              </div>
            </div>
            <div className="overview-details-item job-post-details-overview">
              <div className="overview-item-title">Salary Range</div>
              <div className="overview-item-value">5LPA - 8LPA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsMain;
