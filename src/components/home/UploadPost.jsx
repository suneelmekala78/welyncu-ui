import React from "react";

const UploadPost = ({ setStartPost, setShowPollCreate, user }) => {
  return (
    <div className="upload-post-section">
      <div className="upload-input-feild">
        <img
          src={user?.profileUrl}
          alt="profile-pic"
        />
        <input type="text" placeholder="Write your thoughts..." onClick={()=>setStartPost(true)}/>
        <div className="post-btn" onClick={()=>setStartPost(true)}>Start Post</div>
      </div>
      <div style={{ display: "flex", gap: "10px", padding: "8px 15px 0", borderTop: "1px solid rgba(128,128,128,0.15)", marginTop: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", fontSize: "13px", color: "#666", padding: "6px 0" }}
          onClick={() => setStartPost(true)}>
          <i className="fa fa-image" style={{ color: "var(--blue)" }}></i> Photo/Video
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", fontSize: "13px", color: "#666", padding: "6px 0" }}
          onClick={() => setShowPollCreate(true)}>
          <i className="fa-solid fa-square-poll-vertical" style={{ color: "#e65100" }}></i> Poll
        </div>
      </div>
    </div>
  );
};

export default UploadPost;
