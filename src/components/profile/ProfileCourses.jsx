import React from "react";

const ProfileCourses = () => {
  return (
    <div className="profile-courses-section box-shadow mt-10">
      <div style={{ padding: "40px 20px", textAlign: "center", color: "#808080" }}>
        <i className="fa fa-graduation-cap" style={{ fontSize: "40px", marginBottom: "15px", display: "block", color: "#ccc" }}></i>
        <h3 style={{ margin: "0 0 8px", color: "#555" }}>Courses Coming Soon</h3>
        <p style={{ margin: 0, fontSize: "14px" }}>
          This feature is under development. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default ProfileCourses;