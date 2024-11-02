import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProfileExperience = ({ setEdit, user }) => {
  const { userId } = useSelector((state) => state.user);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLines = 2;

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
    <>
      {user?.experiences?.length > 0 && (
        <div className="profile-education-card box-shadow">
          <div className="card-title">
            <span>Experience</span>
            {user?._id === userId && (
              <i
                className="fa fa-pen-to-square"
                onClick={() => setEdit("experience")}
              ></i>
            )}
            {user?._id === userId && (
              <i
                className="fa fa-plus"
                onClick={() => setEdit("add-experience")}
              ></i>
            )}
          </div>
          {user?.experiences.map((exp, index) => (
            <div className="profile-education card-details" key={index}>
              <div className="profile-education-top">
                <div className="profile-education-top-left">
                  <b className="collage-name">{exp?.role}</b>
                  <span className="education-title">{exp?.company}</span>
                  <span className="from-to">
                    {exp?.startDate} TO {exp?.endDate || "Present"} (2 year)
                  </span>
                </div>
                <div className="profile-education-top-right">
                  <img
                    src="https://i.insider.com/60ef3e6461b8600019f171e6"
                    alt="collage-logo"
                  />
                </div>
              </div>
              <pre className="profile-education-desc custom-pre see-more">
                {isExpanded || !isTextLong(exp?.description)
                  ? exp?.description || "" // Fallback to empty string
                  : exp?.description.split("\n").slice(0, maxLines).join("\n")}
                {isTextLong(exp?.description) && (
                  <span className="see-more-btn cp" onClick={handleToggle}>
                    {isExpanded ? "...see less" : "...see more"}
                  </span>
                )}
              </pre>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileExperience;
