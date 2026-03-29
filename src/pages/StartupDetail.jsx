import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../components/startups/startups.css";
import TopNav from "../components/topnav/TopNav";
import {
  getStartupApi,
  upvoteStartupApi,
  commentOnStartupApi,
  followStartupApi,
  deleteStartupApi,
} from "../helper/apis";
import { toast } from "react-toastify";

const StartupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [startup, setStartup] = useState(null);
  const [commentText, setCommentText] = useState("");
  const isOwner = startup?.user?._id === user?._id || startup?.user === user?._id;

  useEffect(() => {
    const fetch = async () => {
      const res = await getStartupApi(id);
      setStartup(res?.startup || null);
    };
    if (id) fetch();
  }, [id]);

  const handleUpvote = async () => {
    const res = await upvoteStartupApi(id);
    if (res?.status === "success") {
      setStartup((prev) => {
        const already = prev.upvotes?.some((u) => (u._id || u) === user?._id);
        return {
          ...prev,
          upvotes: already
            ? prev.upvotes.filter((u) => (u._id || u) !== user?._id)
            : [...(prev.upvotes || []), user?._id],
        };
      });
    }
  };

  const handleFollow = async () => {
    const res = await followStartupApi(id);
    if (res?.status === "success") {
      setStartup((prev) => {
        const already = prev.followers?.some(
          (f) => (f._id || f) === user?._id
        );
        return {
          ...prev,
          followers: already
            ? prev.followers.filter((f) => (f._id || f) !== user?._id)
            : [...(prev.followers || []), user?._id],
        };
      });
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    const res = await commentOnStartupApi(id, commentText.trim());
    if (res?.status === "success") {
      setStartup((prev) => ({ ...prev, comments: res.comments }));
      setCommentText("");
    }
  };

  const handleDeleteStartup = async () => {
    if (!window.confirm("Are you sure you want to delete this startup?")) return;
    const res = await deleteStartupApi(id);
    if (res?.status === "success") {
      toast.success("Startup deleted");
      navigate("/startups");
    } else {
      toast.error(res?.message || "Failed to delete");
    }
  };

  if (!startup)
    return (
      <>
        <TopNav />
        <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>
      </>
    );

  const isUpvoted = startup.upvotes?.some(
    (u) => (u._id || u) === user?._id
  );
  const isFollowing = startup.followers?.some(
    (f) => (f._id || f) === user?._id
  );

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <>
      <TopNav />
      <div className="startup-detail-page">
        <div className="startup-detail-main">
          {/* Header */}
          <div className="startup-detail-header box-shadow">
            <img
              className="startup-detail-banner"
              src={startup.banner}
              alt="banner"
            />
            <div className="startup-detail-head">
              <img
                className="startup-detail-logo"
                src={startup.logo}
                alt={startup.name}
              />
              <div className="startup-detail-title-section">
                <h1>{startup.name}</h1>
                <div className="startup-tagline">{startup.tagline}</div>
              </div>
              <div className="startup-detail-actions">
                <button
                  className={`action-btn ${isUpvoted ? "primary" : ""}`}
                  onClick={handleUpvote}
                >
                  <i className="fa fa-arrow-up"></i>{" "}
                  {isUpvoted ? "Upvoted" : "Upvote"} ({startup.upvotes?.length || 0})
                </button>
                <button
                  className={`action-btn ${isFollowing ? "primary" : ""}`}
                  onClick={handleFollow}
                >
                  <i className={isFollowing ? "fa fa-check" : "fa fa-plus"}></i>{" "}
                  {isFollowing ? "Following" : "Follow"}
                </button>
                {isOwner && (
                  <button className="action-btn" onClick={handleDeleteStartup} style={{ color: "#e53935" }}>
                    <i className="fa fa-trash"></i> Delete
                  </button>
                )}
              </div>
            </div>
            <div className="startup-detail-badges">
              <span className="startup-badge badge-category">
                {startup.category}
              </span>
              <span className="startup-badge badge-stage">
                {startup.stage}
              </span>
              <span className="startup-badge badge-funding">
                {startup.funding}
              </span>
            </div>
          </div>

          {/* About */}
          <div className="startup-detail-about box-shadow">
            <h3>About</h3>
            <p>{startup.description || "No description provided yet."}</p>
            {startup.lookingFor?.length > 0 && (
              <>
                <h3 style={{ marginTop: 15 }}>Looking For</h3>
                <div className="startup-looking-for">
                  {startup.lookingFor.map((item, i) => (
                    <span key={i} className="looking-tag">{item}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Comments */}
          <div className="startup-comments-section box-shadow">
            <h3>Comments ({startup.comments?.length || 0})</h3>
            <div className="startup-comment-input">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleComment()}
              />
              <button onClick={handleComment}>Post</button>
            </div>
            {startup.comments?.map((c, i) => (
              <div key={i} className="startup-comment">
                <img
                  src={
                    c.user?.profileUrl ||
                    "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
                  }
                  alt=""
                />
                <div className="startup-comment-body">
                  <b>
                    <Link
                      to={`/profile/${c.user?._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {c.user?.fullName}
                    </Link>
                  </b>
                  <span>{timeAgo(c.createdAt)}</span>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="startup-detail-sidebar">
          {/* Info */}
          <div className="startup-info-card box-shadow">
            <h3>Details</h3>
            {startup.location && (
              <div className="startup-info-row">
                <span className="info-label">Location</span>
                <span className="info-value">{startup.location}</span>
              </div>
            )}
            {startup.foundedDate && (
              <div className="startup-info-row">
                <span className="info-label">Founded</span>
                <span className="info-value">{startup.foundedDate}</span>
              </div>
            )}
            {startup.website && (
              <div className="startup-info-row">
                <span className="info-label">Website</span>
                <span className="info-value">
                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {startup.website}
                  </a>
                </span>
              </div>
            )}
            {startup.links?.length > 0 &&
              startup.links.map((link, i) => (
                <div key={i} className="startup-info-row">
                  <span className="info-label">Link</span>
                  <span className="info-value">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link}
                    </a>
                  </span>
                </div>
              ))}
          </div>

          {/* Stats */}
          <div className="startup-stats-card box-shadow">
            <h3>Stats</h3>
            <div className="startup-stats-grid">
              <div className="startup-stat-item">
                <div className="stat-number">
                  {startup.upvotes?.length || 0}
                </div>
                <div className="stat-label">Upvotes</div>
              </div>
              <div className="startup-stat-item">
                <div className="stat-number">
                  {startup.followers?.length || 0}
                </div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="startup-stat-item">
                <div className="stat-number">
                  {startup.comments?.length || 0}
                </div>
                <div className="stat-label">Comments</div>
              </div>
              <div className="startup-stat-item">
                <div className="stat-number">
                  {startup.teamMembers?.length || 0}
                </div>
                <div className="stat-label">Team</div>
              </div>
            </div>
          </div>

          {/* Team */}
          {startup.teamMembers?.length > 0 && (
            <div className="startup-team-card box-shadow">
              <h3>Team</h3>
              {startup.teamMembers.map((m, i) => (
                <Link
                  key={i}
                  to={`/profile/${m.user?._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="startup-team-member">
                    <img
                      src={
                        m.user?.profileUrl ||
                        "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
                      }
                      alt=""
                    />
                    <div className="startup-team-member-info">
                      <b>{m.user?.fullName}</b>
                      <span>{m.role}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StartupDetail;
