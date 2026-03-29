import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/post-job/postJob.css";
import TopNav from "../components/topnav/TopNav";
import PremiumCard from "../components/home/PremiumCard";
import { createJobApi } from "../helper/apis";
import { toast } from "react-toastify";

const PostJob = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "", company: "", location: "", jobType: "on-site",
    employmentType: "full-time", experience: "fresher", salaryRange: "",
    description: "", applicationCollectionEmail: "",
  });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", skill: "", minimumAnswer: "", mustNeeded: false }]);
  };

  const updateQuestion = (index, field, value) => {
    setQuestions((prev) => prev.map((q, i) => i === index ? { ...q, [field]: value } : q));
  };

  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.company || !form.location) {
      return toast.error("Title, company, and location are required");
    }
    const data = {
      ...form,
      skills,
      screeningQuestions: questions.filter((q) => q.question),
    };
    const res = await createJobApi(data);
    if (res?.data?.status === "success") {
      toast.success("Job posted successfully!");
      navigate("/jobs");
    } else {
      toast.error(res?.data?.message || "Failed to post job");
    }
  };

  return (
    <>
      <TopNav />
      <div className="post-job-page">
        <div className="post-job-left mt-10">
          <div className="post-job-box">
            {step === 1 && (
              <div className="job-post-details-section box-shadow p-15">
                <div className="job-post-title">Post Job</div>
                <div className="job-post-details">
                  <div className="job-post-details-title">Job Details :</div>
                  <div className="job-post-details-container">
                    <div className="personal-inputs">
                      <div className="personal-flex-inputs">
                        <div className="personal-input">
                          <label>Job title</label>
                          <input type="text" name="title" value={form.title} onChange={handleChange} />
                        </div>
                        <div className="personal-input">
                          <label>Company</label>
                          <input type="text" name="company" value={form.company} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="personal-flex-inputs">
                        <div className="personal-input">
                          <label>Workplace type</label>
                          <select name="jobType" value={form.jobType} onChange={handleChange}>
                            <option value="on-site">On Site</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                          </select>
                        </div>
                        <div className="personal-input">
                          <label>Employment type</label>
                          <select name="employmentType" value={form.employmentType} onChange={handleChange}>
                            <option value="full-time">Full time</option>
                            <option value="part-time">Part time</option>
                            <option value="contract">Contract</option>
                            <option value="freelance">Freelance</option>
                            <option value="internship">Internship</option>
                          </select>
                        </div>
                      </div>
                      <div className="personal-flex-inputs">
                        <div className="personal-input">
                          <label>Experience</label>
                          <select name="experience" value={form.experience} onChange={handleChange}>
                            <option value="fresher">Fresher</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-6">3-6 years</option>
                            <option value="6-12">6-12 years</option>
                            <option value="12+">12+ years</option>
                          </select>
                        </div>
                        <div className="personal-input">
                          <label>Salary Range</label>
                          <input type="text" name="salaryRange" value={form.salaryRange} onChange={handleChange} placeholder="e.g. 5LPA - 8LPA" />
                        </div>
                      </div>
                      <div className="personal-input">
                        <label>Job location</label>
                        <input type="text" name="location" value={form.location} onChange={handleChange} />
                      </div>
                      <div className="job-post-details-title">Description :</div>
                      <div className="personal-input">
                        <textarea name="description" value={form.description} onChange={handleChange} rows="4"></textarea>
                      </div>
                      <div className="job-post-details-title">Skills :</div>
                      <div className="job-post-details-skills">
                        {skills.map((s, i) => (
                          <div className="job-post-details-skill box-shadow" key={i}>
                            {s} <i className="fa fa-xmark" onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}></i>
                          </div>
                        ))}
                      </div>
                      <div className="personal-flex-inputs">
                        <div className="personal-input">
                          <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a skill" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} />
                        </div>
                        <div className="resume-btn" onClick={addSkill} style={{height: "fit-content", alignSelf: "end"}}>Add</div>
                      </div>
                      <div className="resume-bottom-btns">
                        <div className="resume-btn" onClick={() => navigate("/jobs")}>Cancel</div>
                        <div className="resume-btn btn-background" onClick={() => setStep(2)}>Next</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="job-post-questions job-post-details-section box-shadow p-15">
                <div className="job-post-title">Post Job</div>
                <div className="job-post-details">
                  <div className="job-post-details-container">
                    <div className="personal-inputs">
                      <div className="personal-input">
                        <label>Applications collection mail</label>
                        <input type="text" name="applicationCollectionEmail" value={form.applicationCollectionEmail} onChange={handleChange} placeholder="Ex. hr@company.com" />
                      </div>

                      <div className="job-post-details-title">Screening Questions :</div>
                      {questions.map((q, i) => (
                        <div className="job-post-secreening-question box-shadow p-15" key={i}>
                          <div className="screen-question">
                            <input type="text" value={q.question} onChange={(e) => updateQuestion(i, "question", e.target.value)} placeholder="Enter question" style={{border: "none", width: "90%"}} />
                            <i className="fa fa-xmark" onClick={() => removeQuestion(i)}></i>
                          </div>
                          <div className="screen-question-details">
                            <div className="left">
                              <label>Skill</label>
                              <input type="text" value={q.skill} onChange={(e) => updateQuestion(i, "skill", e.target.value)} />
                            </div>
                            <div className="mid">
                              <label>Answer (min)</label>
                              <input type="text" value={q.minimumAnswer} onChange={(e) => updateQuestion(i, "minimumAnswer", e.target.value)} />
                            </div>
                            <div className="right">
                              <input type="checkbox" checked={q.mustNeeded} onChange={(e) => updateQuestion(i, "mustNeeded", e.target.checked)} />
                              <span>Must needed</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="resume-btn" onClick={addQuestion} style={{width: "fit-content"}}>
                        <i className="fa fa-plus"></i> Add Question
                      </div>

                      <div className="resume-bottom-btns">
                        <div className="resume-btn" onClick={() => setStep(1)}>Back</div>
                        <div className="resume-btn btn-background" onClick={handleSubmit}>Post</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="post-job-right">
          <PremiumCard />
        </div>
      </div>
    </>
  );
};

export default PostJob;
