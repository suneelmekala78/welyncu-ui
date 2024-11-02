import React from "react";

const RespondInvite = () => {
  return (
    <>
      <div className="popup-section popup-section-active">
        <div className="popup-container box-shadow p-15">
          <div className="invite-friend-popup profile-top-details-edit-section">
            <div className="profile-top-details-edit-top">
              <div className="edit-top-title">
                Suneel is inviting you for tic tac toe game.
              </div>
            </div>
            <div className="profile-top-details-edit-bottom">
              <div className="profile-top-details-edit-bottom-left">
                <div className="save-btn">
                  Reject
                </div>
              </div>
              <div className="profile-top-details-edit-bottom-right">
                <div className="save-btn">
                  Accept
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RespondInvite;
