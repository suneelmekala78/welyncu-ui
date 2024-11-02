import React from "react";
import ProfileAbout from "./ProfileAbout";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileSkills from "./ProfileSkills";

const ProfileAboutField = ({ setEdit, user, getUserData }) => {
  return (
    <div className="profile-section-about-details">
      <div className="profile-about">
        <ProfileAbout  user={user} setEdit={setEdit} />
      </div>
      <div className="profile-experience">
        <ProfileExperience  user={user} setEdit={setEdit} />
      </div>
      <div className="profile-education">
        <ProfileEducation  user={user} setEdit={setEdit} />
      </div>
      <div className="profile-skills">
        <ProfileSkills getUserData={getUserData}  user={user} setEdit={setEdit}/>
      </div>
      <div className="profile-reviews"></div>
    </div>
  );
};

export default ProfileAboutField;
