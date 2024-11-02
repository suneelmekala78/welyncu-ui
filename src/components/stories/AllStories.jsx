import React from "react";
import "./stories.css";
import { useSelector } from "react-redux";

const AllStories = ({ setStoryView }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="all-stories-section">
      <div
        className="my-story-feild story-card box-shadow"
        onClick={() => setStoryView(true)}
      >
        <img
          src={user?.profileUrl}
          alt="profile-img"
        />
        <div className="my-story-card-texts">
          <div className="my-story-card-plus">
            <i className="fa fa-plus"></i>
          </div>
          <span>Add Story</span>
        </div>
      </div>

      <div
        className="other-story-feild story-card box-shadow"
        style={{ backgroundColor: "pink" }}
      >
        <img
          src="https://th.bing.com/th/id/OIP.v4jnFo4zLY294cxM-IX9TQHaHa?w=640&h=640&rs=1&pid=ImgDetMain"
          alt="profile-img"
        />
        <div className="other-story-texts">
          <b className="user-name">Emilli Williams</b>
        </div>
      </div>

      <div
        className="other-story-feild story-card box-shadow"
        style={{ backgroundColor: "grey" }}
      >
        <img
          src="https://pbs.twimg.com/media/FsVvph-XsAEX6x6.jpg"
          alt="profile-img"
        />
        <div className="other-story-texts">
          <b className="user-name">Rajiv Williams</b>
        </div>
      </div>
      <div
        className="other-story-feild story-card box-shadow"
        style={{ backgroundColor: "pink" }}
      >
        <img
          src="https://th.bing.com/th/id/OIP.v4jnFo4zLY294cxM-IX9TQHaHa?w=640&h=640&rs=1&pid=ImgDetMain"
          alt="profile-img"
        />
        <div className="other-story-texts">
          <b className="user-name">Emilli Williams</b>
        </div>
      </div>

      <div
        className="other-story-feild story-card box-shadow"
        style={{ backgroundColor: "grey" }}
      >
        <img
          src="https://pbs.twimg.com/media/FsVvph-XsAEX6x6.jpg"
          alt="profile-img"
        />
        <div className="other-story-texts">
          <b className="user-name">Rajiv Williams</b>
        </div>
      </div>
      <div
        className="other-story-feild story-card box-shadow"
        style={{ backgroundColor: "pink" }}
      >
        <img
          src="https://th.bing.com/th/id/OIP.v4jnFo4zLY294cxM-IX9TQHaHa?w=640&h=640&rs=1&pid=ImgDetMain"
          alt="profile-img"
        />
        <div className="other-story-texts">
          <b className="user-name">Emilli Williams</b>
        </div>
      </div>

      <div
        className="other-story-feild story-card box-shadow"
        style={{ backgroundColor: "grey" }}
      >
        <img
          src="https://pbs.twimg.com/media/FsVvph-XsAEX6x6.jpg"
          alt="profile-img"
        />
        <div className="other-story-texts">
          <b className="user-name">Rajiv Williams</b>
        </div>
      </div>
    </div>
  );
};

export default AllStories;
