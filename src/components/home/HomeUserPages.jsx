import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyPagesApi } from "../../helper/apis";

const HomeUserPages = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await getMyPagesApi();
        if (res?.status === "success") {
          setPages(res.pages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPages();
  }, []);

  if (pages.length === 0) {
    return (
      <div className="friends-card-section user-pages-card cp">
        <div className="friends-card-title">My Pages</div>
        <Link to="/create-page" className="btn" style={{display: "block", textAlign: "center", padding: "10px", fontSize: "13px"}}>
          <i className="fa fa-plus"></i> Create a Page
        </Link>
      </div>
    );
  }

  return (
    <div className="friends-card-section user-pages-card cp">
      <div className="friends-card-title">My Pages</div>
      <div className="friends-card-all-friends user-all-pages">
        {pages.map((page) => (
          <Link
            to={`/page/${page.welyncuLink || page._id}`}
            className="friends-card-friend user-page"
            key={page._id}
          >
            <span>
              <div className="friends-card-friend-img">
                <img
                  src={
                    page.logo ||
                    "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
                  }
                  alt="logo"
                />
              </div>
              <div className="friends-card-friend-titles">
                <b>{page.name}</b>
                <span>{page.followers?.length || 0} followers</span>
              </div>
            </span>
          </Link>
        ))}
      </div>
      <Link to="/create-page" className="btn" style={{display: "block", textAlign: "center", padding: "8px", fontSize: "13px"}}>
        <i className="fa fa-plus"></i> Create a Page
      </Link>
    </div>
  );
};

export default HomeUserPages;
