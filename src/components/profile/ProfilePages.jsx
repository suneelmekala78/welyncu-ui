import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserPagesApi, getFollowingPagesApi, followPageApi } from "../../helper/apis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfilePages = ({ user }) => {
  const { userId } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [tab, setTab] = useState("my");
  const [myPages, setMyPages] = useState([]);
  const [followingPages, setFollowingPages] = useState([]);

  const isOwnProfile = user?._id === userId;

  const fetchMyPages = async () => {
    try {
      const res = await getUserPagesApi(user?._id);
      if (res?.status === "success") setMyPages(res.pages);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFollowingPages = async () => {
    try {
      const res = await getFollowingPagesApi();
      if (res?.status === "success") setFollowingPages(res.pages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (pageId) => {
    try {
      const res = await followPageApi(pageId);
      if (res?.status === "success") {
        toast.success(res.message);
        fetchFollowingPages();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchMyPages();
      if (isOwnProfile) fetchFollowingPages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  const activePagesData = tab === "my" ? myPages : followingPages;

  return (
    <div className="profile-pages-section mt-10 mb-10 box-shadow">
      <div className="profile-posts-top-filters">
        <div
          className={`profile-posts-top-filter ${tab === "my" ? "active" : ""}`}
          onClick={() => setTab("my")}
        >
          My Pages
        </div>
        {isOwnProfile && (
          <div
            className={`profile-posts-top-filter ${tab === "following" ? "active" : ""}`}
            onClick={() => setTab("following")}
          >
            Following
          </div>
        )}
      </div>

      <div className="all-profile-pages">
        {activePagesData.length === 0 ? (
          <div className="noposts-text" style={{ width: "100%", textAlign: "center", padding: "20px" }}>
            {tab === "my" ? "No pages created yet" : "Not following any pages"}
          </div>
        ) : (
          activePagesData.map((page) => (
            <div className="profile-page box-shadow" key={page._id}>
              <Link to={`/page/${page.welyncuLink || page._id}`} className="profile-page-left">
                <img
                  src={
                    page.logo ||
                    "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
                  }
                  alt="page-pic"
                />
                <div className="pages-card-texts">
                  <b>{page.name}</b>
                  <span>{page.followers?.length || 0} followers</span>
                </div>
              </Link>
              <div className="profile-page-right">
                <Link to={`/page/${page.welyncuLink || page._id}`}>
                  <span className="ellipsis">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </span>
                </Link>
                {tab === "following" && (
                  <span className="follow-btn" onClick={() => handleUnfollow(page._id)}>
                    <i className="fa fa-minus"></i> Unfollow
                  </span>
                )}
              </div>
            </div>
          ))
        )}
        {isOwnProfile && (
          <div className="create-page-box cp box-shadow" onClick={() => navigate("/create-page")}>
            <span>
              <i className="fa fa-plus"></i> Create New Page
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePages;
