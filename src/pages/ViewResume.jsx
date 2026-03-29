import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../components/resume/resume.css";
import TopNav from "../components/topnav/TopNav";
import { getResumeApi } from "../helper/apis";

const ViewResume = () => {
  const { id } = useParams();
  const pdfRef = useRef();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      const res = await getResumeApi(id);
      setResume(res?.data?.resume || null);
    };
    if (id) fetchResume();
  }, [id]);

  const ResumeDownload = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${resume?.title || "resume"}.pdf`);
    });
  };

  if (!resume) return <><TopNav /><div style={{padding: "40px", textAlign: "center"}}>Loading...</div></>;

  const p = resume.personalDetails || {};
  const color = resume.themeColor || "#7c3aed";

  return (
    <>
      <TopNav />
      <div className="view-resume-page">
        <div className="view-resume-top">
          <h1>Here is your {resume.title}</h1>
          <p>Now you are ready to download and share your resume.</p>
          <div className="view-resume-btns">
            <div className="view-resume-btn" id="download" onClick={ResumeDownload}>Download</div>
            <div className="view-resume-btn">Share</div>
          </div>
        </div>
        <div className="result-resume-section box-shadow" id="resume" ref={pdfRef}>
          <div className="pdt" style={{ backgroundColor: color }}></div>
          <div className="main-result-resume p-15">
            <div className="main-resume-top">
              <div className="main-resume-top-left">
                <h2>{p.fullName || "Your Name"}</h2>
                <p>{p.jobTitle || ""}</p>
              </div>
              <div className="main-resume-top-right">
                {p.email && <div className="main-resume-email"><i className="fa fa-envelope"></i> {p.email}</div>}
                {p.phone && <div className="main-resume-email"><i className="fa fa-phone"></i> {p.phone}</div>}
                {p.address && <div className="main-resume-email"><i className="fa fa-location-dot"></i> {p.address}</div>}
              </div>
            </div>
            {resume.summary && (
              <div className="main-summery mr-sec">
                <h3 className="mr-title" style={{ color }}>Summary</h3>
                <div className="mr-desc"><p>{resume.summary}</p></div>
              </div>
            )}
            {resume.skills?.length > 0 && (
              <div className="main-skills mr-sec">
                <h3 className="mr-title" style={{ color }}>Skills</h3>
                <div className="mr-desc">
                  <p>{resume.skills.map(s => `${s.name} (${"â˜…".repeat(s.rating)}${"â˜†".repeat(5 - s.rating)})`).join(" | ")}</p>
                </div>
              </div>
            )}
            {resume.experience?.length > 0 && (
              <div className="main-experience mr-sec">
                <h3 className="mr-title" style={{ color }}>Experience</h3>
                <div className="mr-desc">
                  {resume.experience.map((exp, i) => (
                    <div className="mr-desc-sec" key={i}>
                      <div className="edu-details">
                        <div className="edu-details-left">
                          <b>{exp.companyName}</b>
                          <span>{exp.location}</span>
                        </div>
                        <div className="edu-details-right">{exp.fromDate} - {exp.toDate}</div>
                      </div>
                      <p><b>{exp.positionTitle}</b> {exp.summary && `- ${exp.summary}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {resume.education?.length > 0 && (
              <div className="main-education mr-sec">
                <h3 className="mr-title" style={{ color }}>Education</h3>
                <div className="mr-desc">
                  {resume.education.map((edu, i) => (
                    <div className="edu-details" key={i}>
                      <div className="edu-details-left">
                        <b>{edu.degreeTitle} - {edu.fieldOfStudy}</b>
                        <span>{edu.collegeName}</span>
                      </div>
                      <div className="edu-details-right">{edu.startDate} - {edu.endDate}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="pdt" style={{ backgroundColor: color }}></div>
        </div>
      </div>
    </>
  );
};

export default ViewResume;
