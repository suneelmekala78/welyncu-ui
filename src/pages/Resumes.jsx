import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/resume/resume.css";
import TopNav from "../components/topnav/TopNav";
import { getMyResumesApi, deleteResumeApi } from "../helper/apis";
import { toast } from "react-toastify";

const COLORS = ["blueviolet", "deeppink", "teal", "coral", "steelblue", "darkgreen"];

const Resumes = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      const res = await getMyResumesApi();
      setResumes(res?.data?.resumes || []);
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    const res = await deleteResumeApi(id);
    if (res?.data?.status === "success") {
      toast.success("Resume deleted");
      setResumes((prev) => prev.filter((r) => r._id !== id));
    }
  };

  return (
    <>
      <TopNav />
      <div className="resumes-page">
        <div className="resumes-top">
          <h1 className="resumes-title">My Resumes</h1>
          <div className="resumes-text">
            Start creating your resume to your next job role.
          </div>
        </div>
        <div className="all-resumes">
          <div className="add-resume-box" onClick={() => navigate("/resume/edit/new")}>
            <i className="fa fa-plus"></i>
          </div>

          {resumes.map((resume, i) => (
            <div className="resume-box" key={resume._id} style={{backgroundColor: COLORS[i % COLORS.length]}}>
              <div className="resume-box-top" onClick={() => navigate(`/resume/${resume._id}`)}>
                <div style={{padding: "15px", color: "#fff"}}>
                  <b>{resume.personalDetails?.fullName || resume.title}</b>
                  <p style={{fontSize: "12px"}}>{resume.personalDetails?.jobTitle || ""}</p>
                </div>
              </div>
              <div className="resume-box-bottom">
                <div className="resume-box-bottom-left">{resume.title}</div>
                <div className="resume-box-bottom-right" style={{cursor: "pointer", display: "flex", gap: "10px"}}>
                  <i className="fa fa-pen" onClick={() => navigate(`/resume/edit/${resume._id}`)}></i>
                  <i className="fa fa-trash" onClick={() => handleDelete(resume._id)}></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Resumes;
