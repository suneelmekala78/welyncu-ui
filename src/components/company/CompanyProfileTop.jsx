import React from "react";

const CompanyProfileTop = () => {
  return (
    <div className="company-profile-top-section box-shadow">
      <div className="company-top-banner">
        <img
          src="https://www.wework.com/ideas/wp-content/uploads/sites/4/2017/06/Collab1.jpg"
          alt="banner-img"
        />
      </div>
      <div className="company-top-details">
        <div className="company-details-left">
          <div className="company-profile-name">
            WeLink Pvt Ltd <i className="fa-regular fa-check-circle"></i>
          </div>
          <div className="company-profile-title">
            We connect same mindset people
          </div>
        </div>
        <div className="company-details-right">
          <div className="company-profile-topbtn company-website-btn">
            <i className="fa-solid fa-arrow-up-right-from-square"></i> Visit
            Website
          </div>
          <div className="company-profile-topbtn company-follow-btn btn-background">
            <i className="fa fa-plus"></i> Follow
          </div>
          <div className="company-profile-topbtn company-website-btn more-btn">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileTop;
