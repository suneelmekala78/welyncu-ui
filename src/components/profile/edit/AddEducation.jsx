import React, { useState } from "react";

const AddEducation = ({
  setEdit,
  addEducation,
  setAddEducation,
  submitEducation,
}) => {
  const [present, setPresent] = useState(false);
  // Generic handler for input change
  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setAddEducation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="popup-section popup-section-active">
      <div className="popup-container box-shadow p-15">
        <i className="fa fa-xmark" onClick={() => setEdit("")}></i>
        <div className="profile-top-details-edit-section">
          <div className="profile-top-details-edit-top">
            <div className="edit-top-title">Add Education</div>
          </div>
          <div className="personal-inputs">
            <div className="personal-input">
              <label htmlFor="location">Study</label>
              <input
                type="text"
                id="location"
                name="study"
                value={addEducation?.study}
                onChange={handleExperienceChange}
              />
            </div>
            <div className="personal-input">
              <label htmlFor="location">Degree</label>
              <input
                type="text"
                id="location"
                name="degree"
                value={addEducation?.degree}
                onChange={handleExperienceChange}
              />
            </div>
            <div className="personal-input">
              <label htmlFor="location">Grade</label>
              <input
                type="text"
                id="location"
                name="grade"
                value={addEducation?.grade}
                onChange={handleExperienceChange}
              />
            </div>

            <div className="personal-input">
              <label htmlFor="summery">Collage</label>
              <input
                type="text"
                id="summery"
                name="collage"
                value={addEducation?.collage}
                onChange={handleExperienceChange}
              />
            </div>
            <div className="personal-input">
              <label htmlFor="summery">Location</label>
              <input
                type="text"
                id="summery"
                name="location"
                value={addEducation?.location}
                onChange={handleExperienceChange}
              />
            </div>

            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="fdate">Start Date</label>
                <input
                  type="date"
                  id="fdate"
                  name="startDate"
                  value={addEducation?.startDate}
                  onChange={handleExperienceChange}
                />
              </div>
              {!present && (
                <div className="personal-input">
                  <label htmlFor="todate">End Date</label>
                  <input
                    type="date"
                    id="todate"
                    name="endDate"
                    value={addEducation?.endDate}
                    onChange={handleExperienceChange}
                  />
                </div>
              )}
            </div>
            <div className="personal-input">
              <label htmlFor="summery">Description</label>
              <textarea
                type="text"
                id="summery"
                name="description"
                value={addEducation?.description}
                onChange={handleExperienceChange}
              />
            </div>
            <p className="auth-rmember-pass">
              <input
                type="checkbox"
                name=""
                id=""
                onClick={() => setPresent(!present)}
              />{" "}
              I am currently working on this role
            </p>

            {/* <div className="resume-bottom-btns">
              <div className="experience-bottom-btns">
                <div className="exp-btn">
                  <i className="fa fa-plus"></i>
                </div>
                <div className="exp-btn">
                  <i className="fa fa-trash"></i>
                </div>
              </div>
              <div></div>
            </div> */}
          </div>
        </div>
        <div className="profile-top-details-edit-bottom">
          <div className="profile-top-details-edit-bottom-left"></div>
          <div className="profile-top-details-edit-bottom-right">
            <div className="save-btn btn-background" onClick={submitEducation}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEducation;
