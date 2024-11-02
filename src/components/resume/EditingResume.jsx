import React from "react";
import PersonalDCard from "./PersonalDCard";

const EditingResume = () => {
  return (
    <div className="editing-resume-section">
      <div className="editing-resume-top">
        <div className="editing-resume-top-left">
          <div className="editing-resume-theme resume-btn">
            <i className="fa fa-droplet"></i> Theme
          </div>
        </div>
        <div className="editing-resume-top-left">
          <div className="editing-resume-top-btns">
            <div className="editing-resume-top-btn pre-btn resume-btn">
              <i className="fa fa-arrow-left"></i> Prev
            </div>
            <div className="editing-resume-top-btn nxt-btn btn-background resume-btn">
              Next <i className="fa fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="editing-resume-card-section">
        <PersonalDCard />
      </div>
    </div>
  );
};

export default EditingResume;
