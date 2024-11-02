import React, { useState } from "react";
import "../components/create-page/create-page.css";
import TopNav from "../components/topnav/TopNav";
import { apiRequest } from "../helper/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("");
  const [pageDetails, setPageDetails] = useState({
    name: "",
    headline: "",
    industry: "",
    size: "",
    type: "",
    websiteLink: "",
    welyncuLink: "",
    headquarters: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPageDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
      // If name changes, update welyncuLink based on name
      ...(name === "name" && {
        welyncuLink: value.toLowerCase().replace(/\s+/g, "-"),
      }),
    }));
  };

  const handleSave = async () => {
    try {
      const res = await apiRequest({
        url: "/pages/create-page",
        data: pageDetails,
        method: "POST",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
        setTimeout(() => {
          navigate(`/page/${res?.link}`);
        }, 1000);
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
        toast.info(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TopNav />
      <div className="create-page-page">
        {page === "" ? (
          <div className="create-page-select-section">
            <div className="create-page-select-section-top">
              <h1>Create a WeLyncu page</h1>
              <p>
                Connect with clients, employees, and the WeLyncu community. To
                get started, choose a page type.
              </p>
            </div>
            <div className="create-page-select-section-bottom">
              <div
                className="create-page-select-box cp p-10 box-shadow"
                onClick={() => setPage("company")}
              >
                <div className="create-page-select-box-top">
                  <img
                    src="https://www.wikiprofile.com/assets/images/companies_icon_header_text.png"
                    alt="icon-img"
                  />
                </div>
                <div className="create-page-select-box-bottom">
                  <b>Company</b>
                  <span>Small, medium and big companies</span>
                </div>
              </div>
              <div
                className="create-page-select-box cp p-10 box-shadow"
                onClick={() => setPage("collage")}
              >
                <div className="create-page-select-box-top">
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/higher-education/66/5-1024.png"
                    alt="icon-img"
                  />
                </div>
                <div className="create-page-select-box-bottom">
                  <b>Educational Institute</b>
                  <span>Schools, collages and universities</span>
                </div>
              </div>
              <div
                className="create-page-select-box cp p-10 box-shadow"
                onClick={() => setPage("other")}
              >
                <div className="create-page-select-box-top">
                  <img
                    src="https://icon-library.com/images/web-page-icon/web-page-icon-4.jpg"
                    alt="icon-img"
                  />
                </div>
                <div className="create-page-select-box-bottom">
                  <b>Other</b>
                  <span>Content or group pages</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="create-page-create-section box-shadow">
            <div className="personal-details-form p-15">
              <div className="personal-details-titles">
                <h2>Company Details</h2>
                <p>Get started with the basic details. You can change later.</p>
              </div>
              <div className="personal-inputs">
                <div className="personal-flex-inputs">
                  <div className="personal-input">
                    <label htmlFor="fname">Company Name</label>
                    <input
                      type="text"
                      id="fname"
                      name="name"
                      value={pageDetails?.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="personal-input">
                    <label htmlFor="lname">Welink.com/page/</label>
                    <input
                      type="text"
                      id="lname"
                      name="welyncuLink"
                      value={pageDetails?.welyncuLink}
                      readOnly
                    />
                  </div>
                </div>
                <div className="personal-flex-inputs">
                  <div className="personal-input">
                    <label htmlFor="websiteLink">Website</label>
                    <input
                      type="text"
                      id="websiteLink"
                      name="websiteLink"
                      value={pageDetails.websiteLink.toLowerCase()}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="personal-input">
                    <label htmlFor="industry">Industry</label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      value={pageDetails.industry}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="personal-flex-inputs">
                  <div className="personal-input">
                    <label htmlFor="size">Organization size</label>
                    <select
                      id="size"
                      name="size"
                      value={pageDetails.size}
                      onChange={handleInputChange}
                    >
                      <option value="0 - 1">0 - 1 employees</option>
                      <option value="2 - 10">2 - 10 employees</option>
                      <option value="11 - 50">11 - 50 employees</option>
                      <option value="51 - 200">51 - 200 employees</option>
                      <option value="201 - 500">201 - 500 employees</option>
                      <option value="501 - 1,000">501 - 1,000 employees</option>
                      <option value="1,001 - 5,000">
                        1,001 - 5,000 employees
                      </option>
                      <option value="5,001 - 10,000">
                        5,001 - 10,000 employees
                      </option>
                      <option value="10,000+">10,000+ employees</option>
                    </select>
                  </div>
                  <div className="personal-input">
                    <label htmlFor="type">Organization type</label>
                    <select
                      id="type"
                      name="type"
                      value={pageDetails.type}
                      onChange={handleInputChange}
                    >
                      <option value="Public Company">Public Company</option>
                      <option value="Private Company">Private Company</option>
                      <option value="Non Profit Company">
                        Non Profit Company
                      </option>
                      <option value="Self Employed">Self Employed</option>
                      <option value="Government Agency">
                        Government Agency
                      </option>
                      <option value="Partnership">Partnership</option>
                    </select>
                  </div>
                </div>
                <div className="personal-flex-inputs">
                  <div className="personal-input">
                    <label htmlFor="job-title">Headline / Title</label>
                    <input
                      type="text"
                      id="job-title"
                      name="headline"
                      value={pageDetails.headline}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="personal-input">
                    <label htmlFor="job-title">Headquarters (Location)</label>
                    <input
                      type="text"
                      id="job-title"
                      name="headquarters"
                      value={pageDetails.headquarters}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="resume-bottom-btns">
                  <div className=""></div>
                  <div
                    className="resume-btn btn-background"
                    onClick={handleSave}
                  >
                    Create Page
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreatePage;
