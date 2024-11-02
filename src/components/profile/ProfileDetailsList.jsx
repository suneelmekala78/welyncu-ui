import React from "react";

const ProfileDetailsList = ({ profileSection, setProfileSection }) => {
  return (
    <div className="company-mid-top box-shadow">
      <div
        className={
          profileSection === "about"
            ? "company-top-list-item active"
            : "company-top-list-item"
        }
        onClick={() => setProfileSection("about")}
      >
        About
      </div>
      <div
        className={
          profileSection === "posts"
            ? "company-top-list-item active"
            : "company-top-list-item"
        }
        onClick={() => setProfileSection("posts")}
      >
        Posts
      </div>
      <div
        className={
          profileSection === "network"
            ? "company-top-list-item active"
            : "company-top-list-item"
        }
        onClick={() => setProfileSection("network")}
      >
        Network
      </div>
      <div
        className={
          profileSection === "courses"
            ? "company-top-list-item active"
            : "company-top-list-item"
        }
        onClick={() => setProfileSection("courses")}
      >
        Courses
      </div>
      <div
        className={
          profileSection === "pages"
            ? "company-top-list-item active"
            : "company-top-list-item"
        }
        onClick={() => setProfileSection("pages")}
      >
        Pages
      </div>
      <div
        className={
          profileSection === "reviews"
            ? "company-top-list-item active"
            : "company-top-list-item"
        }
        onClick={() => setProfileSection("reviews")}
      >
        Reviews
      </div>
    </div>
  );
};

export default ProfileDetailsList;
