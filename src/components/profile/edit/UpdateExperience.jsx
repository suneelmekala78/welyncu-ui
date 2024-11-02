import React from "react";

const UpdateExperience = ({
  updateExperience,
  setUpdateExperience,
  editExperience,
  setEdit,
  handleExperienceDelete
}) => {

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setUpdateExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="popup-section popup-section-active">
        <div className="popup-container box-shadow p-15">
          <i className="fa fa-xmark" onClick={() => setEdit("")}></i>
          <div className="profile-top-details-edit-section">
            <div className="profile-top-details-edit-top">
              <div className="edit-top-title">Update Experience</div>
            </div>
            <div className="personal-inputs">
              <div className="personal-input">
                <label htmlFor="location">Role</label>
                <input
                  type="text"
                  id="location"
                  name="role"
                  value={updateExperience?.role}
                  onChange={handleExperienceChange}
                />
              </div>
              <div className="personal-input">
                <label htmlFor="location">Employement Type</label>
                <select
                  type="text"
                  id="location"
                  name="employementType"
                  value={updateExperience?.employementType}
                  onChange={handleExperienceChange}
                >
                  <option value="">Select one</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="personal-input">
                <label htmlFor="summery">Company</label>
                <input
                  type="text"
                  id="summery"
                  name="company"
                  value={updateExperience?.company}
                  onChange={handleExperienceChange}
                />
              </div>
              <div className="personal-input">
                <label htmlFor="summery">Location</label>
                <input
                  type="text"
                  id="summery"
                  name="location"
                  value={updateExperience?.location}
                  onChange={handleExperienceChange}
                />
              </div>
              <div className="personal-input">
                <label htmlFor="summery">Location Type</label>
                <select
                  type="text"
                  id="summery"
                  name="locationType"
                  value={updateExperience?.locationType}
                  onChange={handleExperienceChange}
                >
                  <option value="">Select One</option>
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div className="personal-flex-inputs">
                <div className="personal-input">
                  <label htmlFor="fdate">Start Date</label>
                  <input
                    type="date"
                    id="fdate"
                    name="startDate"
                    value={updateExperience?.startDate}
                    onChange={handleExperienceChange}
                  />
                </div>
                <div className="personal-input">
                  <label htmlFor="todate">End Date</label>
                  <input
                    type="date"
                    id="todate"
                    name="endDate"
                    value={updateExperience?.endDate}
                    onChange={handleExperienceChange}
                  />
                </div>
              </div>
              <div className="personal-input">
                <label htmlFor="summery">Description</label>
                <textarea
                  type="text"
                  id="summery"
                  name="description"
                  value={updateExperience?.description}
                  onChange={handleExperienceChange}
                />
              </div>
              <p className="auth-rmember-pass">
                <input type="checkbox" name="" id="" /> I am currently working
                on this role
              </p>
            </div>
          </div>
          <div className="profile-top-details-edit-bottom">
            <div className="profile-top-details-edit-bottom-left">
              <i
                className="fa fa-trash cp"
                style={{ color: "red" }}
                onClick={handleExperienceDelete}
              ></i>
            </div>
            <div className="profile-top-details-edit-bottom-right">
              <div className="save-btn btn-background" onClick={editExperience}>
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateExperience;
