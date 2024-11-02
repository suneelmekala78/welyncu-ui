import React from "react";
import FriendsCard from "../profile/FriendsCard";
import PremiumCard from "./PremiumCard";

const HomeRight = () => {
  return (
    <div className="home-right-section">
      <FriendsCard />
      <PremiumCard />
    </div>
  );
};

export default HomeRight;
