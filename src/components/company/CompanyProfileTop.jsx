import React from "react";

const CompanyProfileTop = ({ page, onFollow, user }) => {
  const isFollowing = page?.followers?.some(f => (f._id || f) === user?._id);

  return (
    <div className="company-profile-top-section box-shadow">
      <div className="company-top-banner">
        <img
          src={page?.banner || "https://www.wework.com/ideas/wp-content/uploads/sites/4/2017/06/Collab1.jpg"}
          alt="banner-img"
        />
      </div>
      <div className="company-top-details">
        <div className="company-details-left">
          <div className="company-profile-name">
            {page?.name} <i className="fa-regular fa-check-circle"></i>
          </div>
          <div className="company-profile-title">
            {page?.headline}
          </div>
        </div>
        <div className="company-details-right">
          {page?.websiteLink && (
            <div className="company-profile-topbtn company-website-btn" onClick={() => window.open(page.websiteLink, "_blank")}>
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Visit Website
            </div>
          )}
          <div className="company-profile-topbtn company-follow-btn btn-background" onClick={onFollow}>
            <i className={isFollowing ? "fa fa-check" : "fa fa-plus"}></i> {isFollowing ? "Following" : "Follow"}
          </div>
          <div className="company-profile-topbtn company-website-btn more-btn">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileTop;
