import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { apiRequest } from "../../helper/apis";

const ProfileSkills = ({ setEdit, user, getUserData }) => {
  const { userId } = useSelector((state) => state.user);

  const handleSkillDelete = async (skillId) => {
    try {
      const res = await apiRequest({
        url: "/user/delete-skill",
        data: { skillId, userId },
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

  return (
    <>
      {user?.skills?.length > 0 && (
        <div className="profile-education-card box-shadow">
          <div className="card-title">
            <span>Skills</span>
            {user?._id === userId && (
              <i
                className="fa fa-plus"
                onClick={() => setEdit("add-skill")}
              ></i>
            )}
          </div>

          <div className="profile-skills-section">
            <div className="profile-all-skills">
              {user?.skills?.map((skill, index) => (
                <div className="profile-skill box-shadow p-10" key={index}>
                  <div className="profile-skill-details">
                    <div className="profile-skill-title">{skill?.skill}</div>
                    <div className="profile-skill-rating">
                      <i
                        className={`${
                          skill?.rating > 0 ? "fa" : "fa-regular"
                        } fa-star`}
                      ></i>
                      <i
                        className={`${
                          skill?.rating > 1 ? "fa" : "fa-regular"
                        } fa-star`}
                      ></i>
                      <i
                        className={`${
                          skill?.rating > 2 ? "fa" : "fa-regular"
                        } fa-star`}
                      ></i>
                      <i
                        className={`${
                          skill?.rating > 3 ? "fa" : "fa-regular"
                        } fa-star`}
                      ></i>
                      <i
                        className={`${
                          skill?.rating > 4 ? "fa" : "fa-regular"
                        } fa-star`}
                      ></i>
                    </div>
                  </div>
                  {user?._id === userId && (
                    <i
                      className="fa fa-xmark cp"
                      onClick={() => handleSkillDelete(index)}
                    ></i>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSkills;
