import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProfileEducation = ({ setEdit, user }) => {
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
      {user?.educations?.length > 0 && (
        <div className="profile-education-card box-shadow">
          <div className="card-title">
            <span>Education</span>
            {user?._id === userId && (
              <i
                className="fa fa-pen-to-square"
                onClick={() => setEdit("education")}
              ></i>
            )}
            {user?._id === userId && (
              <i
                className="fa fa-plus"
                onClick={() => setEdit("add-education")}
              ></i>
            )}
          </div>
          {user?.educations.map((edu, index) => (
            <div className="profile-education card-details" key={index}>
              <div className="profile-education-top">
                <div className="profile-education-top-left">
                  <b className="collage-name">{edu?.study}</b>
                  <span className="education-title">{edu?.collage}</span>
                  <span className="from-to">
                    {edu?.startDate} TO {edu?.endDate || "Present"} (1 year)
                  </span>
                </div>
                <div className="profile-education-top-right">
                  <img
                    src="https://th.bing.com/th/id/OIP.seykcWQyEaijh-qMYsqt7gHaHh?rs=1&pid=ImgDetMain"
                    alt="collage-logo"
                  />
                </div>
              </div>
              <pre className="profile-education-desc custom-pre see-more">
                {isExpanded || !isTextLong(edu?.description)
                  ? edu?.description || "" // Fallback to empty string
                  : edu?.description.split("\n").slice(0, maxLines).join("\n")}
                {isTextLong(edu?.description) && (
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

export default ProfileEducation;
