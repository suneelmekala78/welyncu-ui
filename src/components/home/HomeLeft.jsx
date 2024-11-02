import React from "react";
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
    </div>
  );
};

export default HomeLeft;
