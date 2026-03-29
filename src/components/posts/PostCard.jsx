import React, { useEffect, useRef, useState } from "react";
import "./posts.css";
import { deletePost, likePostApi, commentPostApi, editPostApi, editCommentApi, deleteCommentApi, reportPostApi, reportCommentApi } from "../../helper/apis";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

const PostCard = ({ post, getPosts }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [moreBtn, setMoreBtn] = useState(false);
  const [media, setMedia] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [editingPost, setEditingPost] = useState(false);
  const [editCaption, setEditCaption] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [commentMenuId, setCommentMenuId] = useState(null);
  const maxLines = 2;
  const videoRefs = useRef([]);
  
  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const isTextLong = (text) => {
    if (!text) return false;
    const lines = text.split("\n");
    return lines.length > maxLines;
  };

  const PreviousPost = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  const NextPost = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePostDelete = async (id) => {
    try {
      const res = await deletePost(id, dispatch);
      if (res?.status === "success") {
        toast.success(res?.message);
        getPosts();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostEdit = async () => {
    try {
      const res = await editPostApi(post?._id, editCaption);
      if (res?.status === "success") {
        toast.success("Post updated");
        setEditingPost(false);
        getPosts();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostReport = async () => {
    try {
      const res = await reportPostApi(post?._id, "Inappropriate content");
      if (res?.status === "success") {
        toast.success(res?.message);
      }
      setMoreBtn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentEdit = async (commentId) => {
    if (!editCommentText.trim()) return;
    try {
      const res = await editCommentApi(post?._id, commentId, editCommentText.trim());
      if (res?.status === "success") {
        setComments(res.data.comments);
        setEditingCommentId(null);
        setEditCommentText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const res = await deleteCommentApi(post?._id, commentId);
      if (res?.status === "success") {
        setComments(res.data.comments);
        toast.success("Comment deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentReport = async (commentId) => {
    try {
      const res = await reportCommentApi(post?._id, commentId);
      if (res?.status === "success") {
        toast.success(res?.message);
      }
      setCommentMenuId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      videoRefs.current.forEach((v) => {
        if (v) v.muted = !prev;
      });
      return !prev;
    });
  };

  useEffect(() => {
    setMedia(post?.media || []);
    setLiked(post?.likes?.some((lid) => lid === user?._id || lid?._id === user?._id) || false);
    setLikeCount(post?.likes?.length || 0);
    setComments(post?.comments || []);

    const observers = [];

    videoRefs.current.forEach((video, index) => {
      if (video) {
        const handlePlayVideo = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && index === currentIndex) {
              if (video.paused) {
                video
                  .play()
                  .catch((error) =>
                    console.error("Error playing video:", error)
                  );
                video.muted = false; // Unmute video when 60% in view
              }
            } else {
              video.pause();
            }
          });
        };

        const observer = new IntersectionObserver(handlePlayVideo, {
          threshold: 0.6, // 60% visibility
        });

        observer.observe(video);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer, index) => {
        if (videoRefs.current[index])
          observer.unobserve(videoRefs.current[index]);
      });
    };
  }, [post, currentIndex]);

  return (
    <div className="post-card-section">
      <div className="post-card-top">
        <div className="post-card-top-left">
          <Link
            to={`/profile/${post?.user?._id}`}
            className="post-card-top-left-img"
          >
            <img
              src={
                post?.user?.profileUrl ||
                "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
              }
              alt="profile-pic"
            />
          </Link>
          <div className="post-card-top-left-titles">
            <Link to={`/profile/${post?.user?._id}`} className="person-name">
              {post?.user?.fullName}
            </Link>
            <span className="person-title">{post?.user?.headline}</span>
            <span className="posted-time">
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div
          className="post-card-top-right more-btn"
          onClick={() => setMoreBtn(!moreBtn)}
        >
          <i className="fa fa-ellipsis-vertical"></i>
          <div
            className={
              moreBtn
                ? "more-container more-container-active box-shadow"
                : "more-container box-shadow"
            }
          >
            {post?.user?._id === user?._id && (
              <>
                <div
                  className="more-item cp p-10"
                  onClick={() => {
                    setEditCaption(post?.caption || "");
                    setEditingPost(true);
                    setMoreBtn(false);
                  }}
                >
                  <i className="fa fa-pen"></i> <span>Edit</span>
                </div>
                <div
                  className="more-item cp p-10"
                  onClick={() => handlePostDelete(post?._id)}
                >
                  <i className="fa fa-trash"></i> <span>Delete</span>
                </div>
              </>
            )}
            {post?.user?._id !== user?._id && (
              <div
                className="more-item cp p-10"
                onClick={handlePostReport}
              >
                <i className="fa fa-flag"></i> <span>Report</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="post-card-mid">
        <div className="post-description">
          <pre className="custom-pre see-more">
            {isExpanded || !isTextLong(post?.caption)
              ? post?.caption
              : post?.caption.split("\n").slice(0, maxLines).join("\n")}
            {isTextLong(post?.caption) && (
              <span className="cp see-more-btn" onClick={handleToggle}>
                {isExpanded ? "...see less" : "...see more"}
              </span>
            )}
          </pre>
        </div>

        {post?.media?.length > 0 && (
          <div className="media-container">
            {post?.media.length > 1 && (
              <>
                <i
                  className="fa fa-angle-left"
                  style={{ zIndex: 5 }}
                  onClick={PreviousPost}
                ></i>
                <i
                  className="fa fa-angle-right"
                  style={{ zIndex: 5 }}
                  onClick={NextPost}
                ></i>
              </>
            )}

            {post?.media.length > 1 && (
              <div className="post-dots">
                {post.media.map((_, index) => (
                  <div
                    className={
                      currentIndex === index
                        ? "post-dot active-dot"
                        : "post-dot"
                    }
                    onClick={() => setCurrentIndex(index)}
                    key={index}
                  ></div>
                ))}
              </div>
            )}

            {/* <i class="fa-solid fa-volume-xmark"></i> */}

            {post?.media?.map((p, index) => (
              <div
                key={index}
                className={currentIndex === index ? "no-styles" : "post-hidden"}
              >
                {p?.mediaType === "image" && (
                  <img
                    src={p?.url}
                    alt="post-img"
                    className={`media-${post?.style}`}
                  />
                )}
                {p?.mediaType === "video" && (
                  <video
                    src={p?.url}
                    className={`media-${post?.style}`}
                    ref={(el) => (videoRefs.current[index] = el)}
                    autoPlay
                    loop
                    muted={isMuted}
                    controls
                  ></video>
                )}
              </div>
            ))}

            {post?.media?.some((p) => p.mediaType === "video") && (
              <i
                className={isMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high"}
                onClick={toggleMute}
                style={{ zIndex: 5 }}
              ></i>
            )}
          </div>
        )}
      </div>

      <div className="post-card-bottom">
        <div className="post-stats">
          {likeCount > 0 && <span>{likeCount} {likeCount === 1 ? "like" : "likes"}</span>}
          {comments.length > 0 && <span className="cp" onClick={() => setShowComments(!showComments)}>{comments.length} {comments.length === 1 ? "comment" : "comments"}</span>}
        </div>
        <div className="post-btns">
          <div className={`post-btn ${liked ? "post-btn-active" : ""}`} onClick={async () => {
            setLiked(!liked);
            setLikeCount((p) => liked ? p - 1 : p + 1);
            await likePostApi(post?._id);
          }}>
            <i className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
            <span>Like</span>
          </div>
          <div className="post-btn" onClick={() => setShowComments(!showComments)}>
            <i className="fa-regular fa-comment"></i>
            <span>Comment</span>
          </div>
          <div className="post-btn">
            <i className="fa fa-share"></i>
            <span>Share</span>
          </div>
        </div>
        {showComments && (
          <div className="post-comments-section">
            <div className="post-comment-input">
              <img src={user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"} alt="me" />
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === "Enter" && commentText.trim()) {
                    const res = await commentPostApi(post?._id, commentText.trim());
                    if (res?.status === "success") {
                      setComments(res.data.comments);
                      setCommentText("");
                    }
                  }
                }}
              />
            </div>
            {comments.map((c, i) => (
              <div key={c._id || i} className="post-comment-item">
                <img src={c.user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"} alt="" />
                <div className="post-comment-body">
                  <div className="post-comment-header">
                    <b>{c.user?.fullName}</b>
                    <div className="post-comment-actions-wrap">
                      <i className="fa fa-ellipsis-vertical post-comment-menu-btn" onClick={() => setCommentMenuId(commentMenuId === c._id ? null : c._id)}></i>
                      {commentMenuId === c._id && (
                        <div className="post-comment-menu box-shadow">
                          {c.user?._id === user?._id && (
                            <>
                              <div className="more-item cp p-10" onClick={() => { setEditingCommentId(c._id); setEditCommentText(c.text); setCommentMenuId(null); }}>
                                <i className="fa fa-pen"></i> <span>Edit</span>
                              </div>
                              <div className="more-item cp p-10" onClick={() => { handleCommentDelete(c._id); setCommentMenuId(null); }}>
                                <i className="fa fa-trash"></i> <span>Delete</span>
                              </div>
                            </>
                          )}
                          {post?.user?._id === user?._id && c.user?._id !== user?._id && (
                            <div className="more-item cp p-10" onClick={() => { handleCommentDelete(c._id); setCommentMenuId(null); }}>
                              <i className="fa fa-trash"></i> <span>Delete</span>
                            </div>
                          )}
                          {c.user?._id !== user?._id && (
                            <div className="more-item cp p-10" onClick={() => handleCommentReport(c._id)}>
                              <i className="fa fa-flag"></i> <span>Report</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {editingCommentId === c._id ? (
                    <div className="post-comment-edit-row">
                      <input
                        type="text"
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleCommentEdit(c._id)}
                      />
                      <i className="fa fa-check" onClick={() => handleCommentEdit(c._id)}></i>
                      <i className="fa fa-times" onClick={() => setEditingCommentId(null)}></i>
                    </div>
                  ) : (
                    <p>{c.text}</p>
                  )}
                  <span className="post-comment-time">{moment(c.createdAt).fromNow()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Post Popup */}
      {editingPost && (
        <div className="popup-section popup-section-active">
          <div className="popup-container box-shadow p-15 post-upload-box">
            <i className="fa fa-xmark" onClick={() => setEditingPost(false)}></i>
            <div className="profile-top-details-edit-section">
              <div className="profile-top-details-edit-top">
                <div className="edit-top-title">Edit Post</div>
              </div>
              <textarea
                className="about-text"
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                placeholder="Edit your post..."
              ></textarea>
            </div>
            <div className="profile-top-details-edit-bottom">
              <div className="profile-top-details-edit-bottom-left"></div>
              <div className="profile-top-details-edit-bottom-right">
                <span className="save-btn btn-background" onClick={handlePostEdit}>
                  Save
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
