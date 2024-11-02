import React, { useState } from "react";
import { apiRequest } from "../../../helper/apis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileTopDetailsEdit = ({ setEdit, getUserData, user }) => {
  const { userId } = useSelector((state) => state.user);
  // Set initial state using user details
  const [profileDetails, setProfileDetails] = useState({
    fullName: user?.fullName || "",
    headline: user?.headline || "",
    industry: user?.industry || "",
    country: user?.country || "",
    city: user?.city || "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  // Save changes (you can replace this with actual logic to update user details)
  const handleSave = async () => {
    try {
      const res = await apiRequest({
        url: "/user/edit-details",
        data: { ...profileDetails, userId },
        method: "PUT",
      });

      if (res?.status === "success") {
        toast.success(res?.message);
        setEdit("");
        getUserData();
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
        toast.info(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popup-section popup-section-active">
      <div className="popup-container box-shadow p-15">
        <i className="fa fa-xmark" onClick={() => setEdit("")}></i>
        <div className="profile-top-details-edit-section">
          <div className="profile-top-details-edit-top">
            <div className="edit-top-title">Edit Intro</div>
          </div>
          <div className="profile-top-details-edit-mid">
            <div className="personal-input">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={profileDetails.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="personal-input">
              <label htmlFor="headline">Headline</label>
              <input
                type="text"
                id="headline"
                value={profileDetails.headline}
                onChange={handleInputChange}
              />
            </div>
            <div className="personal-input">
              <label htmlFor="industry">Industry</label>
              <input
                type="text"
                id="industry"
                value={profileDetails.industry}
                onChange={handleInputChange}
              />
            </div>
            <div className="personal-input">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                value={profileDetails.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="personal-input">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={profileDetails.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="profile-links-flex">
              <div
                className="profile-link link"
                onClick={() => setEdit("add-experience")}
              >
                <i className="fa fa-plus"></i> Add Experience
              </div>
              <div
                className="profile-link link"
                onClick={() => setEdit("add-education")}
              >
                <i className="fa fa-plus"></i> Add Education
              </div>
            </div>
          </div>
          <div className="profile-top-details-edit-bottom">
            <div className="profile-top-details-edit-bottom-left"></div>
            <div className="profile-top-details-edit-bottom-right">
              <div className="save-btn btn-background" onClick={handleSave}>
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTopDetailsEdit;
