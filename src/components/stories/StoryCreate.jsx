import React, { useRef, useState } from "react";
import { createStory } from "../../helper/apis";
import { toast } from "react-toastify";

const BACKGROUND_COLORS = [
  "#0a66c2",
  "#e74c3c",
  "#2ecc71",
  "#9b59b6",
  "#f39c12",
  "#1abc9c",
  "#e91e63",
  "#34495e",
  "#00bcd4",
  "#ff5722",
];

const StoryCreate = ({ onClose, onCreated }) => {
  const [mode, setMode] = useState("image"); // "image" or "text"
  const [text, setText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#0a66c2");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (mode === "image" && !selectedFile) {
      toast.error("Please select an image");
      return;
    }
    if (mode === "text" && !text.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (mode === "image" && selectedFile) {
        formData.append("media", selectedFile);
      }
      if (mode === "text") {
        formData.append("text", text);
        formData.append("backgroundColor", backgroundColor);
      }

      const res = await createStory(formData);
      if (res?.status === "success") {
        toast.success("Story created!");
        if (onCreated) onCreated();
        onClose();
      } else {
        toast.error(res?.message || "Failed to create story");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating story");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="story-create-overlay" onClick={onClose}>
      <div className="story-create-modal" onClick={(e) => e.stopPropagation()}>
        <div className="story-create-header">
          <h3>Create Story</h3>
          <i className="fa fa-xmark" onClick={onClose}></i>
        </div>

        <div className="story-create-tabs">
          <div
            className={`story-tab ${mode === "image" ? "active" : ""}`}
            onClick={() => setMode("image")}
          >
            <i className="fa fa-image"></i> Photo
          </div>
          <div
            className={`story-tab ${mode === "text" ? "active" : ""}`}
            onClick={() => setMode("text")}
          >
            <i className="fa fa-font"></i> Text
          </div>
        </div>

        <div className="story-create-body">
          {mode === "image" ? (
            <div className="story-image-upload">
              {preview ? (
                <div className="story-preview">
                  <img src={preview} alt="preview" />
                  <div
                    className="story-preview-remove"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                    }}
                  >
                    <i className="fa fa-xmark"></i>
                  </div>
                </div>
              ) : (
                <div
                  className="story-upload-box"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <i className="fa fa-cloud-arrow-up"></i>
                  <p>Click to upload an image</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="story-text-create">
              <div
                className="story-text-preview"
                style={{ backgroundColor }}
              >
                <textarea
                  placeholder="Write your story..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={200}
                />
              </div>
              <div className="story-color-picker">
                {BACKGROUND_COLORS.map((color) => (
                  <div
                    key={color}
                    className={`color-swatch ${backgroundColor === color ? "active" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setBackgroundColor(color)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="story-create-footer">
          <button
            className="story-create-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Share Story"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCreate;
