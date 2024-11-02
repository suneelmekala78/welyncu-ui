import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../components/resume/resume.css";
import TopNav from "../components/topnav/TopNav";

const ViewResume = () => {
  const pdfRef = useRef();

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
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("resume.pdf");
    });
  };

  return (
    <>
      <TopNav />
      <div className="view-resume-page">
        <div className="view-resume-top">
          <h1>Here is your Full Stack Developer Resume</h1>
          <p>Now you are ready to download and share your resume.</p>
          <div className="view-resume-btns">
            <div
              className="view-resume-btn"
              id="download"
              onClick={ResumeDownload}
            >
              Download
            </div>
            <div className="view-resume-btn">Share</div>
          </div>
        </div>
        <div
          className="result-resume-section box-shadow"
          id="resume"
          ref={pdfRef}
        >
          <div className="pdt"></div>
          <div className="main-result-resume p-15">
            <div className="main-resume-top">
              <div className="main-resume-top-left">
                <h2>Suneel Mekala</h2>
                <p>Full Stack Developer</p>
              </div>
              <div className="main-resume-top-right">
                <div className="main-resume-email">
                  <i className="fa fa-envelope"></i> suneelmekala78@gmail.com
                </div>
                <div className="main-resume-email">
                  <i className="fa fa-phone"></i> +91 9603083867
                </div>
                <div className="main-resume-email">
                  <i className="fa fa-location-dot"></i> Hyderabad, Telangana
                </div>
              </div>
            </div>
            <div className="main-summery mr-sec">
              <h3 className="mr-title">Summery</h3>
              <div className="mr-desc">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                  vero exercitationem ipsa sapiente at voluptas aspernatur
                  porro. Beatae quia dolorem recusandae reiciendis praesentium,
                  sed provident odit distinctio in cum. Ea?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                  vero exercitationem ipsa sapiente at voluptas aspernatur
                  porro. Beatae quia dolorem recusandae reiciendis praesentium,
                  sed provident odit distinctio in cum. Ea?
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                  vero exercitationem ipsa sapiente at voluptas aspernatur
                  porro. Beatae quia dolorem recusandae reiciendis praesentium,
                  sed provident odit distinctio in cum. Ea?
                </p>
              </div>
            </div>
            <div className="main-skills mr-sec">
              <h3 className="mr-title">Skills</h3>
              <div className="mr-desc">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                  vero exercitationem ipsa sapiente at voluptas aspernatur
                  porro. Beatae quia dolorem recusandae reiciendis praesentium,
                  sed provident odit distinctio in cum. Ea?
                </p>
              </div>
            </div>
            <div className="main-experience mr-sec">
              <h3 className="mr-title">Experience</h3>
              <div className="mr-desc">
                <div className="mr-desc-sec">
                  <div className="edu-details">
                    <div className="edu-details-left">
                      <b>Google Pvt Ltd</b>
                      <span>New york, US</span>
                    </div>
                    <div className="edu-details-right">
                      2nd Feb 2020 - 14th Jun 2024
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt vero exercitationem ipsa sapiente at voluptas
                    aspernatur porro. Beatae quia dolorem recusandae reiciendis
                    praesentium, sed provident odit distinctio in cum. Ea?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                  vero exercitationem ipsa sapiente at voluptas aspernatur
                  porro. Beatae quia dolorem recusandae reiciendis praesentium,
                  sed provident odit distinctio in cum. Ea?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                  vero exercitationem ipsa sapiente at voluptas aspernatur
                  porro. Beatae quia dolorem recusandae reiciendis praesentium,
                  sed provident odit distinctio in cum. Ea?
                  </p>
                </div>
                <div className="mr-desc-sec">
                  <div className="edu-details">
                    <div className="edu-details-left">
                      <b>Eagle Eye Technologies</b>
                      <span>North Coroline, US</span>
                    </div>
                    <div className="edu-details-right">
                      2nd Feb 2020 - 14th Jun 2024
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt vero exercitationem ipsa sapiente at voluptas
                    aspernatur porro. Beatae quia dolorem recusandae reiciendis
                    praesentium, sed provident odit distinctio in cum. Ea?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                  vero exercitationem ipsa sapiente at voluptas aspernatur
                  porro. Beatae quia dolorem recusandae reiciendis praesentium,
                  sed provident odit distinctio in cum. Ea?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                  vero exercitationem ipsa sapiente at voluptas aspernatur
                  porro. Beatae quia dolorem recusandae reiciendis praesentium,
                  sed provident odit distinctio in cum. Ea?
                  </p>
                </div>
              </div>
            </div>
            <div className="main-education mr-sec">
              <h3 className="mr-title">Education</h3>
              <div className="mr-desc">
                <div className="edu-details">
                  <div className="edu-details-left">
                    <b>Computer Science and Engineering</b>
                    <span>SV Univercity, Tirupati</span>
                  </div>
                  <div className="edu-details-right">
                    2nd Feb 2020 - 14th Jun 2024
                  </div>
                </div>
                <div className="edu-details">
                  <div className="edu-details-left">
                    <b>Computer Science and Engineering</b>
                    <span>SV Univercity, Tirupati</span>
                  </div>
                  <div className="edu-details-right">
                    2nd Feb 2020 - 14th Jun 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pdt"></div>
        </div>
      </div>
    </>
  );
};

export default ViewResume;
