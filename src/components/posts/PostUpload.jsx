import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "../../helper/apis";

const PostUpload = ({ setStartPost }) => {
  const [caption, setCaption] = useState("");
  const [style, setStyle] = useState("square-style");
  const [stylePop, setStylePop] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);
  };

  // Remove a specific file
  const removeFile = (index) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Preview function for rendering media files
  const renderPreview = (file, index) => {
    const fileURL = URL.createObjectURL(file);

    if (file.type.startsWith("image/")) {
      return (
        <div key={index} className="preview-file square-post">
          <img className={style} src={fileURL} alt="preview-img" />
          <i className="fa fa-xmark" onClick={() => removeFile(index)}></i>
        </div>
      );
    }

    if (file.type.startsWith("video/")) {
      return (
        <div key={index} className="preview-file square-post">
          <video className={style} controls>
            <source src={fileURL} />
            Your browser does not support the video tag.
          </video>
          <i className="fa fa-xmark" onClick={() => removeFile(index)}></i>
        </div>
      );
    }

    return null; 
  };

  // Handle post submission
  const handlePost = async () => {
    if (!caption || caption === "") {
      toast.error("Please write something..!");
      return;
    }

    setIsSaving(true); // Optional: Create a loading state if needed
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("style", style); // Replace with actual style if applicable
    // formData.append("userId", user?._id); // Add user ID if necessary

    // Append each media file to the FormData
    mediaFiles.forEach((file) => {
      formData.append("mediaFiles", file); // Make sure your backend handles multiple file uploads correctly
    });

    try {
      const res = await apiRequest({
        url: "/posts/create-post", // Change to your actual endpoint for creating posts
        data: formData,
        method: "POST",
      });

      if (res?.status === "success") {
        // Handle successful post creation, such as resetting states
        setCaption(""); // Reset caption
        setMediaFiles([]); // Clear the selected files
        setStartPost(false); // Close the upload popup
        toast.success(res?.message); // Display success message
      } else {
        toast.error(res?.message); // Display error message from server
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while posting!");
    } finally {
      setIsSaving(false); // Reset saving state
    }
  };

  return (
    <div className="popup-section popup-section-active">
      <div className="popup-container box-shadow p-15 post-upload-box">
        <i className="fa fa-xmark" onClick={() => setStartPost(false)}></i>
        <div className="profile-top-details-edit-section">
          <div className="profile-top-details-edit-top">
            <div className="edit-top-title">Upload Post</div>
          </div>
          <textarea
            className="about-text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Start here..."
          ></textarea>
        </div>

        <div className="preview-files">
          {mediaFiles.map((file, index) => renderPreview(file, index))}
        </div>

        <div className="upload-post-icons">
          <input
            type="file"
            multiple
            accept="image/*,video/*,audio/*,application/pdf"
            onChange={handleFileChange}
            style={{ display: "none" }} // Hide the input
            id="file-upload" // Link to label
          />
          {mediaFiles?.length > 0 && (
            <div className="style-select">
              {stylePop && (
                <div className="style-select-items">
                  <span
                    style={
                      style === "square-style" ? { color: "var(--blue)" } : {}
                    }
                    onClick={() => setStyle("square-style")}
                  >
                    {" "}
                    1:1
                  </span>
                  <span
                    style={
                      style === "vertical-style" ? { color: "var(--blue)" } : {}
                    }
                    onClick={() => setStyle("vertical-style")}
                  >
                    4:5
                  </span>
                  <span
                    style={
                      style === "horizontal-style"
                        ? { color: "var(--blue)" }
                        : {}
                    }
                    onClick={() => setStyle("horizontal-style")}
                  >
                    16:9
                  </span>
                </div>
              )}
              <i
                className="fa-regular fa-square"
                onClick={() => setStylePop(!stylePop)}
              ></i>
            </div>
          )}
          <label htmlFor="file-upload" className="upload-post-icon">
            <i className="fa fa-image"></i>
          </label>
          <label htmlFor="file-upload" className="upload-post-icon">
            <i className="fa fa-video"></i>
          </label>
          <label htmlFor="file-upload" className="upload-post-icon">
            <i className="fa fa-file"></i>
          </label>
          <label htmlFor="file-upload" className="upload-post-icon">
            <i className="fa-solid fa-square-poll-vertical"></i>
          </label>
        </div>

        <div className="profile-top-details-edit-bottom">
          <div className="profile-top-details-edit-bottom-left"></div>
          <div className="profile-top-details-edit-bottom-right">
            <span className="save-btn btn-background" onClick={handlePost}>
              {isSaving ? "Posting..." : "Post"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUpload;
