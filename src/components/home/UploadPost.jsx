import React from "react";

const UploadPost = ({ setStartPost, user }) => {
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
    </div>
  );
};

export default UploadPost;
