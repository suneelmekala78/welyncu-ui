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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStoryClick = (group) => {
    if (setActiveStoryGroup) setActiveStoryGroup(group);
    setStoryView(true);
  };

  // Check if current user has any unviewed stories in a group
  const hasUnviewed = (group) => {
    return group.stories.some(
      (s) => !s.viewers?.some((v) => v.user === user?._id || v.user?._id === user?._id)
    );
  };

  return (
    <>
      <div className="all-stories-section">
        {/* Add Story card */}
        <div className="story-ring-wrapper" onClick={() => setShowCreate(true)}>
          <div className="my-story-feild story-card box-shadow">
            <img src={user?.profileUrl} alt="profile-img" />
            <div className="my-story-card-texts">
              <div className="my-story-card-plus">
                <i className="fa fa-plus"></i>
              </div>
              <span>Add Story</span>
            </div>
          </div>
        </div>

        {/* Story feed from API */}
        {storyFeed.map((group) => {
          const unviewed = hasUnviewed(group);
          return (
            <div
              key={group.user._id}
              className="story-ring-wrapper"
              onClick={() => handleStoryClick(group)}
            >
              <div
                className={`other-story-feild story-card box-shadow ${unviewed ? "story-unviewed" : "story-viewed"}`}
                style={{
                  backgroundColor:
                    group.stories[0]?.backgroundColor || "var(--blue)",
                }}
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
                  <div className="story-card-text-overlay">
                    {group.stories[0].text.substring(0, 40)}
                    {group.stories[0].text.length > 40 ? "..." : ""}
                  </div>
                )}
                {group.stories[0]?.poll && (
                  <div className="story-card-text-overlay">
                    <i className="fa fa-chart-bar" style={{ marginRight: 5 }}></i>
                    Poll
                  </div>
                )}
                <div className="other-story-texts">
                  <div className="story-avatar-ring">
                    <img src={group.user.profileUrl} alt="avatar" />
                  </div>
                  <b className="user-name">{group.user.fullName?.split(" ")[0]}</b>
                </div>
                {group.stories.length > 1 && (
                  <div className="story-count-badge">{group.stories.length}</div>
                )}
              </div>
            </div>
          );
        })}
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
