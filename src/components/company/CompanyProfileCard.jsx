import React from "react";

const CompanyProfileCard = () => {
  return (
    <div className="company-profile-card box-shadow">
      <div className="company-profile-pic">
        <img
          src="https://www.androidpolice.com/wp-content/uploads/2019/12/google-logo-hd.png"
          alt="company-profile-pic"
        />
      </div>
      <b className="company-title">Tagline</b>
      <p className="company-headline">
        Google’s mission is to organize the world‘s information and make it
        universally accessible and useful.
      </p>
      <div className="company-profile-card-bottom">
        <div className="company-connections"><b>Followers</b> <b>3,500</b></div>
        <div className="company-connections"><b>All Employees</b> <b>1,23,620</b></div>
      </div>
    </div>
  );
};

export default CompanyProfileCard;
