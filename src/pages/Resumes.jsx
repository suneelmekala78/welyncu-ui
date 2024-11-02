import React from "react";
import "../components/resume/resume.css";
import TopNav from "../components/topnav/TopNav";

const Resumes = () => {
  return (
    <>
      <TopNav />
      <div className="resumes-page">
        <div className="resumes-top">
          <h1 className="resumes-title">My Resumes</h1>
          <div className="resumes-text">
            Start creating your resume to your next job role.
          </div>
        </div>
        <div className="all-resumes">
          <div className="add-resume-box">
            <i className="fa fa-plus"></i>
          </div>

          <div className="resume-box" style={{backgroundColor:"blueviolet"}}>
            <div className="resume-box-top">
                <img src="https://marketplace.canva.com/EAFYHVf4VeM/1/0/1131w/canva-professional-cv-resume-yrjTFOhxzP8.jpg" alt="resume" />
            </div>
            <div className="resume-box-bottom">
              <div className="resume-box-bottom-left">Fullstack Developer Resume</div>
              <div className="resume-box-bottom-right">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
          </div>

          <div className="resume-box" style={{backgroundColor:"deeppink"}}>
            <div className="resume-box-top">
                <img src="https://techguruplus.com/wp-content/uploads/2022/12/Resume-CV-Templates-Word-doc-013.jpg" alt="resume" />
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
    </>
  );
};

export default Resumes;
