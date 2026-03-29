import React from "react";
import { apiRequest } from "../../helper/apis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const NetworkCard = ({ use, loggedInUser, refreshUsers }) => {
  const isConnected = loggedInUser?.connections?.includes(use?._id);
  const isPending = loggedInUser?.sendedConnectionRequests?.includes(use?._id);
  const isFollowing = loggedInUser?.followings?.includes(use?._id);

  const handleConnectionRequist = async (targetUserId) => {
    try {
      const res = await apiRequest({
        url: "/user/send-connection-requist",
        data: { targetUserId },
        method: "POST",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
        if (refreshUsers) refreshUsers();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdraw = async (targetUserId) => {
    try {
      const res = await apiRequest({
        url: "/user/withdraw-connection-requist",
        data: { targetUserId },
        method: "POST",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
        if (refreshUsers) refreshUsers();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (targetUserId) => {
    try {
      const res = await apiRequest({
        url: "/user/follow-user",
        data: { targetUserId },
        method: "POST",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
        if (refreshUsers) refreshUsers();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (targetUserId) => {
    try {
      const res = await apiRequest({
        url: "/user/unfollow-user",
        data: { targetUserId },
        method: "POST",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
        if (refreshUsers) refreshUsers();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveConnection = async (targetUserId) => {
    try {
      const res = await apiRequest({
        url: "/user/remove-connection",
        data: { targetUserId },
        method: "POST",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
        if (refreshUsers) refreshUsers();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="job-card connection-card box-shadow">
        <div className="job-card-top network-card-top">
          <Link to={`/profile/${use?._id}`} className="job-card-top-right">
            <img
              src={
                use?.profileUrl ||
                "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
              }
              alt="profile-pic"
            />
          </Link>
          <div className="job-card-top-left">
            <b className="job-title">{use?.fullName || "User"}</b>
            <span className="job-company-name text-overflow-ellipsis">
              {use?.headline || "WeLynks User"}
            </span>
            <span className="job-company-location">
              <i className="fa fa-location-dot"></i> {use?.city || ""}{" "}
              {use?.country || ""}
            </span>
          </div>
        </div>

        <div className="job-card-mid">
          <div className="job-mid-left">
            <i className="fa fa-user-group"></i>{" "}
            {use?.connections?.length || 0} connections
          </div>
        </div>

        <div className="job-card-btns">
          {isConnected ? (
            <div
              className="job-card-btn view-btn"
              onClick={() => handleRemoveConnection(use?._id)}
            >
              <i className="fa fa-user-check"></i> Connected
            </div>
          ) : isPending ? (
            <div
              className="job-card-btn view-btn"
              onClick={() => handleWithdraw(use?._id)}
            >
              <i className="fa fa-clock"></i> Pending
            </div>
          ) : (
            <div
              className="job-card-btn apply-btn btn-background"
              onClick={() => handleConnectionRequist(use?._id)}
            >
              <i className="fa fa-user-plus"></i> Connect
            </div>
          )}

          {!isConnected &&
            (isFollowing ? (
              <div
                className="job-card-btn view-btn"
                onClick={() => handleUnfollow(use?._id)}
              >
                <i className="fa fa-user-minus"></i> Unfollow
              </div>
            ) : (
              <div
                className="job-card-btn view-btn"
                onClick={() => handleFollow(use?._id)}
              >
                <i className="fa fa-user-check"></i> Follow
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default NetworkCard;
