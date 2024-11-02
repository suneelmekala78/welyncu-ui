import React from "react";
import PostJobCard from "../jobs/PostJobCard";
import CompanyProfileCard from "./CompanyProfileCard";

const CompanyLeft = () => {
  return (
    <div className="company-left-section">
      <CompanyProfileCard />
      <PostJobCard />
    </div>
  );
};

export default CompanyLeft;
