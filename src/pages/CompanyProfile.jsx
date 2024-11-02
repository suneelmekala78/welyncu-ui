import React from "react";
import '../components/company/company.css'
import TopNav from "../components/topnav/TopNav";
import CompanyProfileTop from "../components/company/CompanyProfileTop";
import CompanyMain from "../components/company/CompanyMain";

const CompanyProfile = () => {
  return (
    <>
      <TopNav />
      <div className="company-profile-page">
        <div className="company-profile-top">
            <CompanyProfileTop />
        </div>
        <div className="company-profile-main">
            <CompanyMain/>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
