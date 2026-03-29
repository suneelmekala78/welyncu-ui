import React, { useEffect, useState } from "react";
import "../components/single-post/singlePost.css";
import TopNav from "../components/topnav/TopNav";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPostApi, likePostApi, commentPostApi } from "../helper/apis";
import moment from "moment";

const SinglePost = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await getPostApi(id);
      if (res?.status === "success") {
        setPost(res.data);
        setLiked(res.data.likes?.some((l) => l === user?._id || l?._id === user?._id));
      }
    })();
  }, [id, user?._id]);

  const handleLike = async () => {
    setLiked(!liked);
    const res = await likePostApi(post._id);
    if (res?.status === "success") setPost(res.data);
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    const res = await commentPostApi(post._id, commentText.trim());
    if (res?.status === "success") {
      setPost(res.data);
      setCommentText("");
    }
  };

  if (!post) {
    return (
      <>
        <TopNav />
        <div className="single-post-page" style={{ textAlign: "center", paddingTop: "100px", color: "#999" }}>
          Loading post...
        </div>
      </>
    );
  }

  return (
    <>
      <TopNav />
      <div className="single-post-page">
        <div className="single-post-left">
          <div className="single-post-left-top-section box-shadow mb-10">
            {post.media?.length > 0 && post.media[0].mediaType === "video" && (
              <video src={post.media[0].url} controls></video>
            )}
            {post.media?.length > 0 && post.media[0].mediaType === "image" && (
              <img src={post.media[0].url} alt="post" style={{ width: "100%" }} />
            )}
            <div className="single-post-details p-15">
              {post.caption && <h2>{post.caption}</h2>}
              <div className="single-post-inputs">
                <div className="single-post-inputs-left">
                  <Link to={`/profile/${post.user?._id}`}>
                    <img src={post.user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"} alt="profile" />
                  </Link>
                  <div className="single-post-inputs-left-texts">
                    <Link to={`/profile/${post.user?._id}`}><b>{post.user?.fullName}</b></Link>
                    <span>{post.user?.headline}</span>
                  </div>
                </div>
                <div className="single-post-inputs-right">
                  <div className="single-post-inputs-right-reactions">
                    <div className="single-post-inputs-right-reaction" onClick={handleLike} style={{ cursor: "pointer" }}>
                      <i className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={liked ? { color: "#ff4d6d" } : {}}></i>
                      <span>{post.likes?.length || 0}</span>
                    </div>
                    <div className="single-post-inputs-right-reaction">
                      <i className="fa-solid fa-share"></i> <span>Share</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {post.caption && (
            <div className="single-post-description-section box-shadow mb-10 p-15">
              <div className="single-post-description-top mb-10">
                <span>{post.likes?.length || 0} likes</span>
                <span>{moment(post.createdAt).fromNow()}</span>
              </div>
              <div className="single-post-description-bottom">
                <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{post.caption}</pre>
              </div>
            </div>
          )}
        </div>

        <div className="single-post-right">
          <div className="single-post-comments box-shadow p-15">
            <div className="single-post-comments-title">Comments ({post.comments?.length || 0})</div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <img src={user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"} alt="me" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleComment()}
                style={{ flex: 1, padding: "8px 14px", borderRadius: 20, border: "1px solid rgba(128,128,128,0.3)", background: "transparent", color: "inherit", fontSize: 13, outline: "none" }}
              />
            </div>

            <div className="all-comments">
              {post.comments?.map((c, i) => (
                <div className="comment box-shadow" key={i}>
                  <div className="comment-top">
                    <img src={c.user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"} alt="" />
                    <div className="commenter-details">
                      <b>{c.user?.fullName}</b>
                      <span>{moment(c.createdAt).fromNow()}</span>
                    </div>
                  </div>
                  <div className="comment-text">{c.text}</div>
                </div>
              ))}
              {(!post.comments || post.comments.length === 0) && (
                <div style={{ color: "#999", textAlign: "center", padding: "20px 0" }}>No comments yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
