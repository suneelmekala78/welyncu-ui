import React from "react";
import { Link } from "react-router-dom";

const AllFrdsSuggesions = ({ suggesions, setViewAll, loggedInUser, onConnect }) => {
  const getConnectLabel = (frdId) => {
    if (loggedInUser?.connections?.includes(frdId)) return { icon: "fa fa-user-check", label: "Connected" };
    if (loggedInUser?.sendedConnectionRequests?.includes(frdId)) return { icon: "fa fa-clock", label: "Pending" };
    return { icon: "fa fa-user-plus", label: "Connect" };
  };

  return (
    <>
      <div className="popup-section popup-section-active">
        <div className="popup-container box-shadow p-15">
          <i className="fa fa-xmark" onClick={() => setViewAll(false)}></i>
          <div className="profile-top-details-edit-section">
            <div className="profile-top-details-edit-top">
              <div className="edit-top-title">People you may know </div>
            </div>
            <div className="friends-suggesion-card-all-friends">
              {suggesions?.map((frd, index) => (
                <div className="friends-suggesion-card-friend" key={index}>
                  <span>
                    <div className="friends-suggesion-card-friend-img">
                      <img src={frd?.profileUrl} alt="profile-pic" />
                    </div>
                    <Link
                      to={`/profile/${frd?._id}`}
                      className="friends-suggesion-card-friend-titles"
                    >
                      <b className="frd-name">{frd?.fullName}</b>
                      <span className="frd-headline">{frd?.headline}</span>
                    </Link>
                  </span>
                  <div className="friends-suggesion-card-friend-requist" onClick={() => onConnect && onConnect(frd?._id)} style={{cursor: "pointer"}}>
                    <i className={getConnectLabel(frd?._id).icon}></i> {getConnectLabel(frd?._id).label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllFrdsSuggesions;
