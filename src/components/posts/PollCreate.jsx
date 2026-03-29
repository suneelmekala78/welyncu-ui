import React, { useState } from "react";
import { toast } from "react-toastify";
import { createPollApi } from "../../helper/apis";

const PollCreate = ({ setShowPollCreate, onCreated }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [caption, setCaption] = useState("");
  const [duration, setDuration] = useState(24);
  const [isSaving, setIsSaving] = useState(false);

  const addOption = () => {
    if (options.length < 6) setOptions([...options, ""]);
  };

  const removeOption = (i) => {
    if (options.length > 2) setOptions(options.filter((_, idx) => idx !== i));
  };

  const updateOption = (i, val) => {
    const updated = [...options];
    updated[i] = val;
    setOptions(updated);
  };

  const handleCreate = async () => {
    if (!question.trim()) {
      toast.error("Poll question is required!");
      return;
    }
    const filtered = options.filter((o) => o.trim());
    if (filtered.length < 2) {
      toast.error("At least 2 options are required!");
      return;
    }
    setIsSaving(true);
    const res = await createPollApi({
      question: question.trim(),
      options: filtered,
      caption: caption.trim(),
      duration,
    });
    setIsSaving(false);

    if (res?.status === "success") {
      toast.success("Poll created!");
      setShowPollCreate(false);
      if (onCreated) onCreated();
    } else {
      toast.error(res?.message || "Failed to create poll");
    }
  };

  return (
    <div className="popup-section popup-section-active">
      <div className="popup-container box-shadow p-15 post-upload-box">
        <i className="fa fa-xmark" onClick={() => setShowPollCreate(false)}></i>
        <div className="profile-top-details-edit-section">
          <div className="profile-top-details-edit-top">
            <div className="edit-top-title">
              <i className="fa-solid fa-square-poll-vertical"></i> Create a Poll
            </div>
          </div>

          <div className="poll-create-form">
            <input
              type="text"
              className="poll-create-input"
              placeholder="Ask a question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <div className="poll-create-options">
              {options.map((opt, i) => (
                <div key={i} className="poll-create-option-row">
                  <input
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                  />
                  {options.length > 2 && (
                    <i className="fa fa-times" onClick={() => removeOption(i)}></i>
                  )}
                </div>
              ))}
              {options.length < 6 && (
                <div className="poll-add-option" onClick={addOption}>
                  <i className="fa fa-plus"></i> Add Option
                </div>
              )}
            </div>

            <textarea
              className="poll-create-caption"
              placeholder="Add a caption (optional)..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <div className="poll-duration-row">
              <label>Poll Duration:</label>
              <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
                <option value={1}>1 hour</option>
                <option value={6}>6 hours</option>
                <option value={12}>12 hours</option>
                <option value={24}>1 day</option>
                <option value={72}>3 days</option>
                <option value={168}>1 week</option>
              </select>
            </div>
          </div>
        </div>

        <div className="profile-top-details-edit-bottom">
          <div className="profile-top-details-edit-bottom-left"></div>
          <div className="profile-top-details-edit-bottom-right">
            <span className="save-btn btn-background" onClick={handleCreate}>
              {isSaving ? "Creating..." : "Create Poll"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollCreate;
