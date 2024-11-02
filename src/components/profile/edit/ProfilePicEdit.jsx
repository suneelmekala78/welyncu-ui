import React, { useState, useEffect } from "react";
import { apiRequest } from "../../../helper/apis";
import { toast } from "react-toastify";

const ProfilePicEdit = ({ setEdit, user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Blob URL for preview
    }
  };

  // Cleanup blob URL on component unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // Clean up the blob URL
      }
    };
  }, [previewUrl]);

  // Save the file (Profile/Banner)
  const handleSave = async () => {
    if (!selectedFile) {
      toast.error("Please select a file before saving!");
      return;
    }

    setIsSaving(true);
    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const res = await apiRequest({
        url: "/user/add-profile-pic",
        data: formData,
        method: "POST",
      });

      if (res?.status === "success") {
        setPreviewUrl(res.profileUrl); // Set the new image from the server
        setEdit(""); // Close the popup
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="popup-section popup-section-active">
      <div className="popup-container box-shadow p-15">
        <i className="fa fa-xmark" onClick={() => setEdit("")}></i>
        <div className="profile-pic-edit-section">
          <div className="profile-pic-edit-top">
            <img
              src={previewUrl ? previewUrl : user?.profileUrl}
              alt="profile-pic"
            />
          </div>
          <div className="profile-pic-edit-bottom">
            <div className="profile-pic-edit-bottom-left">
              <label htmlFor="fileInput" className="profile-pic-edit-item">
                <i className="fa fa-image"></i> <span>Upload</span>
              </label>
              <input
                id="fileInput"
                name="profilePic"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div className="profile-pic-edit-item">
                <i className="fa fa-pen"></i> <span>Frame</span>
              </div>
              <div className="profile-pic-edit-item">
                <i className="fa fa-trash"></i>
              </div>
            </div>
            <div className="profile-pic-edit-bottom-right">
              <div
                className={`save-btn btn-background ${
                  isSaving ? "disabled" : ""
                }`}
                onClick={!isSaving ? handleSave : null}
              >
                {isSaving ? "Saving..." : "Save"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicEdit;
