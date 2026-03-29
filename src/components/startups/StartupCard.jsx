import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { upvoteStartupApi } from "../../helper/apis";

const StartupCard = ({ startup, onUpvote }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isUpvoted = startup?.upvotes?.some(
    (u) => (u._id || u) === user?._id
  );

  const handleUpvote = async (e) => {
    e.stopPropagation();
    const res = await upvoteStartupApi(startup._id);
    if (res?.status === "success" && onUpvote) onUpvote(startup._id);
  };

  return (
    <div
      className="startup-card box-shadow"
      onClick={() => navigate(`/startup/${startup._id}`)}
    >
      <div className="startup-card-top">
        <img
          className="startup-card-logo"
          src={startup.logo}
          alt={startup.name}
        />
        <div className="startup-card-info">
          <div className="startup-card-name">{startup.name}</div>
          <div className="startup-card-tagline">{startup.tagline}</div>
          <div className="startup-card-badges">
            <span className="startup-badge badge-category">
              {startup.category}
            </span>
            <span className="startup-badge badge-stage">{startup.stage}</span>
            <span className="startup-badge badge-funding">
              {startup.funding}
            </span>
          </div>
        </div>
      </div>
      <div className="startup-card-bottom">
        <div className="startup-card-founder">
          {startup.founder?.profileUrl && (
            <img src={startup.founder.profileUrl} alt="" />
          )}
          <span>{startup.founder?.fullName}</span>
        </div>
        <div className="startup-card-stats">
          <span>
            <i className="fa fa-arrow-up"></i>{" "}
            {startup.upvotes?.length || 0}
          </span>
          <span>
            <i className="fa fa-comment"></i>{" "}
            {startup.comments?.length || 0}
          </span>
          <span>
            <i className="fa fa-users"></i>{" "}
            {startup.followers?.length || 0}
          </span>
        </div>
        <button
          className={`startup-upvote-btn ${isUpvoted ? "upvoted" : ""}`}
          onClick={handleUpvote}
        >
          <i className="fa fa-arrow-up"></i> {isUpvoted ? "Upvoted" : "Upvote"}
        </button>
      </div>
    </div>
  );
};

export default StartupCard;
