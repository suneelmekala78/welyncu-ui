import React from "react";
import PostJobCard from "../jobs/PostJobCard";
import CompanyProfileCard from "./CompanyProfileCard";

const CompanyLeft = ({ page }) => {
  return (
    <div className="company-left-section">
      <CompanyProfileCard page={page} />
      <PostJobCard />
    </div>
  );
};

export default CompanyLeft;
