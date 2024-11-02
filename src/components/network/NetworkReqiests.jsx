import React, { useState } from "react";
import { apiRequest } from "../../helper/apis";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const NetworkReqiests = ({ user, getUserData }) => {
  const { userId, token } = useSelector((state) => state.user);
  const [requists, setRequists] = useState([]);

  const getRequests = async () => {
    try {
      const res = await apiRequest({
        url: "/user/get-user-connection-requists",
        token: token,
        data: { userId: userId },
        method: "POST",
      });

      if (res?.status === "success") {
        toast.success(res?.message);
        setRequists(res?.connectionRequests);
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
        toast.info(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptRequest = async (targetUserId) => {
    try {
      const res = await apiRequest({
        url: "/user/accept-connection-requist",
        token: token,
        data: { userId, targetUserId },
        method: "POST",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
        getUserData();
        getRequests();
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
        toast.info(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ignoreRequest = async (targetUserId) => {
    try {
      const res = await apiRequest({
        url: "/user/ignore-connection-requist",
        token: token,
        data: { userId, targetUserId },
        method: "POST",
      });
      if (res?.status === "success") {
        toast.success(res?.message);
        getUserData();
        getRequests();
      } else if (res?.status === "fail") {
        toast.error(res?.message);
      } else {
        toast.info(res?.message);
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
        {/* <div className="accepted-requiests">
          <div className="imgs">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
              alt="pic"
            />
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
              alt="pic"
            />
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
              alt="pic"
            />
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
              alt="pic"
            />
          </div>
          <span> accepted your requist.</span>
        </div> */}
        {user?.connectionRequests?.length > 0 && (
          <div className="connection-requiests">
            {requists.map((req, i) => (
              <div className="connection-requiest" key={i}>
                <div className="connection-requiest-left">
                  <img src={req?.profileUrl} alt="pic" />
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
        )}
      </div>
    </>
  );
};

export default NetworkReqiests;
