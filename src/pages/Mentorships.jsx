import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopNav from "../components/topnav/TopNav";
import "../components/mentorships/mentorships.css";
import {
  getMentorsApi,
  getMentorshipApi,
  getMyMentorshipsApi,
  requestMentorshipApi,
  respondMentorshipRequestApi,
  deleteMentorshipApi,
} from "../helper/apis";

const DEFAULT_PIC =
  "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg";

const Mentorships = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [mentorships, setMentorships] = useState([]);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [requestMsg, setRequestMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMentorships = async () => {
    try {
      setLoading(true);
      let res;
      if (tab === "mine") {
        res = await getMyMentorshipsApi();
      } else {
        const params = {};
        if (search) params.search = search;
        if (industry) params.industry = industry;
        if (sessionType) params.sessionType = sessionType;
        if (priceFilter) params.price = priceFilter;
        const query = new URLSearchParams(params).toString();
        res = await getMentorsApi(query ? `?${query}` : "");
      }
      if (res?.status === "success") {
        setMentorships(res.mentorships || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentorships();
  }, [tab, industry, sessionType, priceFilter]);

  const openDetail = async (id) => {
    try {
      const res = await getMentorshipApi(id);
      if (res?.status === "success") {
        setSelected(res.mentorship);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async () => {
    if (!selected) return;
    try {
      const res = await requestMentorshipApi(selected._id, requestMsg);
      if (res?.status === "success") {
        setRequestMsg("");
        openDetail(selected._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRespond = async (requestId, status) => {
    if (!selected) return;
    try {
      const res = await respondMentorshipRequestApi(
        selected._id,
        requestId,
        status
      );
      if (res?.status === "success") {
        openDetail(selected._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteMentorshipApi(id);
      if (res?.status === "success") {
        setSelected(null);
        fetchMentorships();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const myRequest = selected?.requests?.find(
    (r) => r.user?._id === user?._id
  );
  const isMentor = selected?.mentor?._id === user?._id;

  return (
    <>
      <TopNav />
      <div className="mentorships-page">
        <div className="mentorships-main">
          <div className="mentorships-topbar">
            <h2>Mentorship Marketplace</h2>
            <div className="mentorships-topbar-actions">
              <input
                className="mentorships-search"
                placeholder="Search mentorships..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchMentorships()}
              />
              <button
                className="mentorships-create-btn"
                onClick={() => navigate("/create-mentorship")}
              >
                + Offer Mentorship
              </button>
            </div>
          </div>

          <div className="mentorships-filters">
            <select
              className="mentorships-filter-select"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Engineering">Engineering</option>
              <option value="Other">Other</option>
            </select>
            <select
              className="mentorships-filter-select"
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
            >
              <option value="">All Session Types</option>
              <option value="one-on-one">One-on-One</option>
              <option value="group">Group</option>
              <option value="async">Async</option>
              <option value="workshop">Workshop</option>
            </select>
            <select
              className="mentorships-filter-select"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div className="mentorships-tabs">
            <button
              className={`mentorships-tab ${tab === "all" ? "active" : ""}`}
              onClick={() => setTab("all")}
            >
              All Mentorships
            </button>
            <button
              className={`mentorships-tab ${tab === "mine" ? "active" : ""}`}
              onClick={() => setTab("mine")}
            >
              My Listings
            </button>
          </div>

          {loading ? (
            <div className="mentorship-empty">Loading...</div>
          ) : mentorships.length === 0 ? (
            <div className="mentorship-empty">
              <i className="fa fa-graduation-cap"></i>
              No mentorships found
            </div>
          ) : (
            <div className="mentorships-grid">
              {mentorships.map((m) => (
                <div
                  className="mentorship-card"
                  key={m._id}
                  onClick={() => openDetail(m._id)}
                >
                  <div className="mentorship-card-header">
                    <img
                      src={m.mentor?.profileUrl || DEFAULT_PIC}
                      alt=""
                    />
                    <div className="mentorship-card-mentor-info">
                      <h4>{m.mentor?.fullName}</h4>
                      <p>{m.mentor?.headline || m.mentor?.industry}</p>
                    </div>
                  </div>
                  <h3>{m.title}</h3>
                  <p className="mentorship-card-desc">{m.description}</p>
                  {m.expertise?.length > 0 && (
                    <div className="mentorship-card-tags">
                      {m.expertise.slice(0, 4).map((e, i) => (
                        <span key={i}>{e}</span>
                      ))}
                      {m.expertise.length > 4 && (
                        <span>+{m.expertise.length - 4}</span>
                      )}
                    </div>
                  )}
                  <div className="mentorship-card-meta">
                    <span>
                      <i className="fa fa-clock-o"></i> {m.duration}
                    </span>
                    <span>
                      <i className="fa fa-tag"></i> {m.sessionType}
                    </span>
                    <span
                      className={`mentorship-badge ${
                        m.price === "Free" ? "free" : "paid"
                      }`}
                    >
                      {m.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Popup */}
      {selected && (
        <div
          className="mentorship-detail-overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className="mentorship-detail-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mentorship-detail-close"
              onClick={() => setSelected(null)}
            >
              <i className="fa fa-times"></i>
            </button>
            <div className="mentorship-detail-body">
              <div className="mentorship-detail-mentor">
                <img
                  src={selected.mentor?.profileUrl || DEFAULT_PIC}
                  alt=""
                />
                <div className="mentorship-detail-mentor-info">
                  <h3>{selected.mentor?.fullName}</h3>
                  <p>{selected.mentor?.headline || selected.mentor?.industry}</p>
                </div>
              </div>

              <h2 className="mentorship-detail-title">{selected.title}</h2>
              <p className="mentorship-detail-desc">{selected.description}</p>

              <div className="mentorship-detail-info-grid">
                <div className="mentorship-detail-info-item">
                  <label>Session Type</label>
                  <p>{selected.sessionType}</p>
                </div>
                <div className="mentorship-detail-info-item">
                  <label>Duration</label>
                  <p>{selected.duration}</p>
                </div>
                <div className="mentorship-detail-info-item">
                  <label>Price</label>
                  <p>{selected.price}</p>
                </div>
                <div className="mentorship-detail-info-item">
                  <label>Industry</label>
                  <p>{selected.industry || "General"}</p>
                </div>
                <div className="mentorship-detail-info-item">
                  <label>Availability</label>
                  <p>{selected.availability || "Contact mentor"}</p>
                </div>
                <div className="mentorship-detail-info-item">
                  <label>Spots</label>
                  <p>
                    {selected.requests?.filter((r) => r.status === "accepted")
                      .length || 0}{" "}
                    / {selected.maxMentees}
                  </p>
                </div>
              </div>

              {selected.expertise?.length > 0 && (
                <div className="mentorship-detail-tags">
                  {selected.expertise.map((e, i) => (
                    <span key={i}>{e}</span>
                  ))}
                </div>
              )}

              {/* Mentor's own view — show requests */}
              {isMentor && (
                <div className="mentorship-request-section">
                  <h4>
                    Requests ({selected.requests?.length || 0})
                  </h4>
                  {selected.requests?.length === 0 ? (
                    <p style={{ color: "#666", fontSize: 13 }}>
                      No requests yet
                    </p>
                  ) : (
                    <div className="mentorship-requests-list">
                      {selected.requests.map((r) => (
                        <div className="mentorship-request-item" key={r._id}>
                          <div className="mentorship-request-user">
                            <img
                              src={r.user?.profileUrl || DEFAULT_PIC}
                              alt=""
                            />
                            <div className="mentorship-request-user-info">
                              <h5>{r.user?.fullName}</h5>
                              <p>
                                {r.message || "No message"} &bull;{" "}
                                {r.status}
                              </p>
                            </div>
                          </div>
                          {r.status === "pending" && (
                            <div className="mentorship-request-actions">
                              <button
                                className="mentorship-request-accept"
                                onClick={() =>
                                  handleRespond(r._id, "accepted")
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="mentorship-request-reject"
                                onClick={() =>
                                  handleRespond(r._id, "rejected")
                                }
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    className="mentorship-request-reject"
                    style={{ marginTop: 16 }}
                    onClick={() => handleDelete(selected._id)}
                  >
                    Delete Listing
                  </button>
                </div>
              )}

              {/* Other user — request mentorship */}
              {!isMentor && !myRequest && (
                <div className="mentorship-request-section">
                  <h4>Request Mentorship</h4>
                  <textarea
                    className="mentorship-request-input"
                    placeholder="Introduce yourself and why you'd like mentorship..."
                    value={requestMsg}
                    onChange={(e) => setRequestMsg(e.target.value)}
                  />
                  <button
                    className="mentorship-request-btn"
                    onClick={handleRequest}
                  >
                    Send Request
                  </button>
                </div>
              )}

              {!isMentor && myRequest && (
                <div className="mentorship-request-section">
                  <div
                    className={`mentorship-request-status ${myRequest.status}`}
                  >
                    {myRequest.status === "pending"
                      ? "Your request is pending"
                      : myRequest.status === "accepted"
                      ? "Your request was accepted!"
                      : "Your request was rejected"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mentorships;
