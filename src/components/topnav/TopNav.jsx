import React, { useEffect, useState } from "react";
import "./topnav.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNotifications } from "../../helper/apis";

const TopNav = () => {
  const { user } = useSelector((state) => state.user);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await getNotifications();
        if (res?.status === "success") {
          setUnreadCount(res.unreadCount || 0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnread();
  }, []);

  return (
    <>
      <div className="topnav-section">
        <div className="topnav-feild">
          <div className="topnav-left">
            <Link to="/" className="topnav-logo">
              <img
                src="https://res.cloudinary.com/demmiusik/image/upload/v1727173412/2_luqlxw.png"
                alt="logo"
              />
            </Link>
            <div className="topnav-search-feild">
              <input
                type="text"
                placeholder="Search people, jobs & more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    navigate(`/network?search=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchQuery("");
                  }
                }}
              />
              <i className="fa fa-search" onClick={() => { if (searchQuery.trim()) { navigate(`/network?search=${encodeURIComponent(searchQuery.trim())}`); setSearchQuery(""); } }} style={{cursor: "pointer"}}></i>
            </div>
          </div>

          <div className="topnav-right">
            <div className="topnav-right-list">
              {/* Primary nav items — hidden on mobile, shown in bottom bar */}
              <Link to="/" className="topnav-right-list-item topnav-desktop-only">
                <i className="fa fa-feed"></i>
                <p>Feed</p>
              </Link>
              <Link to="/network" className="topnav-right-list-item topnav-desktop-only">
                <i className="fa fa-users"></i>
                <p>Connections</p>
              </Link>
              <Link to="/jobs" className="topnav-right-list-item topnav-desktop-only">
                <i className="fa fa-suitcase"></i>
                <p>Jobs</p>
              </Link>

              {/* Feature nav items — hidden on mobile, shown in more menu */}
              <Link to="/games" className="topnav-right-list-item topnav-desktop-only">
                <i className="fa fa-gamepad"></i>
                <p>Games</p>
              </Link>
              <Link to="/startups" className="topnav-right-list-item topnav-desktop-only">
                <i className="fa fa-rocket"></i>
                <p>Startups</p>
              </Link>
              <Link to="/pitches" className="topnav-right-list-item topnav-desktop-only">
                <i className="fa fa-video-camera"></i>
                <p>Pitches</p>
              </Link>
              <Link to="/mentorships" className="topnav-right-list-item topnav-desktop-only">
                <i className="fa fa-graduation-cap"></i>
                <p>Mentors</p>
              </Link>

              {/* Icons always visible */}
              <Link
                to="/chat"
                className="topnav-right-list-item topnav-icon-feild topnav-desktop-only"
              >
                <i className="fa fa-message topnav-icon"></i>
              </Link>
              <Link
                to="/notifications"
                className="topnav-right-list-item topnav-icon-feild topnav-desktop-only"
              >
                <i className="fa fa-bell topnav-icon"></i>
                {unreadCount > 0 && <p>{unreadCount}</p>}
              </Link>
              <Link
                to={`/profile/${user?._id}`}
                className="topnav-right-list-item topnav-desktop-only"
              >
                <img
                  className="topnav-img"
                  src={user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"}
                  alt="profile-pic"
                />
              </Link>

              {/* Mobile-only: more menu trigger */}
              <div className="topnav-right-list-item topnav-mobile-only topnav-more-trigger" onClick={() => setMoreOpen(!moreOpen)}>
                <i className="fa fa-bars"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile More Drawer */}
      {moreOpen && (
        <div className="topnav-more-overlay" onClick={() => setMoreOpen(false)}>
          <div className="topnav-more-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="topnav-more-header">
              <span>Explore</span>
              <i className="fa fa-times" onClick={() => setMoreOpen(false)}></i>
            </div>
            <Link to="/games" className="topnav-more-item" onClick={() => setMoreOpen(false)}>
              <i className="fa fa-gamepad"></i> Games
            </Link>
            <Link to="/startups" className="topnav-more-item" onClick={() => setMoreOpen(false)}>
              <i className="fa fa-rocket"></i> Startups
            </Link>
            <Link to="/pitches" className="topnav-more-item" onClick={() => setMoreOpen(false)}>
              <i className="fa fa-video-camera"></i> Video Pitches
            </Link>
            <Link to="/mentorships" className="topnav-more-item" onClick={() => setMoreOpen(false)}>
              <i className="fa fa-graduation-cap"></i> Mentorship
            </Link>
            <Link to="/resumes" className="topnav-more-item" onClick={() => setMoreOpen(false)}>
              <i className="fa fa-file-text"></i> Resumes
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;
