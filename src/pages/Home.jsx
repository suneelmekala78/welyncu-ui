import React, { useEffect, useState } from "react";
import "../components/home/home.css";
import TopNav from "../components/topnav/TopNav";
import HomeLeft from "../components/home/HomeLeft";
import HomeMid from "../components/home/HomeMid";
import HomeRight from "../components/home/HomeRight";
import StoryCard from "../components/stories/StoryCard";
import { getLoggedinUser } from "../helper/apis";

const Home = () => {
  const [user, setUser] = useState({});
  const [storyView, setStoryView] = useState(false);

  const getUserData = async () => {
    const res = await getLoggedinUser();
    setUser(res);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <TopNav />
      <div className="home-page">
        <div className="home-left">
          <HomeLeft user={user} />
        </div>
        <div className="home-middle">
          <HomeMid user={user} setStoryView={setStoryView} />
        </div>
        <div className="home-right">
          <HomeRight />
        </div>
      </div>

      <StoryCard storyView={storyView} setStoryView={setStoryView} />
    </>
  );
};

export default Home;
