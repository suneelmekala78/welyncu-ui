import React from "react";
import NetworkCard from "../network/NetworkCard";

const ProfileNetwork = () => {
  return (
    <div className="all-jobs-section box-shadow mt-10">
      <div className="all-jobs-search-input">
        <input type="text" placeholder="Search people, jobs & more..." />
        <i className="fa fa-search"></i>
      </div>
      <br />
      <div className="all-jobs-grid">
        <NetworkCard />
        <NetworkCard />
        <NetworkCard />
        <NetworkCard />
        <NetworkCard />
        <NetworkCard />
      </div>
    </div>
  );
};

export default ProfileNetwork;
