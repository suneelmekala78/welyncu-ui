import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/topnav/TopNav";
import "../components/mentorships/mentorships.css";
import { createMentorshipApi } from "../helper/apis";

const CreateMentorship = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    industry: "",
    sessionType: "one-on-one",
    duration: "30 mins",
    price: "Free",
    availability: "",
    maxMentees: 5,
  });
  const [expertise, setExpertise] = useState([]);
  const [expertiseInput, setExpertiseInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpertise = () => {
    const val = expertiseInput.trim();
    if (val && !expertise.includes(val)) {
      setExpertise([...expertise, val]);
      setExpertiseInput("");
    }
  };

  const removeExpertise = (idx) => {
    setExpertise(expertise.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;
    setSubmitting(true);
    try {
      const res = await createMentorshipApi({ ...form, expertise });
      if (res?.status === "success") {
        navigate("/mentorships");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <TopNav />
      <div className="create-mentorship-page">
        <form className="create-mentorship-form" onSubmit={handleSubmit}>
          <h2>Offer Mentorship</h2>

          <div className="create-mentorship-field">
            <label>Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Development Mentorship"
              required
            />
          </div>

          <div className="create-mentorship-field">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what mentees will learn..."
            />
          </div>

          <div className="create-mentorship-field">
            <label>Expertise / Skills</label>
            <div className="create-mentorship-tags-input">
              <input
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                placeholder="Add a skill"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addExpertise();
                  }
                }}
              />
              <button type="button" onClick={addExpertise}>
                Add
              </button>
            </div>
            {expertise.length > 0 && (
              <div className="create-mentorship-tags">
                {expertise.map((e, i) => (
                  <span key={i}>
                    {e}{" "}
                    <i
                      className="fa fa-times"
                      onClick={() => removeExpertise(i)}
                    ></i>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="create-mentorship-row">
            <div className="create-mentorship-field">
              <label>Industry</label>
              <select
                name="industry"
                value={form.industry}
                onChange={handleChange}
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Engineering">Engineering</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="create-mentorship-field">
              <label>Session Type</label>
              <select
                name="sessionType"
                value={form.sessionType}
                onChange={handleChange}
              >
                <option value="one-on-one">One-on-One</option>
                <option value="group">Group</option>
                <option value="async">Async</option>
                <option value="workshop">Workshop</option>
              </select>
            </div>
          </div>

          <div className="create-mentorship-row">
            <div className="create-mentorship-field">
              <label>Duration</label>
              <select
                name="duration"
                value={form.duration}
                onChange={handleChange}
              >
                <option value="15 mins">15 mins</option>
                <option value="30 mins">30 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="1 hour">1 hour</option>
                <option value="1.5 hours">1.5 hours</option>
                <option value="2 hours">2 hours</option>
              </select>
            </div>
            <div className="create-mentorship-field">
              <label>Price</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Free or $50/session"
              />
            </div>
          </div>

          <div className="create-mentorship-row">
            <div className="create-mentorship-field">
              <label>Availability</label>
              <input
                name="availability"
                value={form.availability}
                onChange={handleChange}
                placeholder="e.g. Weekdays 6-8 PM"
              />
            </div>
            <div className="create-mentorship-field">
              <label>Max Mentees</label>
              <input
                type="number"
                name="maxMentees"
                value={form.maxMentees}
                onChange={handleChange}
                min={1}
                max={50}
              />
            </div>
          </div>

          <button
            type="submit"
            className="create-mentorship-submit"
            disabled={submitting || !form.title}
          >
            {submitting ? "Creating..." : "Create Mentorship Listing"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateMentorship;
