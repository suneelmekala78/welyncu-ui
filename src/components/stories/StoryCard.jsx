import React from "react";

const StoryCard = ({ storyView, setStoryView }) => {
  return (
    <div
      className={
        storyView
          ? "story-view-section story-view-section-active"
          : "story-view-section"
      }
    >
      <i className="fa fa-xmark" onClick={() => setStoryView(false)}></i>
      <div className="story-view-card">
        <div className="story-view-card-top"></div>
        <div className="story-view-card-mid">
          <div className="media">
            <img src="./assets/images/robot.jpg" alt="story" />
          </div>
        </div>
        <div className="story-view-card-bottom">
          <div className="input-box">
            <input type="text" placeholder="Reply..." />
            <i className="fa-regular fa-paper-plane"></i>
          </div>
          <i className="fa fa-plus"></i>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
