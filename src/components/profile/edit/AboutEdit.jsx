import React from "react";

const AboutEdit = ({ setEdit, about, setAbout, handleAboutSubmit }) => {

  return (
    <div className="popup-section popup-section-active">
      <div className="popup-container box-shadow p-15">
        <i className="fa fa-xmark" onClick={() => setEdit("")}></i>
        <div className="profile-top-details-edit-section">
          <div className="profile-top-details-edit-top">
            <div className="edit-top-title">Edit About</div>
          </div>
          <textarea
            className="about-text"
            name=""
            id=""
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>
        <div className="profile-top-details-edit-bottom">
          <div className="profile-top-details-edit-bottom-left"></div>
          <div className="profile-top-details-edit-bottom-right">
            <div className="save-btn btn-background" onClick={handleAboutSubmit}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEdit;
