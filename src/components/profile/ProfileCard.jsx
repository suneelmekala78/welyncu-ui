import React from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({user}) => {

  return (
    <div className="profile-card-section">
      <div className="profile-imgs">
        <img
          src={
            user?.profileUrl ||
            "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
          }
          alt="pic"
        />
      </div>
      <div className="profile-titles">
        <h3 className="profile-name">{user?.fullName}</h3>
        <span className="profile-title">{user?.headline}</span>
      </div>
      <div className="profile-following-feild">
        <div className="profile-followers">
          <span className="num">{user?.followers?.length}</span>{" "}
          <span>Followers</span>
        </div>
        <div className="profile-following">
          <span className="num">{user?.followings?.length}</span>{" "}
          <span>Following</span>
        </div>
      </div>
      <p>
        <Link to={`/profile/${user?._id}`} className="link">
          View Profile
        </Link>
      </p>
    </div>
  );
};

export default ProfileCard;
