import React from "react";

const CompanyAbout = ({ page }) => {
  return (
    <div className="company-about box-shadow">
      <div className="company-about-title">About</div>
      <div className="company-about-desc">
        <p>{page?.about || "No information available."}</p>
      </div>
    </div>
  );
};

export default CompanyAbout;
