import React from "react";

const ApplicationQuestions = () => {
  return (
    <div className="apply-job-application-questions">
      <div className="personal-inputs">
        <div className="personal-input">
          <label htmlFor="job-title">What's your notice period?</label>
          <input type="text" id="job-title" />
        </div>
        <div className="personal-input">
          <label htmlFor="address">How many years experience designing end-to-end applications architecture?</label>
          <input type="text" id="address" />
        </div>
        <div className="personal-input">
          <label htmlFor="address">How many years of hands-on Experience with Java or Node.Js?</label>
          <input type="text" id="address" />
        </div>
        <div className="personal-input">
          <label htmlFor="address">What's your current CTC?</label>
          <input type="text" id="address" />
        </div>
        <div className="resume-bottom-btns">
          <div className="resume-btn">Back</div>
          <div className="resume-btn btn-background">Send</div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationQuestions;
