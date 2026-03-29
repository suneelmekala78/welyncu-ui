import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFollowingPagesApi } from "../../helper/apis";

const CompaniesCard = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await getFollowingPagesApi();
        if (res?.status === "success") {
          setPages(res.pages || []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPages();
  }, []);

  if (pages.length === 0) return null;

  return (
    <div className="friends-card-section companies-card box-shadow">
      <div className="friends-card-title">Pages you follow</div>
      <div className="friends-card-all-friends">
        {pages.slice(0, 4).map((page) => (
          <Link
            to={`/page/${page.welyncuLink || page._id}`}
            className="friends-card-friend"
            key={page._id}
            style={{ textDecoration: "none" }}
          >
            <span>
              <div className="friends-card-friend-img">
                <img
                  src={page.logo || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"}
                  alt="logo"
                />
              </div>
              <div className="friends-card-friend-titles">
                <b>{page.name}</b>
                <span>{page.industry || ""}</span>
              </div>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompaniesCard;