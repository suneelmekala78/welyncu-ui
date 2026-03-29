import React, { useState } from "react";
import "../components/pitches/pitches.css";
import TopNav from "../components/topnav/TopNav";
import { createPitchApi } from "../helper/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePitch = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    pitchType: "general",
  });
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        toast.error("Video must be under 100MB");
        return;
      }
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const addTag = () => {
    const val = tagInput.trim();
    if (val && !tags.includes(val)) setTags([...tags, val]);
    setTagInput("");
  };

  const removeTag = (idx) => setTags(tags.filter((_, i) => i !== idx));

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required!");
      return;
    }
    if (!video) {
      toast.error("Video file is required!");
      return;
    }
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("pitchType", form.pitchType);
    formData.append("video", video);
    if (tags.length) formData.append("tags", JSON.stringify(tags));

    const res = await createPitchApi(formData);
    setSubmitting(false);

    if (res?.status === "success") {
      toast.success("Pitch uploaded!");
      navigate("/pitches");
    } else {
      toast.error(res?.message || "Failed to upload pitch");
    }
  };

  const pitchTypes = [
    { value: "startup", label: "Startup Pitch" },
    { value: "job-seeker", label: "Job Seeker Introduction" },
    { value: "freelancer", label: "Freelancer Profile" },
    { value: "investor", label: "Investor Pitch" },
    { value: "general", label: "General" },
  ];

  return (
    <>
      <TopNav />
      <div className="create-pitch-page">
        <h1><i className="fa fa-video" style={{ color: "var(--blue)" }}></i> Record Your Pitch</h1>
        <p>Share a short video to introduce yourself, your startup, or your skills. Keep it under 60 seconds for maximum impact.</p>

        <div className="create-pitch-form box-shadow">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Why You Should Hire Me"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Video *</label>
            <input type="file" accept="video/*" onChange={handleVideoChange} />
            <p className="pitch-video-hint">Max 100MB. Keep it under 60 seconds for best engagement.</p>
            {videoPreview && (
              <video src={videoPreview} controls style={{ width: "100%", maxHeight: 300, marginTop: 10, borderRadius: 8 }} />
            )}
          </div>

          <div className="form-group">
            <label>Type</label>
            <select name="pitchType" value={form.pitchType} onChange={handleChange}>
              {pitchTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Tell viewers what this pitch is about..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tags-input-container" style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: 8, border: "1px solid rgba(128,128,128,0.3)", borderRadius: 5, minHeight: 40, alignItems: "center" }}>
              {tags.map((t, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", background: "#e8f4fd", color: "var(--blue)", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>
                  {t} <i className="fa fa-times" style={{ cursor: "pointer", fontSize: 10 }} onClick={() => removeTag(i)}></i>
                </span>
              ))}
              <input
                type="text"
                placeholder="e.g. React, SaaS, Marketing — press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                style={{ border: "none", padding: 4, flex: 1, minWidth: 100, outline: "none" }}
              />
            </div>
          </div>

          <button className="form-submit-btn" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Uploading..." : "Upload Pitch"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePitch;
