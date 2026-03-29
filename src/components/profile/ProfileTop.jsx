import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { apiRequest, getLoggedinUser } from "../../helper/apis";
import { toast } from "react-toastify";

const ProfileTop = ({ setEdit, currentUser }) => {
  const { user } = useSelector((state) => state.user);

  const [moreBtn, setMoreBtn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      const res = await getLoggedinUser();
      setLoggedInUser(res);
    };
    fetchMe();
  }, []);

  const isConnected = loggedInUser?.connections?.includes(currentUser?._id);
  const isPending = loggedInUser?.sendedConnectionRequests?.includes(currentUser?._id);

  const handleLogout = async () => {
    try {
      const res = await apiRequest({
        url: "/auth/logout",
        method: "POST",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartChat = () => {
    if (!currentUser?._id || currentUser?._id === user?._id) return;

    navigate("/chat", {
      state: {
        targetUserId: currentUser?._id,
        targetUser: {
          _id: currentUser?._id,
          fullName: currentUser?.fullName,
          headline: currentUser?.headline,
          profileUrl: currentUser?.profileUrl,
        },
      },
    });
  };

  const handleConnect = async () => {
    try {
      if (isConnected) {
        const res = await apiRequest({ url: "/user/remove-connection", data: { targetUserId: currentUser?._id }, method: "POST" });
        if (res?.status === "success") { toast.success(res?.message); const u = await getLoggedinUser(); setLoggedInUser(u); }
        else toast.error(res?.message);
      } else if (isPending) {
        const res = await apiRequest({ url: "/user/withdraw-connection-requist", data: { targetUserId: currentUser?._id }, method: "POST" });
        if (res?.status === "success") { toast.success(res?.message); const u = await getLoggedinUser(); setLoggedInUser(u); }
        else toast.error(res?.message);
      } else {
        const res = await apiRequest({ url: "/user/send-connection-requist", data: { targetUserId: currentUser?._id }, method: "POST" });
        if (res?.status === "success") { toast.success(res?.message); const u = await getLoggedinUser(); setLoggedInUser(u); }
        else toast.error(res?.message);
      }
    } catch (error) { console.log(error); }
  };

  return (
    <>
      <div className="company-profile-top-section user-profile-top-section box-shadow">
        <div className="company-top-banner">
          <img
            src={
              currentUser?.bannerUrl ||
              "https://res.cloudinary.com/demmiusik/image/upload/v1726728071/default-cover_ypzhkn.jpg"
            }
            alt="banner-img"
            className="cp"
          />
          {user?._id === currentUser?._id && (
            <i
              className="fa fa-pen-to-square"
              onClick={() => setEdit("banner")}
            ></i>
          )}
          <div className="user-profile-pic">
            <img
              src={
                currentUser?.profileUrl ||
                "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
              }
              alt="user-img"
              className="cp"
            />
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
          </div>
        </div>
        <div className="company-top-details">
          <div className="company-details-left">
            <div className="company-profile-name">
              {currentUser?.fullName}{" "}
              <i className="fa-regular fa-check-circle"></i>
            </div>
            <div className="company-profile-title">{currentUser?.headline}</div>
            <div className="company-profile-location">
              {currentUser?.city + ","} {currentUser?.country}
            </div>
            <div className="company-profile-follow-data">
              <span>
                <b>{currentUser?.followings?.length || 0}</b> following
              </span>
              <span>
                <b>{currentUser?.followers?.length || 0}</b> followers
              </span>
            </div>
            <div className="profile-links">
              {currentUser?.links?.length > 0 ? (
                currentUser.links.map((link, i) => {
                  let icon = "fa-solid fa-link";
                  let bg = "#808080";
                  const url = link?.toLowerCase() || "";
                  if (url.includes("facebook")) { icon = "fa-brands fa-facebook"; bg = "#1877F2"; }
                  else if (url.includes("instagram")) { icon = "fa-brands fa-instagram"; bg = "#dd3042"; }
                  else if (url.includes("youtube")) { icon = "fa-brands fa-youtube"; bg = "red"; }
                  else if (url.includes("twitter") || url.includes("x.com")) { icon = "fa-brands fa-twitter"; bg = "#1DA1F2"; }
                  else if (url.includes("github")) { icon = "fa-brands fa-github"; bg = "#333"; }
                  else if (url.includes("linkedin")) { icon = "fa-brands fa-linkedin"; bg = "#0077b5"; }
                  return (
                    <i key={i} className={icon} style={{ backgroundColor: bg, cursor: "pointer" }}
                      onClick={() => window.open(link.startsWith("http") ? link : `https://${link}`, "_blank")}></i>
                  );
                })
              ) : null}
            </div>
          </div>
          <div className="company-details-right-sec">
            <div className="company-details-right profile-details-right">
              {currentUser?._id !== user?._id && (
                <div
                  className="company-profile-topbtn company-website-btn"
                  onClick={handleStartChat}
                >
                  <i className="fa-solid fa-comments"></i> Message
                </div>
              )}
              {currentUser?._id !== user?._id && (
                <div className="company-profile-topbtn company-follow-btn btn-background" onClick={handleConnect} style={{cursor: "pointer"}}>
                  <i className={isConnected ? "fa fa-user-check" : isPending ? "fa fa-clock" : "fa fa-user-plus"}></i>
                  {isConnected ? " Connected" : isPending ? " Pending" : " Connect"}
                </div>
              )}
              <div
                className="company-profile-topbtn company-website-btn more-btn"
                onClick={() => setMoreBtn(!moreBtn)}
              >
                <i className="fa-solid fa-ellipsis"></i>

                <div
                  className={
                    moreBtn
                      ? "more-container more-container-active box-shadow"
                      : "more-container box-shadow"
                  }
                >
                  {currentUser?._id === user?._id && (
                    <div
                      className="more-item p-10"
                      onClick={() => {
                        setEdit("profile-pic");
                        setMoreBtn(!moreBtn);
                      }}
                    >
                      <i className="fa fa-camera"></i> <span>Profile</span>
                    </div>
                  )}

                  {currentUser?._id === user?._id && (
                    <div
                      className="more-item p-10"
                      onClick={() => {
                        setEdit("profile-top-details");
                        setMoreBtn(!moreBtn);
                      }}
                    >
                      <i className="fa fa-pen-to-square"></i> <span>Edit</span>
                    </div>
                  )}

                  {currentUser?._id !== user?._id && (
                    <div className="more-item p-10">
                      <i className="fa fa-user"></i> <span>Info</span>
                    </div>
                  )}

                  {currentUser?._id !== user?._id && (
                    <div className="more-item p-10">
                      <i className="fa fa-flag"></i> <span>Report</span>
                    </div>
                  )}

                  {currentUser?._id !== user?._id && (
                    <div className="more-item p-10">
                      <i className="fa fa-ban"></i> <span>Block</span>
                    </div>
                  )}

                  {currentUser?._id === user?._id && (
                    <div className="more-item p-10" onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <span>Logout</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="profile-achivements">
              <div className="profile-achivement">
                <i className="fa fa-coins" style={{ color: "gold" }}></i>{" "}
                <span>{currentUser?.coins} Coins</span>
              </div>
              <div className="profile-achivement">
                <i className="fa fa-award" style={{ color: "var(--blue)" }}></i>{" "}
                <span>0 Badges</span>
              </div>
              <div className="profile-achivement">
                <i className="fa fa-gem" style={{ color: "#00c2e6" }}></i>{" "}
                <span>0 Gems</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTop;
