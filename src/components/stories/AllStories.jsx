import React, { useEffect, useState } from "react";
import "./stories.css";
import { useSelector, useDispatch } from "react-redux";
import { getStoryFeed } from "../../helper/apis";
import StoryCreate from "./StoryCreate";

const AllStories = ({ setStoryView, setActiveStoryGroup }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [storyFeed, setStoryFeed] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  const fetchStories = async () => {
    try {
      const res = await getStoryFeed(dispatch);
      if (res?.status === "success") {
        setStoryFeed(res.feed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleStoryClick = (group) => {
    if (setActiveStoryGroup) setActiveStoryGroup(group);
    setStoryView(true);
  };

  return (
    <>
      <div className="all-stories-section">
        {/* Add Story card */}
        <div
          className="my-story-feild story-card box-shadow"
          onClick={() => setShowCreate(true)}
        >
          <img src={user?.profileUrl} alt="profile-img" />
          <div className="my-story-card-texts">
            <div className="my-story-card-plus">
              <i className="fa fa-plus"></i>
            </div>
            <span>Add Story</span>
          </div>
        </div>

        {/* Story feed from API */}
        {storyFeed.map((group) => (
          <div
            key={group.user._id}
            className="other-story-feild story-card box-shadow"
            style={{
              backgroundColor:
                group.stories[0]?.backgroundColor || "var(--blue)",
            }}
            onClick={() => handleStoryClick(group)}
          >
            <img
              src={
                group.stories[0]?.mediaUrl || group.user.profileUrl
              }
              alt="profile-img"
              style={{
                opacity: group.stories[0]?.mediaUrl ? 0.4 : 0.3,
              }}
            />
            {!group.stories[0]?.mediaUrl && group.stories[0]?.text && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "10px",
                  color: "white",
                  textAlign: "center",
                  width: "80%",
                  zIndex: 1,
                }}
              >
                {group.stories[0].text.substring(0, 40)}
                {group.stories[0].text.length > 40 ? "..." : ""}
              </div>
            )}
            <div className="other-story-texts">
              <b className="user-name">{group.user.fullName}</b>
            </div>
          </div>
        ))}
      </div>

      {showCreate && (
        <StoryCreate
          onClose={() => setShowCreate(false)}
          onCreated={fetchStories}
        />
      )}
    </>
  );
};

export default AllStories;
