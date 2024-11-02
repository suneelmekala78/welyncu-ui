import React from "react";
import ProfileViewsCard from "./ProfileViewsCard";
import FriendsCard from "./FriendsCard";
import PremiumCard from "../home/PremiumCard";

const ProfileRight = () => {
  return (
    <div className="user-profile-right-section">
      <div className="profile-right-card">
        <ProfileViewsCard />
      </div>
      <div className="profile-right-card">
        <FriendsCard />
      </div>
      <div className="profile-right-card">
        <PremiumCard />
      </div>
    </div>
  );
};

export default ProfileRight;
