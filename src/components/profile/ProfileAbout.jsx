import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProfileAbout = ({ setEdit, user }) => {
  const { userId } = useSelector((state) => state.user);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLines = 3;

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  // Helper function to determine if the text is more than the max lines
  const isTextLong = (text) => {
    if (!text) return false; // Ensure text is not undefined
    const lines = text.split("\n");
    return lines.length > maxLines;
  };

  return (
    <div className="profile-about-card box-shadow">
      <div className="card-title">
        <span>About</span>
        {user?._id === userId && (
          <i
            className="fa fa-pen-to-square"
            onClick={() => setEdit("about")}
          ></i>
        )}
      </div>
      <div className="profile-about-text card-details">
        <pre className="custom-pre  see-more">
          {isExpanded || !isTextLong(user?.about)
            ? user?.about
            : user?.about.split("\n").slice(0, maxLines).join("\n")}
        {isTextLong(user?.about) && (
          <span className="cp see-more-btn" onClick={handleToggle}>
            {isExpanded ? "...see less" : "...see more"}
          </span>
        )}
        </pre>
      </div>
    </div>
  );
};

export default ProfileAbout;
