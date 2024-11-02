import React, { useState } from "react";

const ExperienceEdit = ({ setEdit, setUpdateExperience, user }) => {
  const handleClick = (index) => {
    const experience = user.experiences[index];
    setUpdateExperience((prev) => ({
      ...prev,
      index: index, // Store index of the experience being edited
      role: experience.role,
      company: experience.company,
      locationType: experience.locationType,
      location: experience.location,
      employmentType: experience.employmentType,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
    }));
    setEdit("edit-experience"); // Set the edit mode to update
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
        <i className="fa fa-plus" onClick={() => setEdit("add-experience")}></i>
        <div className="profile-top-details-edit-section">
          <div className="profile-top-details-edit-top">
            <div className="edit-top-title">Edit Experience</div>
          </div>
          {user?.experiences?.length > 0 &&
            user?.experiences.map((exp, index) => (
              <div
                className="profile-education edit-education card-details"
                key={index}
                onClick={() => handleClick(index)}
              >
                <div className="profile-education-top">
                  <div className="profile-education-top-left">
                    <b className="collage-name">{exp?.role}</b>
                    <span className="education-title">{exp?.company}</span>
                    <span className="from-to">
                      {exp?.startDate} TO {exp?.endDate} (2 year)
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
                    : exp?.description
                        .split("\n")
                        .slice(0, maxLines)
                        .join("\n")}
                  {isTextLong(exp?.description) && (
                    <span className="see-more-btn cp" onClick={handleToggle}>
                      {isExpanded ? "...see less" : "...see more"}
                    </span>
                  )}
                </pre>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceEdit;
