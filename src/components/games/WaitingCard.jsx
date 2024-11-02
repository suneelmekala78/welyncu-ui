import React from "react";

const WaitingCard = ({ setWaiting }) => {
  return (
    <div className="popup-section popup-section-active">
      <div className="popup-container box-shadow p-15">
        <div className="invite-friend-popup profile-top-details-edit-section">
          <div
            className="profile-top-details-edit-top"
            style={{ textAlign: "center" }}
          >
            <div className="edit-top-title" style={{ border: "none" }}>
              Waiting for oponent to join....
            </div>
          </div>
          <div className="profile-top-details-edit-bottom">
            <div className="profile-top-details-edit-bottom-left"></div>
            <div className="profile-top-details-edit-bottom-right">
              <div className="save-btn" onClick={() => setWaiting(false)}>
                Cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingCard;
