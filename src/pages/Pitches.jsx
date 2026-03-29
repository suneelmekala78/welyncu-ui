import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../components/pitches/pitches.css";
import TopNav from "../components/topnav/TopNav";
import {
  getPitchesApi,
  getMyPitchesApi,
  likePitchApi,
  commentOnPitchApi,
  deletePitchApi,
} from "../helper/apis";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Pitches = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [pitches, setPitches] = useState([]);
  const [tab, setTab] = useState("all");
  const [filter, setFilter] = useState("");
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [commentText, setCommentText] = useState("");

  const fetchPitches = async () => {
    const params = new URLSearchParams();
    if (filter) params.append("pitchType", filter);
    const res = await getPitchesApi(params.toString());
    setPitches(res?.pitches || []);
  };

  const fetchMyPitches = async () => {
    const res = await getMyPitchesApi();
    setPitches(res?.pitches || []);
  };

  useEffect(() => {
    if (tab === "all") fetchPitches();
    else fetchMyPitches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, filter]);

  const handleLike = async (id) => {
    const res = await likePitchApi(id);
    if (res?.status === "success") {
      setPitches((prev) =>
        prev.map((p) => {
          if (p._id !== id) return p;
          const already = p.likes?.some((l) => (l._id || l) === user?._id);
          return {
            ...p,
            likes: already
              ? p.likes.filter((l) => (l._id || l) !== user?._id)
              : [...(p.likes || []), user?._id],
          };
        })
      );
      if (selectedPitch?._id === id) {
        setSelectedPitch((prev) => {
          const already = prev.likes?.some((l) => (l._id || l) === user?._id);
          return {
            ...prev,
            likes: already
              ? prev.likes.filter((l) => (l._id || l) !== user?._id)
              : [...(prev.likes || []), user?._id],
          };
        });
      }
    }
  };

  const handleComment = async () => {
    if (!commentText.trim() || !selectedPitch) return;
    const res = await commentOnPitchApi(selectedPitch._id, commentText.trim());
    if (res?.status === "success") {
      setSelectedPitch((prev) => ({ ...prev, comments: res.comments }));
      setCommentText("");
    }
  };

  const handleDeletePitch = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pitch?")) return;
    const res = await deletePitchApi(id);
    if (res?.status === "success") {
      toast.success("Pitch deleted");
      setPitches((prev) => prev.filter((p) => p._id !== id));
      if (selectedPitch?._id === id) setSelectedPitch(null);
    } else {
      toast.error(res?.message || "Failed to delete");
    }
  };

  const pitchTypes = [
    { value: "", label: "All Types" },
    { value: "startup", label: "Startup" },
    { value: "job-seeker", label: "Job Seeker" },
    { value: "freelancer", label: "Freelancer" },
    { value: "investor", label: "Investor" },
    { value: "general", label: "General" },
  ];

  return (
    <>
      <TopNav />
      <div className="pitches-page">
        <div className="pitches-top-bar box-shadow">
          <h2>
            <i className="fa fa-video"></i> Video Pitches
          </h2>
          <div className="pitches-top-controls">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              {pitchTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <button className="pitch-create-btn" onClick={() => navigate("/create-pitch")}>
              <i className="fa fa-plus"></i> Record Pitch
            </button>
          </div>
        </div>

        <ul className="pitches-tabs">
          <li className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>
            All Pitches
          </li>
          <li className={tab === "mine" ? "active" : ""} onClick={() => setTab("mine")}>
            My Pitches
          </li>
        </ul>

        {pitches.length > 0 ? (
          <div className="pitches-grid">
            {pitches.map((p) => {
              return (
                <div key={p._id} className="pitch-card box-shadow" onClick={() => setSelectedPitch(p)}>
                  <div className="pitch-video-container">
                    <video src={p.videoUrl} muted preload="metadata" />
                    <span className="pitch-type-badge">{p.pitchType}</span>
                    <i className="fa fa-play pitch-play-icon"></i>
                    {p.user?._id === user?._id && (
                      <i className="fa fa-trash pitch-delete-icon" onClick={(e) => { e.stopPropagation(); handleDeletePitch(p._id); }}></i>
                    )}
                    <div className="pitch-video-overlay">
                      <div className="pitch-card-title">{p.title}</div>
                      <div className="pitch-card-user">
                        <img src={p.user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"} alt="" />
                        <span>{p.user?.fullName}</span>
                      </div>
                      <div className="pitch-card-stats">
                        <span><i className="fa fa-heart"></i> {p.likes?.length || 0}</span>
                        <span><i className="fa fa-comment"></i> {p.comments?.length || 0}</span>
                        <span><i className="fa fa-eye"></i> {p.views?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-pitches">
            <i className="fa fa-video"></i>
            <p>No video pitches yet. Be the first to share your pitch!</p>
          </div>
        )}
      </div>

      {/* Detail Popup */}
      {selectedPitch && (
        <div className="pitch-detail-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelectedPitch(null); }}>
          <i className="fa fa-times pitch-detail-close" onClick={() => setSelectedPitch(null)}></i>
          <div className="pitch-detail-container">
            <div className="pitch-detail-video">
              <video src={selectedPitch.videoUrl} controls autoPlay />
            </div>
            <div className="pitch-detail-info">
              <div className="pitch-detail-header">
                <h2>{selectedPitch.title}</h2>
                <Link to={`/profile/${selectedPitch.user?._id}`} className="pitch-detail-user" style={{ textDecoration: "none", color: "inherit" }}>
                  <img src={selectedPitch.user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"} alt="" />
                  <b>{selectedPitch.user?.fullName}</b>
                  <span style={{ color: "#888" }}>{selectedPitch.user?.headline}</span>
                </Link>
              </div>

              {selectedPitch.description && (
                <div className="pitch-detail-desc">
                  {selectedPitch.description}
                  {selectedPitch.tags?.length > 0 && (
                    <div className="pitch-detail-tags">
                      {selectedPitch.tags.map((t, i) => <span key={i}>{t}</span>)}
                    </div>
                  )}
                </div>
              )}

              <div className="pitch-detail-actions">
                <button
                  className={selectedPitch.likes?.some((l) => (l._id || l) === user?._id) ? "active" : ""}
                  onClick={() => handleLike(selectedPitch._id)}
                >
                  <i className="fa fa-heart"></i> {selectedPitch.likes?.some((l) => (l._id || l) === user?._id) ? "Liked" : "Like"}
                </button>
                {selectedPitch.user?._id === user?._id && (
                  <button onClick={() => handleDeletePitch(selectedPitch._id)} style={{ color: "#e53935" }}>
                    <i className="fa fa-trash"></i> Delete
                  </button>
                )}
              </div>

              <div className="pitch-detail-stats">
                <span>{selectedPitch.likes?.length || 0} likes</span>
                <span>{selectedPitch.views?.length || 0} views</span>
                <span>{selectedPitch.comments?.length || 0} comments</span>
              </div>

              <div className="pitch-detail-comments">
                <h4>Comments</h4>
                <div className="pitch-comment-input">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleComment()}
                  />
                  <button onClick={handleComment}>Post</button>
                </div>
                {selectedPitch.comments?.map((c, i) => (
                  <div key={i} className="pitch-comment-item">
                    <img src={c.user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"} alt="" />
                    <div>
                      <b>{c.user?.fullName}</b>
                      <p>{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pitches;
