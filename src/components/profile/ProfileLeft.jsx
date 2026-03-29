import React from "react";
import ProfileDetailsList from "./ProfileDetailsList";
import ProfilePages from "./ProfilePages";
import ProfileReviews from "./ProfileReviews";
import ProfilePosts from "./ProfilePosts";
import ProfileNetwork from "./ProfileNetwork";
import ProfileCourses from "./ProfileCourses";
import ProfileAboutField from "./ProfileAboutField";

const ProfileLeft = ({ profileSection, setProfileSection, setEdit, user, getUserData }) => {
  return (
    <div className="user-profile-left-section">
      <div className="profile-details-list">
        <ProfileDetailsList
          profileSection={profileSection}
          setProfileSection={setProfileSection}
        />
      </div>

      {profileSection === "about" && <ProfileAboutField getUserData={getUserData}  user={user} setEdit={setEdit} />}
      {profileSection === "posts" && <ProfilePosts  user={user} />}
      {profileSection === "network" && <ProfileNetwork  user={user} />}
      {profileSection === "courses" && <ProfileCourses  user={user} />}
      {profileSection === "pages" && <ProfilePages  user={user} />}
      {profileSection === "reviews" && <ProfileReviews  user={user} getUserData={getUserData} />}
    </div>
  );
};

export default ProfileLeft;
