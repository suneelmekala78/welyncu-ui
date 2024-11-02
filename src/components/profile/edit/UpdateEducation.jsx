import React from 'react'

const UpdateEducation = ({editEducation, updateEducation, setUpdateEducation, setEdit, handleEducationDelete}) => {

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setUpdateEducation((prev) => ({
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
              <div className="edit-top-title">Update Education</div>
            </div>
            <div className="personal-inputs">
              <div className="personal-input">
                <label htmlFor="location">Study</label>
                <input
                  type="text"
                  id="location"
                  name="study"
                  value={updateEducation?.study}
                  onChange={handleEducationChange}
                />
              </div>
              <div className="personal-input">
                <label htmlFor="location">Degree</label>
                <input
                  type="text"
                  id="location"
                  name="degree"
                  value={updateEducation?.degree}
                  onChange={handleEducationChange}
                />
              </div>
              <div className="personal-input">
                <label htmlFor="location">Grade</label>
                <input
                  type="text"
                  id="location"
                  name="grade"
                  value={updateEducation?.grade}
                  onChange={handleEducationChange}
                />
              </div>
              
              <div className="personal-input">
                <label htmlFor="summery">Collage</label>
                <input
                  type="text"
                  id="summery"
                  name="collage"
                  value={updateEducation?.collage}
                  onChange={handleEducationChange}
                />
              </div>
              <div className="personal-input">
                <label htmlFor="summery">Location</label>
                <input
                  type="text"
                  id="summery"
                  name="location"
                  value={updateEducation?.location}
                  onChange={handleEducationChange}
                />
              </div>
              <div className="personal-flex-inputs">
                <div className="personal-input">
                  <label htmlFor="fdate">Start Date</label>
                  <input
                    type="date"
                    id="fdate"
                    name="startDate"
                    value={updateEducation?.startDate}
                    onChange={handleEducationChange}
                  />
                </div>
                <div className="personal-input">
                  <label htmlFor="todate">End Date</label>
                  <input
                    type="date"
                    id="todate"
                    name="endDate"
                    value={updateEducation?.endDate}
                    onChange={handleEducationChange}
                  />
                </div>
              </div>
              <div className="personal-input">
                <label htmlFor="summery">Description</label>
                <textarea
                  type="text"
                  id="summery"
                  name="description"
                  value={updateEducation?.description}
                  onChange={handleEducationChange}
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
                onClick={handleEducationDelete}
              ></i>
            </div>
            <div className="profile-top-details-edit-bottom-right">
              <div className="save-btn btn-background" onClick={editEducation}>
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateEducation