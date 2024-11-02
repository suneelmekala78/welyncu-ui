import React from "react";
import { apiRequest } from "../../helper/apis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const NetworkCard = ({ use }) => {

  const handleConnectionRequist = async (targetUserId) => {
    try {
      const res = await apiRequest({
        url: "/user/send-connection-requist",
        data: { targetUserId },
        method: "POST",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
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
            <img src={use?.profileUrl} alt="profile-pic" />
          </Link>
          <div className="job-card-top-left">
            <b className="job-title">{use?.fullName}</b>
            <span className="job-company-name text-overflow-ellipsis">
              {use?.headline}
            </span>
            <span className="job-company-location">
              <i className="fa fa-location-dot"></i> {use?.city} {use?.country}
            </span>
          </div>
        </div>

        <div className="job-card-mid">
          {/* <div className="job-mid-left">
          <i className="fa fa-clock"></i> 3 days ago
        </div> */}
          <div className="job-mid-left">
            <i className="fa fa-user-group"></i> 15 mutual connections
          </div>
        </div>

        <div className="job-card-btns">
          <div
            className="job-card-btn apply-btn btn-background"
            onClick={() => handleConnectionRequist(use?._id)}
          >
            <i className="fa fa-user-plus"></i> Connect
          </div>
          <div className="job-card-btn view-btn">
            <i className="fa fa-user-check"></i> Follow
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkCard;
