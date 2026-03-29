import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../components/resume/resume.css";
import TopNav from "../components/topnav/TopNav";
import { getResumeApi, createResumeApi, updateResumeApi } from "../helper/apis";
import { toast } from "react-toastify";

const STEPS = ["Personal Details", "Summary", "Skills", "Experience", "Education"];

const EditResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [themeColor, setThemeColor] = useState("#7c3aed");
  const [personal, setPersonal] = useState({ fullName: "", email: "", phone: "", jobTitle: "", address: "" });
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState([{ name: "", rating: 3 }]);
  const [experience, setExperience] = useState([{ positionTitle: "", companyName: "", employmentType: "", locationType: "", fromDate: "", toDate: "", location: "", summary: "" }]);
  const [education, setEducation] = useState([{ degreeTitle: "", collegeName: "", fieldOfStudy: "", grade: "", startDate: "", endDate: "", location: "", description: "" }]);

  useEffect(() => {
    if (!isNew) {
      const fetchResume = async () => {
        const res = await getResumeApi(id);
        const r = res?.data?.resume;
        if (r) {
          setTitle(r.title || "");
          setThemeColor(r.themeColor || "#7c3aed");
          setPersonal(r.personalDetails || { fullName: "", email: "", phone: "", jobTitle: "", address: "" });
          setSummary(r.summary || "");
          setSkills(r.skills?.length ? r.skills : [{ name: "", rating: 3 }]);
          setExperience(r.experience?.length ? r.experience : [{ positionTitle: "", companyName: "", employmentType: "", locationType: "", fromDate: "", toDate: "", location: "", summary: "" }]);
          setEducation(r.education?.length ? r.education : [{ degreeTitle: "", collegeName: "", fieldOfStudy: "", grade: "", startDate: "", endDate: "", location: "", description: "" }]);
        }
      };
      fetchResume();
    }
  }, [id, isNew]);

  const handleSave = async () => {
    const data = { title: title || "Untitled Resume", themeColor, personalDetails: personal, summary, skills: skills.filter(s => s.name), experience: experience.filter(e => e.positionTitle), education: education.filter(e => e.degreeTitle) };
    let res;
    if (isNew) {
      res = await createResumeApi(data);
    } else {
      res = await updateResumeApi(id, data);
    }
    if (res?.data?.status === "success") {
      toast.success(isNew ? "Resume created!" : "Resume updated!");
      navigate("/resumes");
    } else {
      toast.error(res?.data?.message || "Failed to save");
    }
  };

  const updateExp = (index, field, value) => setExperience(prev => prev.map((e, i) => i === index ? { ...e, [field]: value } : e));
  const updateEdu = (index, field, value) => setEducation(prev => prev.map((e, i) => i === index ? { ...e, [field]: value } : e));
  const updateSkill = (index, field, value) => setSkills(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));

  return (
    <>
      <TopNav />
      <div className="edit-resume-page">
        <div className="edit-resume-left">
          <div className="editing-resume-section">
            <div className="editing-resume-top">
              <div className="editing-resume-top-left">
                <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} title="Theme Color" style={{ width: 30, height: 30, border: "none", cursor: "pointer" }} />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Resume Title" style={{ border: "1px solid #ddd", padding: "5px 10px", borderRadius: "5px" }} />
              </div>
              <div className="editing-resume-top-left">
                <div className="editing-resume-top-btns">
                  {step > 0 && <div className="editing-resume-top-btn pre-btn resume-btn" onClick={() => setStep(step - 1)}><i className="fa fa-arrow-left"></i> Prev</div>}
                  {step < STEPS.length - 1 && <div className="editing-resume-top-btn nxt-btn btn-background resume-btn" onClick={() => setStep(step + 1)}>Next <i className="fa fa-arrow-right"></i></div>}
                  {step === STEPS.length - 1 && <div className="editing-resume-top-btn nxt-btn btn-background resume-btn" onClick={handleSave}>Save <i className="fa fa-check"></i></div>}
                </div>
              </div>
            </div>
            <div className="editing-resume-card-section">
              {step === 0 && (
                <div className="personal-details-card box-shadow">
                  <div className="pdt" style={{ backgroundColor: themeColor }}></div>
                  <div className="personal-details-form p-15">
                    <div className="personal-details-titles"><h2>Personal Details</h2><p>Get started with the basic details.</p></div>
                    <div className="personal-inputs">
                      <div className="personal-input"><label>Full Name</label><input type="text" value={personal.fullName} onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })} /></div>
                      <div className="personal-flex-inputs">
                        <div className="personal-input"><label>Email</label><input type="text" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} /></div>
                        <div className="personal-input"><label>Phone No.</label><input type="text" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} /></div>
                      </div>
                      <div className="personal-input"><label>Job Title</label><input type="text" value={personal.jobTitle} onChange={(e) => setPersonal({ ...personal, jobTitle: e.target.value })} /></div>
                      <div className="personal-input"><label>Address</label><input type="text" value={personal.address} onChange={(e) => setPersonal({ ...personal, address: e.target.value })} /></div>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="personal-details-card box-shadow">
                  <div className="pdt" style={{ backgroundColor: themeColor }}></div>
                  <div className="personal-details-form p-15">
                    <div className="personal-details-titles"><h2>Summary</h2><p>Add a brief professional summary</p></div>
                    <div className="personal-inputs">
                      <div className="personal-input"><textarea rows="5" value={summary} onChange={(e) => setSummary(e.target.value)}></textarea></div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="personal-details-card box-shadow">
                  <div className="pdt" style={{ backgroundColor: themeColor }}></div>
                  <div className="personal-details-form p-15">
                    <div className="personal-details-titles"><h2>Skills</h2><p>Add your top professional key skills</p></div>
                    <div className="personal-inputs">
                      {skills.map((s, i) => (
                        <div className="personal-flex-inputs" key={i}>
                          <div className="personal-input"><label>Skill</label><input type="text" value={s.name} onChange={(e) => updateSkill(i, "name", e.target.value)} /></div>
                          <div className="skill-rating">
                            {[1, 2, 3, 4, 5].map((r) => (
                              <i key={r} className={r <= s.rating ? "fa fa-star" : "fa-regular fa-star"} onClick={() => updateSkill(i, "rating", r)} style={{ cursor: "pointer" }}></i>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="resume-bottom-btns">
                        <div className="experience-bottom-btns">
                          <div className="exp-btn" onClick={() => setSkills([...skills, { name: "", rating: 3 }])}><i className="fa fa-plus"></i> Add skill</div>
                          {skills.length > 1 && <div className="exp-btn" onClick={() => setSkills(skills.slice(0, -1))}><i className="fa fa-minus"></i> Remove</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="personal-details-card box-shadow">
                  <div className="pdt" style={{ backgroundColor: themeColor }}></div>
                  <div className="personal-details-form p-15">
                    <div className="personal-details-titles"><h2>Professional Experience</h2><p>Add your previous job experiences</p></div>
                    <div className="personal-inputs">
                      {experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "15px" }}>
                          <b>Experience {i + 1}</b>
                          <div className="personal-flex-inputs">
                            <div className="personal-input"><label>Position Title</label><input type="text" value={exp.positionTitle} onChange={(e) => updateExp(i, "positionTitle", e.target.value)} /></div>
                            <div className="personal-input"><label>Company Name</label><input type="text" value={exp.companyName} onChange={(e) => updateExp(i, "companyName", e.target.value)} /></div>
                          </div>
                          <div className="personal-flex-inputs">
                            <div className="personal-input"><label>Employment type</label><input type="text" value={exp.employmentType} onChange={(e) => updateExp(i, "employmentType", e.target.value)} /></div>
                            <div className="personal-input"><label>Location type</label><input type="text" value={exp.locationType} onChange={(e) => updateExp(i, "locationType", e.target.value)} /></div>
                          </div>
                          <div className="personal-flex-inputs">
                            <div className="personal-input"><label>From Date</label><input type="text" value={exp.fromDate} onChange={(e) => updateExp(i, "fromDate", e.target.value)} placeholder="e.g. Jan 2020" /></div>
                            <div className="personal-input"><label>To Date</label><input type="text" value={exp.toDate} onChange={(e) => updateExp(i, "toDate", e.target.value)} placeholder="e.g. Present" /></div>
                          </div>
                          <div className="personal-input"><label>Location</label><input type="text" value={exp.location} onChange={(e) => updateExp(i, "location", e.target.value)} /></div>
                          <div className="personal-input"><label>Summary</label><textarea rows="2" value={exp.summary} onChange={(e) => updateExp(i, "summary", e.target.value)}></textarea></div>
                        </div>
                      ))}
                      <div className="resume-bottom-btns">
                        <div className="experience-bottom-btns">
                          <div className="exp-btn" onClick={() => setExperience([...experience, { positionTitle: "", companyName: "", employmentType: "", locationType: "", fromDate: "", toDate: "", location: "", summary: "" }])}><i className="fa fa-plus"></i> Add Experience</div>
                          {experience.length > 1 && <div className="exp-btn" onClick={() => setExperience(experience.slice(0, -1))}><i className="fa fa-minus"></i> Remove</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="personal-details-card box-shadow">
                  <div className="pdt" style={{ backgroundColor: themeColor }}></div>
                  <div className="personal-details-form p-15">
                    <div className="personal-details-titles"><h2>Education Details</h2><p>Add your education details</p></div>
                    <div className="personal-inputs">
                      {education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "15px" }}>
                          <b>Education {i + 1}</b>
                          <div className="personal-flex-inputs">
                            <div className="personal-input"><label>Degree Title</label><input type="text" value={edu.degreeTitle} onChange={(e) => updateEdu(i, "degreeTitle", e.target.value)} /></div>
                            <div className="personal-input"><label>College Name</label><input type="text" value={edu.collegeName} onChange={(e) => updateEdu(i, "collegeName", e.target.value)} /></div>
                          </div>
                          <div className="personal-flex-inputs">
                            <div className="personal-input"><label>Field of study</label><input type="text" value={edu.fieldOfStudy} onChange={(e) => updateEdu(i, "fieldOfStudy", e.target.value)} /></div>
                            <div className="personal-input"><label>Grade</label><input type="text" value={edu.grade} onChange={(e) => updateEdu(i, "grade", e.target.value)} /></div>
                          </div>
                          <div className="personal-flex-inputs">
                            <div className="personal-input"><label>Start Date</label><input type="text" value={edu.startDate} onChange={(e) => updateEdu(i, "startDate", e.target.value)} /></div>
                            <div className="personal-input"><label>End Date</label><input type="text" value={edu.endDate} onChange={(e) => updateEdu(i, "endDate", e.target.value)} /></div>
                          </div>
                          <div className="personal-input"><label>Location</label><input type="text" value={edu.location} onChange={(e) => updateEdu(i, "location", e.target.value)} /></div>
                          <div className="personal-input"><label>Description</label><textarea rows="2" value={edu.description} onChange={(e) => updateEdu(i, "description", e.target.value)}></textarea></div>
                        </div>
                      ))}
                      <div className="resume-bottom-btns">
                        <div className="experience-bottom-btns">
                          <div className="exp-btn" onClick={() => setEducation([...education, { degreeTitle: "", collegeName: "", fieldOfStudy: "", grade: "", startDate: "", endDate: "", location: "", description: "" }])}><i className="fa fa-plus"></i> Add Education</div>
                          {education.length > 1 && <div className="exp-btn" onClick={() => setEducation(education.slice(0, -1))}><i className="fa fa-minus"></i> Remove</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="edit-resume-right">
          <div className="result-resume-section box-shadow">
            <div className="pdt" style={{ backgroundColor: themeColor }}></div>
            <div className="main-result-resume p-15">
              <div className="main-resume-top">
                <div className="main-resume-top-left">
                  <h2>{personal.fullName || "Your Name"}</h2>
                  <p>{personal.jobTitle || "Job Title"}</p>
                </div>
                <div className="main-resume-top-right">
                  {personal.email && <div className="main-resume-email"><i className="fa fa-envelope"></i> {personal.email}</div>}
                  {personal.phone && <div className="main-resume-email"><i className="fa fa-phone"></i> {personal.phone}</div>}
                  {personal.address && <div className="main-resume-email"><i className="fa fa-location-dot"></i> {personal.address}</div>}
                </div>
              </div>
              {summary && <div className="main-summery mr-sec"><h3 className="mr-title" style={{ color: themeColor }}>Summary</h3><div className="mr-desc"><p>{summary}</p></div></div>}
              {skills.some(s => s.name) && (
                <div className="main-skills mr-sec">
                  <h3 className="mr-title" style={{ color: themeColor }}>Skills</h3>
                  <div className="mr-desc"><p>{skills.filter(s => s.name).map(s => `${s.name} (${"★".repeat(s.rating)}${"☆".repeat(5 - s.rating)})`).join(" | ")}</p></div>
                </div>
              )}
              {experience.some(e => e.positionTitle) && (
                <div className="main-experience mr-sec">
                  <h3 className="mr-title" style={{ color: themeColor }}>Experience</h3>
                  <div className="mr-desc">
                    {experience.filter(e => e.positionTitle).map((exp, i) => (
                      <div className="mr-desc-sec" key={i}>
                        <div className="edu-details">
                          <div className="edu-details-left"><b>{exp.companyName}</b><span>{exp.location}</span></div>
                          <div className="edu-details-right">{exp.fromDate} - {exp.toDate}</div>
                        </div>
                        <p><b>{exp.positionTitle}</b> {exp.summary && `- ${exp.summary}`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {education.some(e => e.degreeTitle) && (
                <div className="main-education mr-sec">
                  <h3 className="mr-title" style={{ color: themeColor }}>Education</h3>
                  <div className="mr-desc">
                    {education.filter(e => e.degreeTitle).map((edu, i) => (
                      <div className="edu-details" key={i}>
                        <div className="edu-details-left"><b>{edu.degreeTitle} - {edu.fieldOfStudy}</b><span>{edu.collegeName}</span></div>
                        <div className="edu-details-right">{edu.startDate} - {edu.endDate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="pdt" style={{ backgroundColor: themeColor }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditResume;
