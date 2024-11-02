import React from "react";
import "./topnav.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopNav = () => {
  const { user } = useSelector((state) => state.user);

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
              <input type="text" placeholder="Search people, jobs & more..." />
              <i className="fa fa-search"></i>
            </div>
          </div>

          <div className="topnav-right">
            <div className="topnav-right-list">
              <Link to="/" className="topnav-right-list-item">
                <i className="fa fa-feed"></i>
                <p>Feed</p>
              </Link>
              <Link to="/games" className="topnav-right-list-item">
                <i className="fa fa-gamepad"></i>
                <p>Games</p>
              </Link>
              <Link to="/network" className="topnav-right-list-item">
                <i className="fa fa-users"></i>
                <p>Connections</p>
              </Link>
              <Link to="/jobs" className="topnav-right-list-item">
                <i className="fa fa-suitcase"></i>
                <p>Jobs</p>
              </Link>
              {/* <div className="topnav-right-list-item topnav-icon-feild">
                <i className="fa-solid fa-square-plus" style={{fontSize:"15px"}}></i>
              </div> */}
              <Link
                to="/chat"
                className="topnav-right-list-item topnav-icon-feild"
              >
                <i className="fa fa-message topnav-icon"></i>
                <p>2</p>
              </Link>
              <Link
                to="/notifications"
                className="topnav-right-list-item topnav-icon-feild"
              >
                <i className="fa fa-bell topnav-icon"></i>
                <p>6</p>
              </Link>
              <Link
                to={`/profile/${user?._id}`}
                className="topnav-right-list-item"
              >
                <img
                  className="topnav-img"
                  src={user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"}
                  alt="profile-pic"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mobile-nav">
        <div className="topnav-left">
          <Link to="/" className="topnav-logo">
            <img src="./2.png" alt="logo" />
          </Link>
        </div>

        <div className="topnav-right">
          <Link
            to="/notifications"
            className="topnav-right-list-item topnav-icon-feild"
          >
            <i className="fa fa-bell topnav-icon"></i>
            <p>6</p>
          </Link>
          <Link to="/chat" className="topnav-right-list-item topnav-icon-feild">
            <i className="fa fa-message topnav-icon"></i>
            <p>2</p>
          </Link>
        </div>
      </div> */}
    </>
  );
};

export default TopNav;
