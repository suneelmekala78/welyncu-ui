import React from "react";
import { Link } from "react-router-dom";

const ProfileViewsCard = () => {

  return (
    <div className="friends-card-section box-shadow">
      <div className="friends-card-title">Quick Links</div>
      <div className="friends-card-all-friends" style={{ padding: "5px 15px" }}>
        <Link to="/resumes" style={{ textDecoration: "none", display: "flex", alignItems: "center", padding: "8px 0", gap: "8px" }}>
          <i className="fa fa-file-lines" style={{ color: "var(--blue)" }}></i>
          <span style={{ fontSize: "13px" }}>My Resumes</span>
        </Link>
        <Link to="/create-page" style={{ textDecoration: "none", display: "flex", alignItems: "center", padding: "8px 0", gap: "8px" }}>
          <i className="fa fa-building" style={{ color: "var(--blue)" }}></i>
          <span style={{ fontSize: "13px" }}>Create a Page</span>
        </Link>
        <Link to="/post-job" style={{ textDecoration: "none", display: "flex", alignItems: "center", padding: "8px 0", gap: "8px" }}>
          <i className="fa fa-suitcase" style={{ color: "var(--blue)" }}></i>
          <span style={{ fontSize: "13px" }}>Post a Job</span>
        </Link>
        <Link to="/games" style={{ textDecoration: "none", display: "flex", alignItems: "center", padding: "8px 0", gap: "8px" }}>
          <i className="fa fa-gamepad" style={{ color: "var(--blue)" }}></i>
          <span style={{ fontSize: "13px" }}>Games</span>
        </Link>
        <Link to="/startups" style={{ textDecoration: "none", display: "flex", alignItems: "center", padding: "8px 0", gap: "8px" }}>
          <i className="fa fa-rocket" style={{ color: "var(--blue)" }}></i>
          <span style={{ fontSize: "13px" }}>Startup Showcase</span>
        </Link>
      </div>
    </div>
  );
};

export default ProfileViewsCard;