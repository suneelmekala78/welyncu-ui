import React from "react";
import "../components/resume/resume.css";
import TopNav from "../components/topnav/TopNav";
import ResultResume from "../components/resume/ResultResume";
import EditingResume from "../components/resume/EditingResume";

const EditResume = () => {
  return (
    <>
      <TopNav />
      <div className="edit-resume-page">
        <div className="edit-resume-left">
          <EditingResume/>
        </div>
        <div className="edit-resume-right">
          <ResultResume/>
        </div>
      </div>
    </>
  );
};

export default EditResume;
