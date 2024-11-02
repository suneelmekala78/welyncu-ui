import React, { useState } from "react";

const EducationEdit = ({ setEdit, setUpdateEducation, user }) => {
  const handleClick = (index) => {
    const education = user.educations[index];
    setUpdateEducation((prev) => ({
      ...prev,
      index: index, // Store index of the education being edited
      study: education.study,
      degree: education.degree,
      grade: education.grade,
      collage: education.collage,
      location: education.location,
      startDate: education.startDate,
      endDate: education.endDate,
      description: education.description,
    }));
    setEdit("edit-education"); // Set the edit mode to update
  };

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
    <div className="popup-section popup-section-active">
      <div className="popup-container box-shadow p-15">
        <i className="fa fa-xmark" onClick={() => setEdit("")}></i>
        <i className="fa fa-plus" onClick={() => setEdit("add-education")}></i>
        <div className="profile-top-details-edit-section">
          <div className="profile-top-details-edit-top">
            <div className="edit-top-title">Edit Education</div>
          </div>
          {user?.educations?.length > 0 &&
            user?.educations.map((edu, index) => (
              <div
                className="profile-education card-details cp"
                key={index}
                onClick={() => handleClick(index)}
              >
                <div className="profile-education-top">
                  <div className="profile-education-top-left">
                    <b className="collage-name">{edu?.study}</b>
                    <span className="education-title">{edu?.collage}</span>
                    <span className="from-to">
                      {edu?.startDate} TO {edu?.endDate} (2 year)
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
                  {isExpanded || !isTextLong(edu?.description)
                    ? edu?.description || "" // Fallback to empty string
                    : edu?.description
                        .split("\n")
                        .slice(0, maxLines)
                        .join("\n")}
                  {isTextLong(edu?.description) && (
                    <span className="see-more-btn cp" onClick={handleToggle}>
                      {isExpanded ? "...see less" : "...see more"}
                    </span>
                  )}
                </pre>
              </div>
            ))}
        </div>
        <div className="profile-top-details-edit-bottom">
          <div className="profile-top-details-edit-bottom-left"></div>
          <div className="profile-top-details-edit-bottom-right">
            <div className="save-btn btn-background">Save</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationEdit;
