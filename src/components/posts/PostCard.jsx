import React, { useEffect, useRef, useState, useCallback } from "react";
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
  const [editingPost, setEditingPost] = useState(false);
  const [editCaption, setEditCaption] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [commentMenuId, setCommentMenuId] = useState(null);
  const [likeAnim, setLikeAnim] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});

  // Custom video controls state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [showVideoControls, setShowVideoControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const maxLines = 3;
  const videoRefs = useRef([]);
  const mediaContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const lastTapRef = useRef(0);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  const isTextLong = (text) => {
    if (!text) return false;
    return text.split("\n").length > maxLines || text.length > 200;
  };

  const PreviousPost = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const NextPost = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  // Double-tap to like
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (!liked) {
        setLiked(true);
        setLikeCount((p) => p + 1);
        likePostApi(post?._id);
      }
      setLikeAnim(true);
      setTimeout(() => setLikeAnim(false), 800);
    }
    lastTapRef.current = now;
  };

  // Video control helpers
  const activeVideo = videoRefs.current[currentIndex];

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!activeVideo) return;
    if (activeVideo.paused) {
      activeVideo.play().catch(() => {});
      setIsPlaying(true);
    } else {
      activeVideo.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!activeVideo) return;
    activeVideo.muted = !activeVideo.muted;
    setIsMuted(activeVideo.muted);
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!activeVideo) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    activeVideo.currentTime = pct * activeVideo.duration;
  };

  const toggleFullscreen = (e) => {
    e?.stopPropagation();
    if (!mediaContainerRef.current) return;
    if (!document.fullscreenElement) {
      mediaContainerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const showControlsTemporarily = useCallback(() => {
    setShowVideoControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowVideoControls(false);
    }, 3000);
  }, [isPlaying]);

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

  useEffect(() => {
    setMedia(post?.media || []);
    setLiked(post?.likes?.some((lid) => lid === user?._id || lid?._id === user?._id) || false);
    setLikeCount(post?.likes?.length || 0);
    setComments(post?.comments || []);
  }, [post, user?._id]);

  // IntersectionObserver for auto-play/pause videos
  useEffect(() => {
    const observers = [];
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const handlePlayVideo = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && index === currentIndex) {
              if (video.paused) {
                video.play().catch(() => {});
                setIsPlaying(true);
              }
            } else {
              video.pause();
              setIsPlaying(false);
            }
          });
        };
        const observer = new IntersectionObserver(handlePlayVideo, { threshold: 0.6 });
        observer.observe(video);
        observers.push(observer);
      }
    });
    return () => {
      observers.forEach((obs, i) => {
        if (videoRefs.current[i]) obs.unobserve(videoRefs.current[i]);
      });
    };
  }, [media, currentIndex]);

  // Video time updates
  useEffect(() => {
    const video = videoRefs.current[currentIndex];
    if (!video) return;
    const onTimeUpdate = () => {
      setVideoCurrentTime(video.currentTime);
      setVideoProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
    };
    const onLoadMeta = () => setVideoDuration(video.duration);
    const onEnded = () => { setIsPlaying(false); setShowVideoControls(true); };
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadMeta);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadMeta);
      video.removeEventListener("ended", onEnded);
    };
  }, [currentIndex, media]);

  // Fullscreen change listener
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const currentMedia = media[currentIndex];
  const isVideo = currentMedia?.mediaType === "video";

  return (
    <div className="post-card-section">
      {/* Header */}
      <div className="post-card-top">
        <div className="post-card-top-left">
          <Link to={`/profile/${post?.user?._id}`} className="post-card-top-left-img">
            <img
              src={post?.user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"}
              alt="profile-pic"
            />
          </Link>
          <div className="post-card-top-left-titles">
            <Link to={`/profile/${post?.user?._id}`} className="person-name">
              {post?.user?.fullName}
            </Link>
            <span className="person-title">{post?.user?.headline}</span>
            <span className="posted-time">{moment(post?.createdAt).fromNow()}</span>
          </div>
        </div>
        <div className="post-card-top-right more-btn" onClick={() => setMoreBtn(!moreBtn)}>
          <i className="fa fa-ellipsis-vertical"></i>
          <div className={moreBtn ? "more-container more-container-active box-shadow" : "more-container box-shadow"}>
            {post?.user?._id === user?._id && (
              <>
                <div className="more-item cp p-10" onClick={() => { setEditCaption(post?.caption || ""); setEditingPost(true); setMoreBtn(false); }}>
                  <i className="fa fa-pen"></i> <span>Edit</span>
                </div>
                <div className="more-item cp p-10" onClick={() => handlePostDelete(post?._id)}>
                  <i className="fa fa-trash"></i> <span>Delete</span>
                </div>
              </>
            )}
            {post?.user?._id !== user?._id && (
              <div className="more-item cp p-10" onClick={handlePostReport}>
                <i className="fa fa-flag"></i> <span>Report</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="post-card-mid">
        {post?.caption && (
          <div className="post-description">
            <pre className="custom-pre see-more">
              {isExpanded || !isTextLong(post?.caption)
                ? post?.caption
                : post?.caption.split("\n").slice(0, maxLines).join("\n").substring(0, 200)}
              {isTextLong(post?.caption) && (
                <span className="cp see-more-btn" onClick={handleToggle}>
                  {isExpanded ? " ...see less" : " ...see more"}
                </span>
              )}
            </pre>
          </div>
        )}

        {/* Media */}
        {media.length > 0 && (
          <div
            className={`media-container ${isVideo ? "media-video-mode" : "media-image-mode"}`}
            ref={mediaContainerRef}
            onClick={handleDoubleTap}
            onMouseMove={isVideo ? showControlsTemporarily : undefined}
          >
            {/* Like animation */}
            {likeAnim && (
              <div className="post-like-anim">
                <i className="fa-solid fa-heart"></i>
              </div>
            )}

            {/* Carousel arrows */}
            {media.length > 1 && (
              <>
                <div className="media-nav media-nav-left" onClick={PreviousPost}>
                  <i className="fa fa-chevron-left"></i>
                </div>
                <div className="media-nav media-nav-right" onClick={NextPost}>
                  <i className="fa fa-chevron-right"></i>
                </div>
              </>
            )}

            {/* Carousel counter */}
            {media.length > 1 && (
              <div className="media-counter">{currentIndex + 1} / {media.length}</div>
            )}

            {/* Carousel dots */}
            {media.length > 1 && (
              <div className="post-dots">
                {media.map((_, index) => (
                  <div
                    className={currentIndex === index ? "post-dot active-dot" : "post-dot"}
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                    key={index}
                  ></div>
                ))}
              </div>
            )}

            {/* Media items */}
            {media.map((p, index) => (
              <div
                key={index}
                className={currentIndex === index ? "media-slide media-slide-active" : "media-slide"}
              >
                {p?.mediaType === "image" && (
                  <div className="post-image-wrapper">
                    {!imageLoaded[index] && <div className="post-image-skeleton"></div>}
                    <img
                      src={p?.url}
                      alt="post-img"
                      className="post-image"
                      onLoad={() => setImageLoaded((prev) => ({ ...prev, [index]: true }))}
                      style={{ opacity: imageLoaded[index] ? 1 : 0 }}
                    />
                  </div>
                )}
                {p?.mediaType === "video" && (
                  <video
                    src={p?.url}
                    className="post-video"
                    ref={(el) => (videoRefs.current[index] = el)}
                    loop
                    muted={isMuted}
                    playsInline
                    onClick={(e) => { e.stopPropagation(); togglePlay(e); }}
                  ></video>
                )}
              </div>
            ))}

            {/* Custom video controls */}
            {isVideo && (
              <div className={`video-controls ${showVideoControls ? "video-controls-visible" : ""}`}>
                <div className="video-progress-bar" onClick={handleSeek}>
                  <div className="video-progress-fill" style={{ width: `${videoProgress}%` }}>
                    <div className="video-progress-thumb"></div>
                  </div>
                </div>
                <div className="video-controls-row">
                  <div className="video-controls-left">
                    <button className="video-ctrl-btn" onClick={togglePlay}>
                      <i className={isPlaying ? "fa fa-pause" : "fa fa-play"}></i>
                    </button>
                    <button className="video-ctrl-btn" onClick={toggleMute}>
                      <i className={isMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high"}></i>
                    </button>
                    <span className="video-time">{formatTime(videoCurrentTime)} / {formatTime(videoDuration)}</span>
                  </div>
                  <div className="video-controls-right">
                    <button className="video-ctrl-btn" onClick={toggleFullscreen}>
                      <i className={isFullscreen ? "fa fa-compress" : "fa fa-expand"}></i>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Big play button overlay for paused video */}
            {isVideo && !isPlaying && (
              <div className="video-big-play" onClick={togglePlay}>
                <i className="fa fa-play"></i>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="post-card-bottom">
        <div className="post-stats">
          {likeCount > 0 && (
            <span>
              <i className="fa-solid fa-heart" style={{ color: "#ff4d6d", marginRight: 4, fontSize: 12 }}></i>
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </span>
          )}
          {comments.length > 0 && (
            <span className="cp" onClick={() => setShowComments(!showComments)}>
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </span>
          )}
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
            <i className="fa-regular fa-paper-plane"></i>
            <span>Share</span>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="post-comments-section">
            <div className="post-comment-input">
              <img src={user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"} alt="me" />
              <div className="post-comment-input-wrap">
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
                {commentText.trim() && (
                  <button className="comment-send-btn" onClick={async () => {
                    if (commentText.trim()) {
                      const res = await commentPostApi(post?._id, commentText.trim());
                      if (res?.status === "success") {
                        setComments(res.data.comments);
                        setCommentText("");
                      }
                    }
                  }}>
                    <i className="fa fa-paper-plane"></i>
                  </button>
                )}
              </div>
            </div>
            {comments.map((c, i) => (
              <div key={c._id || i} className="post-comment-item">
                <Link to={`/profile/${c.user?._id}`}>
                  <img src={c.user?.profileUrl || "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"} alt="" />
                </Link>
                <div className="post-comment-body">
                  <div className="post-comment-header">
                    <Link to={`/profile/${c.user?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <b>{c.user?.fullName}</b>
                    </Link>
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
