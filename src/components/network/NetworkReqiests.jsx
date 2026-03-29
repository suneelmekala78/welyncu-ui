import React, { useState } from "react";
import { apiRequest } from "../../helper/apis";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const NetworkReqiests = ({ getUserData, onAccept }) => {
  const [requists, setRequists] = useState([]);

  const getRequests = async () => {
    try {
      const res = await apiRequest({
        url: "/user/get-user-connection-requists",
        method: "POST",
      });

      if (res?.status === "success") {
        setRequists(res?.connectionRequests || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptRequest = async (targetUserId) => {
    try {
      const res = await apiRequest({
        url: "/user/accept-connection-requist",
        data: { targetUserId },
        method: "POST",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
        if (getUserData) getUserData();
        if (onAccept) onAccept();
        getRequests();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ignoreRequest = async (targetUserId) => {
    try {
      const res = await apiRequest({
        url: "/user/ignore-connection-requist",
        data: { targetUserId },
        method: "POST",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
        if (getUserData) getUserData();
        getRequests();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <>
      <div className="all-connection-requiests">
        {requists?.length > 0 && (
          <>
            <div style={{ padding: "10px 0", fontWeight: "600", fontSize: "14px" }}>
              Connection Requests ({requists.length})
            </div>
            <div className="connection-requiests">
              {requists.map((req, i) => (
                <div className="connection-requiest" key={i}>
                  <div className="connection-requiest-left">
                    <Link to={`/profile/${req?._id}`}>
                      <img
                        src={
                          req?.profileUrl ||
                          "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
                        }
                        alt="pic"
                      />
                    </Link>
                    <div className="connection-requiest-left-details">
                      <b className="connection-requiest-name">{req?.fullName}</b>
                      <div className="connection-requiest-headline">
                        {req?.headline}
                      </div>
                    </div>
                  </div>
                  <div className="connection-requiest-right">
                    <div className="connection-requiest-btns">
                      <div
                        className="connection-requiest-btn accept-btn"
                        onClick={() => acceptRequest(req?._id)}
                      >
                        <i className="fa fa-check"></i> <span>Accept</span>
                      </div>
                      <div
                        className="connection-requiest-btn reject-btn"
                        onClick={() => ignoreRequest(req?._id)}
                      >
                        <i className="fa fa-xmark"></i> <span>Ignore</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NetworkReqiests;
