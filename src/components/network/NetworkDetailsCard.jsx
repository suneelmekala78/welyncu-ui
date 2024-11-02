import React from "react";

const NetworkDetailsCard = () => {
  return (
    <div className="network-details-card box-shadow">
      <div className="network-details-title">Manage my network</div>
      <div className="network-details-item">
        <div className="ndi-left">
          <i className="fa fa-user-group"></i> Connections
        </div>{" "}
        <div className="details-num">6,210</div>
      </div>
      <div className="network-details-item">
        <div className="ndi-left">
          <i className="fa fa-user-plus"></i> Followers
        </div>{" "}
        <div className="details-num">7,100</div>
      </div>
      <div className="network-details-item">
        <div className="ndi-left">
          <i className="fa fa-list"></i> Pages
        </div>{" "}
        <div className="details-num">10</div>
      </div>
      <div className="network-details-item">
        <div className="ndi-left">
          <i className="fa fa-comments"></i> Groups
        </div>{" "}
        <div className="details-num">8</div>
      </div>
      <div className="network-details-item">
        <div className="ndi-left">
          <i className="fa fa-hashtag"></i> Hashtags
        </div>{" "}
        <div className="details-num">5</div>
      </div>
    </div>
  );
};

export default NetworkDetailsCard;
