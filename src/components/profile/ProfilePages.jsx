import React from "react";

const ProfilePages = () => {
  return (
    <div className="profile-pages-section mt-10 mb-10 box-shadow">
      <div className="profile-posts-top-filters">
        <div className="profile-posts-top-filter active">My Pages</div>
        <div className="profile-posts-top-filter">Following</div>
      </div>

      <div className="all-profile-pages">
        <div className="profile-page box-shadow">
          <div className="profile-page-left">
            <img
              src="https://www.androidpolice.com/wp-content/uploads/2019/12/google-logo-hd.png"
              alt="page-pic"
            />
            <div className="pages-card-texts">
              <b>Google</b>
              <span>1,305 following</span>
            </div>
          </div>
          <div className="profile-page-right">
            <span className="ellipsis">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </span>
            <span className="follow-btn">
              <i className="fa fa-plus"></i> Follow
            </span>
          </div>
        </div>
        <div className="profile-page box-shadow">
          <div className="profile-page-left">
            <img
              src="https://www.androidpolice.com/wp-content/uploads/2019/12/google-logo-hd.png"
              alt="page-pic"
            />
            <div className="pages-card-texts">
              <b>Google</b>
              <span>1,305 following</span>
            </div>
          </div>
          <div className="profile-page-right">
            <span className="ellipsis">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </span>
            <span className="follow-btn">
              <i className="fa fa-plus"></i> Follow
            </span>
          </div>
        </div>
        <div className="profile-page box-shadow">
          <div className="profile-page-left">
            <img
              src="https://www.androidpolice.com/wp-content/uploads/2019/12/google-logo-hd.png"
              alt="page-pic"
            />
            <div className="pages-card-texts">
              <b>Google</b>
              <span>1,305 following</span>
            </div>
          </div>
          <div className="profile-page-right">
            <span className="ellipsis">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </span>
            <span className="follow-btn">
              <i className="fa fa-plus"></i> Follow
            </span>
          </div>
        </div>
        <div className="profile-page box-shadow">
          <div className="profile-page-left">
            <img
              src="https://www.androidpolice.com/wp-content/uploads/2019/12/google-logo-hd.png"
              alt="page-pic"
            />
            <div className="pages-card-texts">
              <b>Google</b>
              <span>1,305 following</span>
            </div>
          </div>
          <div className="profile-page-right">
            <span className="ellipsis">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </span>
            <span className="follow-btn">
              <i className="fa fa-plus"></i> Follow
            </span>
          </div>
        </div>
        <div className="profile-page box-shadow">
          <div className="profile-page-left">
            <img
              src="https://www.androidpolice.com/wp-content/uploads/2019/12/google-logo-hd.png"
              alt="page-pic"
            />
            <div className="pages-card-texts">
              <b>Google</b>
              <span>1,305 following</span>
            </div>
          </div>
          <div className="profile-page-right">
            <span className="ellipsis">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </span>
            <span className="follow-btn">
              <i className="fa fa-plus"></i> Follow
            </span>
          </div>
        </div>
        <div className="create-page-box cp box-shadow">
          <span>
            <i className="fa fa-plus"></i> Create New Page
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePages;
