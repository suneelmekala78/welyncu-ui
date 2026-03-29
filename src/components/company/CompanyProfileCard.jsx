import React from "react";

const CompanyProfileCard = ({ company, logo, page }) => {
  return (
    <div className="company-profile-card box-shadow">
      <div className="company-profile-pic">
        <img
          src={logo || page?.logo || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"}
          alt="company-profile-pic"
        />
      </div>
      <b className="company-title">{company || page?.name || "Company"}</b>
      <p className="company-headline">
        {page?.headline || ""}
      </p>
      <div className="company-profile-card-bottom">
        <div className="company-connections"><b>Followers</b> <b>{page?.followers?.length || 0}</b></div>
      </div>
    </div>
  );
};

export default CompanyProfileCard;
