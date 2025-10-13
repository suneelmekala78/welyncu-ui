import React, { useEffect, useRef, useState } from "react";
import "./posts.css";
import { deletePost } from "../../helper/apis";
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

  useEffect(() => {
    setMedia(post?.media || []);

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
              <div className="more-item cp p-10">
                <i className="fa fa-pen-to-square"></i> <span>Edit</span>
              </div>
            )}
            {post?.user?._id !== user?._id && (
              <div className="more-item cp p-10">
                <i className="fa fa-flag"></i> <span>Report</span>
              </div>
            )}
            {post?.user?._id === user?._id && (
              <div
                className="more-item cp p-10"
                onClick={() => handlePostDelete(post?._id)}
              >
                <i className="fa fa-trash"></i> <span>Delete</span>
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
                    muted={true} // Start muted; unmute on scroll
                    // controls
                  ></video>
                )}
                {p?.mediaType === "video" && (
                  <i class="fa-solid fa-volume-high"></i>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="post-card-bottom">
        <div className="post-btns">
          <div className="post-btn">
            <i className="fa-regular fa-heart"></i>
            <span>19</span>
          </div>
          <div className="post-btn">
            <i className="fa-regular fa-comment"></i>
            <span>3</span>
          </div>
          <div className="post-btn">
            <i className="fa fa-share"></i>
            <span>5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
