import React from "react";
import { useNavigate } from "react-router-dom";

const PostJobCard = () => {
  const navigate = useNavigate();

  return (
    <div className="premium-card-section post-job-card box-shadow">
      <div className="premium-card-img">
        <img
          src="https://media.licdn.com/dms/image/C5112AQETldKI3wZhyQ/article-cover_image-shrink_600_2000/0/1520123831352?e=2147483647&v=beta&t=eXfLfdAgeMXY8UJsG4e55lY6EKC8p4jLs5kWxuUmkWk"
          alt="premium-img"
        />
      </div>
      <div className="premium-card-bottom">
        <b className="title">Hire on WeLyncu</b>
        <span>Looking for talent?</span>
      </div>
      <div className="job-btn" onClick={() => navigate("/post-job")} style={{cursor: "pointer"}}>Post A Job</div>
    </div>
  );
};

export default PostJobCard;
