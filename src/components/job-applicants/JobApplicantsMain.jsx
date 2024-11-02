import React from "react";

const JobApplicantsMain = () => {
  return (
    <div className="all-applicants-main">
      <div className="all-applicants">
        <ul className="all-jobs-filters all-applicants-main-filters box-shadow">
          <li className="active">All</li>
          <li className="">Shortlisted</li>
          <li className="">Rejected</li>
        </ul>
        <div className="all-users box-shadow">
          <h4 className="applications-count">3 Applications</h4>
          <div className="applicant">
            <div className="applicant-left">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
                alt="user-pic"
              />
              <div className="applicant-details">
                <div className="user-name">Suneel Mekala</div>
                <div className="user-role">
                  Full Stack Developer | Content Creator | Writer
                </div>
                <div className="applied">3 days ago</div>
              </div>
            </div>
            <div className="applicant-right"></div>
          </div>
          <div className="applicant">
            <div className="applicant-left">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
                alt="user-pic"
              />
              <div className="applicant-details">
                <div className="user-name">Suneel Mekala</div>
                <div className="user-role">
                  Full Stack Developer | Content Creator | Writer
                </div>
                <div className="applied">3 days ago</div>
              </div>
            </div>
            <div className="applicant-right"></div>
          </div>
          <div className="applicant">
            <div className="applicant-left">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
                alt="user-pic"
              />
              <div className="applicant-details">
                <div className="user-name">Suneel Mekala</div>
                <div className="user-role">
                  Full Stack Developer | Content Creator | Writer
                </div>
                <div className="applied">3 days ago</div>
              </div>
            </div>
            <div className="applicant-right"></div>
          </div>
        </div>
      </div>
      <div className="application-details box-shadow">
        <div className="application-top">
          <div className="application-top-left">
            <div className="applicant-details">
              <div className="user-name">Suneel Mekala's application</div>
              <div className="user-role">
                Full Stack Developer | Content Creator | Writer
              </div>
              <div className="applied">Applied 3 days ago</div>
            </div>
          </div>
          <div className="application-top-right">
            <i className="fa fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div className="application-questions-answers">
          <div className="questions-title">Question & Answers</div>
          <div className="question-box">
            <div className="question">
              1) How many years of experience do you have with React.js?
            </div>
            <div className="answer">A) 2</div>
          </div>
          <div className="question-box">
            <div className="question">
              2) How many years of experience do you have with Node.js?
            </div>
            <div className="answer">A) 2</div>
          </div>
          <div className="question-box">
            <div className="question">
              3) Did you completed your graduation?
            </div>
            <div className="answer">A) Yes</div>
          </div>
        </div>
        <div className="applied-resume">
          <span className="resume-title">Resume</span>
          <span className="resume-btn">
            <i className="fa-solid fa-download"></i> Download
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobApplicantsMain;
