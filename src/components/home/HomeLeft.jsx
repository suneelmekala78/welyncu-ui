import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../profile/ProfileCard";
import HomeUserPages from "./HomeUserPages";

const HomeLeft = ({user}) => {
  return (
    <div className="home-left-section">
      <div className="home-left-profile box-shadow">
        <ProfileCard user={user} />
      </div>
      <div className="home-left-pages box-shadow mt-10 mb-10">
        <HomeUserPages />
      </div>
      <div className="friends-card-section box-shadow">
        <Link to="/resumes" className="network-details-item" style={{textDecoration: "none", display: "flex", alignItems: "center", padding: "12px 15px", cursor: "pointer"}}>
          <i className="fa fa-file-lines" style={{marginRight: "8px"}}></i> My Resumes
        </Link>
        <Link to="/post-job" className="network-details-item" style={{textDecoration: "none", display: "flex", alignItems: "center", padding: "12px 15px", cursor: "pointer"}}>
          <i className="fa fa-suitcase" style={{marginRight: "8px"}}></i> Post a Job
        </Link>
        <Link to="/startups" className="network-details-item" style={{textDecoration: "none", display: "flex", alignItems: "center", padding: "12px 15px", cursor: "pointer"}}>
          <i className="fa fa-rocket" style={{marginRight: "8px"}}></i> Startups
        </Link>
      </div>
    </div>
  );
};

export default HomeLeft;
