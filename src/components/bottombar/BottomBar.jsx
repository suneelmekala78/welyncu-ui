import React from "react";
import "./bottombar.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomBar = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const path = location.pathname;

  const tabs = [
    { to: "/", icon: "fa fa-home", label: "Home", match: "/" },
    { to: "/network", icon: "fa fa-users", label: "Network", match: "/network" },
    { to: "/jobs", icon: "fa fa-suitcase", label: "Jobs", match: "/jobs" },
    { to: "/chat", icon: "fa fa-message", label: "Chat", match: "/chat" },
    { to: "/notifications", icon: "fa fa-bell", label: "Alerts", match: "/notifications" },
  ];

  return (
    <div className="bottombar">
      {tabs.map((tab) => (
        <Link
          key={tab.to}
          to={tab.to}
          className={`bottombar-tab ${path === tab.match ? "bottombar-active" : ""}`}
        >
          <i className={tab.icon}></i>
          <span>{tab.label}</span>
        </Link>
      ))}
      <Link
        to={`/profile/${user?._id}`}
        className={`bottombar-tab ${path.startsWith("/profile") ? "bottombar-active" : ""}`}
      >
        <img
          src={user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"}
          alt="me"
          className="bottombar-avatar"
        />
        <span>Profile</span>
      </Link>
    </div>
  );
};

export default BottomBar;
