import React from "react";
import CompaniesCard from "./CompaniesCard";
import FriendsCard from "../profile/FriendsCard";
import PremiumCard from "../home/PremiumCard";

const CompanyRight = () => {
  return (
    <div className="company-right-section">
      <div className="job-alert-btn">
        <i className="fa fa-suitcase"></i> Post Job
      </div>
      <CompaniesCard />
      <FriendsCard />
      <PremiumCard />
    </div>
  );
};

export default CompanyRight;
