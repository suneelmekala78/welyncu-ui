import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "../../../helper/apis";
import { useSelector } from "react-redux";

const AddSkill = ({ setEdit, getUserData }) => {
  const { userId } = useSelector((state) => state.user);

  const [skills, setSkills] = useState([]); // Store confirmed skills with ratings
  const [currentSkills, setCurrentSkills] = useState([
    { skill: "", rating: 0 },
  ]); // State to manage dynamic skill inputs

  // Automatically add the skill to the confirmed list when both skill and rating are provided
  useEffect(() => {
    const lastSkill = currentSkills[currentSkills.length - 1];
    if (lastSkill.skill && lastSkill.rating) {
      setSkills([...skills, lastSkill]);
      setCurrentSkills([...currentSkills, { skill: "", rating: 0 }]);
    }
  }, [currentSkills, skills]);

  const handleSkillInputChange = (index, skill) => {
    const updatedSkills = [...currentSkills];
    updatedSkills[index].skill = skill;
    setCurrentSkills(updatedSkills);
  };

  const handleRatingClick = (index, rating) => {
    const updatedSkills = [...currentSkills];
    updatedSkills[index].rating = rating; // Set the rating for the current skill input
    setCurrentSkills(updatedSkills);
  };

  const handleSkillDelete = (index, fromCurrent = true) => {
    if (fromCurrent) {
      // Remove from the currentSkills array (for input fields)
      setCurrentSkills(currentSkills.filter((_, i) => i !== index));
    } else {
      // Remove from the confirmed skills array
      setSkills(skills.filter((_, i) => i !== index));
    }
  };

  const submitSkills = async (e) => {
    e.preventDefault();
    let finalSkills = currentSkills.slice(0, -1);
    try {
      const res = await apiRequest({
        url: "/user/add-skills",
        data: { skills: finalSkills , userId },
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

  return (
    <div className="popup-section popup-section-active">
      <div className="popup-container box-shadow p-15">
        <i className="fa fa-xmark" onClick={() => setEdit("")}></i>
        <div className="profile-top-details-edit-section">
          <div className="profile-top-details-edit-top">
            <div className="edit-top-title">Add Skill</div>
          </div>
          <div className="personal-inputs">
            {/* Render dynamic skill input fields */}
            {currentSkills.map((skillObj, index) => (
              <div key={index} className="personal-flex-inputs skills-flex">
                <div className="personal-input">
                  <label htmlFor={`role-${index}`}>Skill</label>
                  <input
                    type="text"
                    id={`role-${index}`}
                    value={skillObj.skill}
                    onChange={(e) =>
                      handleSkillInputChange(index, e.target.value)
                    }
                  />
                </div>
                <div className="skill-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fa${
                        skillObj.rating >= star ? "" : "-regular"
                      } fa-star cp`}
                      onClick={() => handleRatingClick(index, star)}
                    ></i>
                  ))}
                  <i
                    className="fa fa-trash cp"
                    onClick={() => handleSkillDelete(index, true)}
                    style={{ marginLeft: "10px", color: "red" }}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-top-details-edit-bottom">
          <div className="profile-top-details-edit-bottom-left"></div>
          <div className="profile-top-details-edit-bottom-right">
            <div className="save-btn btn-background" onClick={submitSkills}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkill;
