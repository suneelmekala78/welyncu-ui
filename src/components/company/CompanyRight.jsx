import React from "react";
import { useNavigate } from "react-router-dom";
import CompaniesCard from "./CompaniesCard";
import FriendsCard from "../profile/FriendsCard";
import PremiumCard from "../home/PremiumCard";

const CompanyRight = () => {
  const navigate = useNavigate();

  return (
    <div className="company-right-section">
      <div className="job-alert-btn" onClick={() => navigate("/post-job")} style={{cursor: "pointer"}}>
        <i className="fa fa-suitcase"></i> Post Job
      </div>
      <CompaniesCard />
      <FriendsCard />
      <PremiumCard />
    </div>
  );
};

export default CompanyRight;
