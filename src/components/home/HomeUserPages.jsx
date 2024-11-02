import React from "react";

const HomeUserPages = () => {
  return (
    <div className="friends-card-section user-pages-card cp">
      <div className="friends-card-title">My Pages</div>
      <div className="friends-card-all-friends user-all-pages">
        <div className="friends-card-friend user-page">
          <span>
            <div className="friends-card-friend-img">
              <img
                src="https://cdn.dribbble.com/users/5832433/screenshots/14499634/1___4x.jpg"
                alt="logo"
              />
            </div>
            <div className="friends-card-friend-titles">
              <b>SM Media</b>
              <span>3.2K followers</span>
            </div>
          </span>
        </div>
        <div className="friends-card-friend user-page">
          <span>
            <div className="friends-card-friend-img">
              <img
                src="https://cdn.dribbble.com/users/5832433/screenshots/14499634/1___4x.jpg"
                alt="logo"
              />
            </div>
            <div className="friends-card-friend-titles">
              <b>Hyderabad Real Estate</b>
              <span>20K followers</span>
            </div>
          </span>
        </div>
      </div>
      {/* <div className="btn">See more</div> */}
    </div>
  );
};

export default HomeUserPages;
