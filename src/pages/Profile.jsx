import React, { useEffect, useState } from "react";
import "../components/profile/profile.css";
import "../components/profile/edit/edit.css";
import TopNav from "../components/topnav/TopNav";
import ProfileTop from "../components/profile/ProfileTop";
import ProfileLeft from "../components/profile/ProfileLeft";
import ProfileRight from "../components/profile/ProfileRight";
import ProfilePicEdit from "../components/profile/edit/ProfilePicEdit";
import BannerEdit from "../components/profile/edit/BannerEdit";
import ProfileTopDetailsEdit from "../components/profile/edit/ProfileTopDetailsEdit";
import AboutEdit from "../components/profile/edit/AboutEdit";
import ExperienceEdit from "../components/profile/edit/ExperienceEdit";
import AddExperience from "../components/profile/edit/AddExperience";
import AddEducation from "../components/profile/edit/AddEducation";
import EducationEdit from "../components/profile/edit/EducationEdit";
import AddSkill from "../components/profile/edit/AddSkill";
import { useDispatch } from "react-redux";
import { apiRequest, getLoggedinUser, getUserInfo } from "../helper/apis";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateExperience from "../components/profile/edit/UpdateExperience";
import UpdateEducation from "../components/profile/edit/UpdateEducation";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [profileSection, setProfileSection] = useState("about");
  const [edit, setEdit] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [user, setUser] = useState({});

  // Edit States
  const [about, setAbout] = useState("");
  const [addExperience, setAddExperience] = useState({
    userId: user?._d,
    role: "",
    company: "",
    locationType: "",
    location: "",
    employementType: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [addEducation, setAddEducation] = useState({
    userId: user?._d,
    study: "",
    degree: "",
    grade: "",
    collage: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [updateExperience, setUpdateExperience] = useState({
    userId: user?._d,
    index: null,
    role: "",
    company: "",
    locationType: "",
    location: "",
    employementType: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [updateEducation, setUpdateEducation] = useState({
    userId: user?._d,
    index: null,
    study: "",
    degree: "",
    grade: "",
    collage: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const getUserData = async () => {
    try {
      const res = await getUserInfo(id, dispatch);
      if (res?.message === "User not found!") {
        navigate("/");
      }
      setUserProfile(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentUserData = async () => {
    const res = await getLoggedinUser();
    setUser(res);
  };

  const handleAboutSubmit = async () => {
    try {
      const res = await apiRequest({
        url: "/user/add-about",
        data: { about, userId: user?._id },
        method: "POST",
      });

      if (res?.status === "success") {
        toast.success(res?.message);
        setEdit("");
        getUserData();
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
        toast.info(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitExperience = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest({
        url: "/user/add-experience",
        data: addExperience,
        method: "POST",
      });

      console.log(res);

      if (res?.status === "success") {
        toast.success(res?.message);
        setAddExperience({
          userId: user?._d,
          role: "",
          company: "",
          locationType: "",
          location: "",
          employementType: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        setEdit("");
        getUserData();
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
        toast.info(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitEducation = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest({
        url: "/user/add-education",
        data: addEducation,
        method: "POST",
      });

      console.log(res);

      if (res?.status === "success") {
        toast.success(res?.message);
        setAddEducation({
          userId: user?._d,
          role: "",
          company: "",
          locationType: "",
          location: "",
          employementType: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        setEdit("");
        getUserData();
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
        toast.info(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editExperience = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest({
        url: "/user/edit-experience",
        data: updateExperience,
        method: "PUT",
      });

      console.log(res);

      if (res?.status === "success") {
        toast.success(res?.message);
        setAddExperience({
          userId: user?._d,
          role: "",
          company: "",
          locationType: "",
          location: "",
          employementType: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        setEdit("");
        getUserData();
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
        toast.info(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editEducation = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest({
        url: "/user/edit-education",
        data: updateEducation,
        method: "PUT",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
        setAddEducation({
          userId: user?._d,
          study: "",
          degree: "",
          grade: "",
          collage: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        setEdit("");
        getUserData();
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
        toast.info(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEducationDelete = async (e) => {
    try {
      const res = await apiRequest({
        url: "/user/delete-education",
        data: { educationId: updateEducation?.index, userId: user?._id },
        method: "DELETE",
      });

      if (res?.status === "success") {
        toast.success(res?.message);
        setEdit("");
        getUserData();
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
        toast.info(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleExperienceDelete = async (e) => {
    try {
      const res = await apiRequest({
        url: "/user/delete-experience",
        data: { experienceId: updateExperience?.index, userId: user?._id },
        method: "DELETE",
      });

      if (res?.status === "success") {
        toast.success(res?.message);
        setEdit("");
        getUserData();
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
        toast.info(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getCurrentUserData();
  }, [id]);

  return (
    <>
      <TopNav />
      <div className="profile-page">
        <ProfileTop currentUser={userProfile} setEdit={setEdit} />
        <div className="user-profile-main">
          <div className="user-profile-left">
            <ProfileLeft
              profileSection={profileSection}
              setProfileSection={setProfileSection}
              setEdit={setEdit}
              user={userProfile}
              getUserData={getUserData}
            />
          </div>
          <div className="user-profile-right">
            <ProfileRight />
          </div>
        </div>
      </div>

      {edit === "profile-pic" && (
        <ProfilePicEdit user={userProfile} setEdit={setEdit} />
      )}
      {edit === "banner" && <BannerEdit user={user} setEdit={setEdit} />}
      {edit === "profile-top-details" && (
        <ProfileTopDetailsEdit
          getUserData={getUserData}
          user={userProfile}
          setEdit={setEdit}
        />
      )}
      {edit === "about" && (
        <AboutEdit
          user={userProfile}
          about={about}
          setAbout={setAbout}
          setEdit={setEdit}
          handleAboutSubmit={handleAboutSubmit}
        />
      )}
      {edit === "add-experience" && (
        <AddExperience
          addExperience={addExperience}
          setAddExperience={setAddExperience}
          setEdit={setEdit}
          submitExperience={submitExperience}
        />
      )}
      {edit === "experience" && (
        <ExperienceEdit
          setUpdateExperience={setUpdateExperience}
          user={userProfile}
          setEdit={setEdit}
        />
      )}
      {edit === "edit-experience" && (
        <UpdateExperience
          editExperience={editExperience}
          updateExperience={updateExperience}
          setUpdateExperience={setUpdateExperience}
          setEdit={setEdit}
          handleExperienceDelete={handleExperienceDelete}
        />
      )}
      {edit === "add-education" && (
        <AddEducation
          submitEducation={submitEducation}
          addEducation={addEducation}
          setAddEducation={setAddEducation}
          setEdit={setEdit}
        />
      )}
      {edit === "education" && (
        <EducationEdit
          user={userProfile}
          setUpdateEducation={setUpdateEducation}
          setEdit={setEdit}
        />
      )}
      {edit === "edit-education" && (
        <UpdateEducation
          editEducation={editEducation}
          updateEducation={updateEducation}
          setUpdateEducation={setUpdateEducation}
          setEdit={setEdit}
          handleEducationDelete={handleEducationDelete}
        />
      )}
      {edit === "add-skill" && (
        <AddSkill getUserData={getUserData} setEdit={setEdit} />
      )}
    </>
  );
};

export default Profile;
