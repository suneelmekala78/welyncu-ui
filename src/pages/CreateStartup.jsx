import React, { useState } from "react";
import "../components/startups/startups.css";
import TopNav from "../components/topnav/TopNav";
import { createStartupApi } from "../helper/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateStartup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    category: "Other",
    stage: "Idea",
    funding: "Bootstrapped",
    location: "",
    foundedDate: "",
    website: "",
  });
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [banner, setBanner] = useState(null);
  const [lookingFor, setLookingFor] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) setBanner(file);
  };

  const addTag = () => {
    const val = tagInput.trim();
    if (val && !lookingFor.includes(val)) {
      setLookingFor([...lookingFor, val]);
    }
    setTagInput("");
  };

  const removeTag = (idx) => {
    setLookingFor(lookingFor.filter((_, i) => i !== idx));
  };

  const addLink = () => {
    const val = linkInput.trim();
    if (val && !links.includes(val)) {
      setLinks([...links, val]);
    }
    setLinkInput("");
  };

  const removeLink = (idx) => {
    setLinks(links.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.tagline) {
      toast.error("Name and tagline are required!");
      return;
    }
    setSubmitting(true);

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });
    if (logo) formData.append("logo", logo);
    if (banner) formData.append("banner", banner);
    if (lookingFor.length) formData.append("lookingFor", JSON.stringify(lookingFor));
    if (links.length) formData.append("links", JSON.stringify(links));

    const res = await createStartupApi(formData);
    setSubmitting(false);

    if (res?.status === "success") {
      toast.success("Startup created!");
      navigate(`/startup/${res.startup._id}`);
    } else {
      toast.error(res?.message || "Failed to create startup");
    }
  };

  const categories = [
    "SaaS", "FinTech", "EdTech", "HealthTech", "E-Commerce", "AI/ML",
    "Social Media", "Gaming", "CleanTech", "FoodTech", "AgriTech",
    "Logistics", "Real Estate", "Travel", "Entertainment", "Cybersecurity",
    "IoT", "Blockchain", "Other",
  ];
  const stages = ["Idea", "MVP", "Early Traction", "Growth", "Scaling", "Profitable"];
  const fundingOptions = [
    "Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Profitable",
  ];

  return (
    <>
      <TopNav />
      <div className="create-startup-page">
        <h1>Showcase Your Startup</h1>
        <p>Present your venture to the WeLyncu community — get discovered by investors, co-founders, and collaborators.</p>

        <div className="create-startup-form box-shadow">
          <div className="form-group">
            <label>Startup Name *</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. WeLyncu"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Tagline *</label>
            <input
              type="text"
              name="tagline"
              placeholder="One line pitch for your startup"
              value={form.tagline}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Tell the world about your startup — what problem do you solve?"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Logo</label>
            <div className="file-upload-area">
              {logoPreview && <img src={logoPreview} alt="preview" />}
              <input type="file" accept="image/*" onChange={handleLogoChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Banner Image</label>
            <input type="file" accept="image/*" onChange={handleBannerChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Stage</label>
              <select name="stage" value={form.stage} onChange={handleChange}>
                {stages.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Funding</label>
              <select name="funding" value={form.funding} onChange={handleChange}>
                {fundingOptions.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. San Francisco, CA"
                value={form.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Founded Date</label>
              <input
                type="text"
                name="foundedDate"
                placeholder="e.g. January 2024"
                value={form.foundedDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Website</label>
            <input
              type="text"
              name="website"
              placeholder="https://yoursite.com"
              value={form.website}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Social / Other Links</label>
            <div className="tags-input-container">
              {links.map((l, i) => (
                <span key={i} className="tag-chip">
                  {l} <i className="fa fa-times" onClick={() => removeLink(i)}></i>
                </span>
              ))}
              <input
                type="text"
                placeholder="Paste a link and press Enter"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLink())}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Looking For (tags)</label>
            <div className="tags-input-container">
              {lookingFor.map((tag, i) => (
                <span key={i} className="tag-chip">
                  {tag} <i className="fa fa-times" onClick={() => removeTag(i)}></i>
                </span>
              ))}
              <input
                type="text"
                placeholder="e.g. Co-Founder, Investor, Developer — press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
            </div>
          </div>

          <button
            className="form-submit-btn"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Launch Startup"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateStartup;
