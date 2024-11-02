import React from "react";

const PersonalDCard = () => {
  return (
    <>
      <div className="personal-details-card box-shadow">
        <div className="pdt"></div>
        <div className="personal-details-form p-15">
          <div className="personal-details-titles">
            <h2>Personal Details</h2>
            <p>Get started with the basic details.</p>
          </div>
          <div className="personal-inputs">
            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="fname">Full Name</label>
                <input type="text" id="fname" />
              </div>
              <div className="personal-input">
                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" />
              </div>
            </div>
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
            <div className="personal-input">
              <label htmlFor="job-title">Job Title</label>
              <input type="text" id="job-title" />
            </div>
            <div className="personal-input">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" />
            </div>
            <div className="resume-bottom-btns">
              <div className=""></div>
              <div className="resume-btn btn-background">Save</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDCard;
