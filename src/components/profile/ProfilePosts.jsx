import React, { useEffect, useState } from "react";
import { getUserPostsApi } from "../../helper/apis";
import PostCard from "../posts/PostCard";
import Loader from "../loaders/Loader";

const ProfilePosts = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    if (!user?._id) return;
    setIsLoading(true);
    try {
      const res = await getUserPostsApi(user._id);
      if (res?.data) {
        setPosts(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user?._id]);

  const filteredPosts =
    filter === "all"
      ? posts
      : filter === "photos"
      ? posts.filter((p) => p.media?.some((m) => m.type === "image"))
      : filter === "videos"
      ? posts.filter((p) => p.media?.some((m) => m.type === "video"))
      : filter === "documents"
      ? posts.filter((p) => p.media?.some((m) => m.type === "document"))
      : posts;

  return (
    <div className="profile-posts-section box-shadow p-15 mt-10 mb-10">
      <div className="profile-posts-top">
        <div className="profile-posts-top-filters">
          {["all", "photos", "videos", "documents"].map((f) => (
            <div
              key={f}
              className={`profile-posts-top-filter ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </div>
          ))}
        </div>
      </div>
      <div className="profile-posts-bottom">
        {isLoading ? (
          <Loader />
        ) : filteredPosts.length > 0 ? (
          <div className="all-profile-posts">
            {filteredPosts.map((post) => (
              <div className="all-profile-post" key={post._id}>
                {post.media?.[0]?.type === "video" ? (
                  <video src={post.media[0].url} style={{ width: "100%", borderRadius: "5px" }} />
                ) : post.media?.[0]?.url ? (
                  <img src={post.media[0].url} alt="post" />
                ) : (
                  <div className="box-shadow p-10" style={{ marginBottom: "5px", fontSize: "13px" }}>
                    {post.description?.slice(0, 100)}
                    {post.description?.length > 100 ? "..." : ""}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="noposts-text">No posts yet</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePosts;
