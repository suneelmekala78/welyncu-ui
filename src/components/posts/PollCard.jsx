import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { votePollApi, likePostApi, deletePost } from "../../helper/apis";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

const PollCard = ({ post, getPosts }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [poll, setPoll] = useState(post?.poll);
  const [liked, setLiked] = useState(
    post?.likes?.some((lid) => lid === user?._id || lid?._id === user?._id) || false
  );
  const [likeCount, setLikeCount] = useState(post?.likes?.length || 0);
  const [moreBtn, setMoreBtn] = useState(false);

  const totalVotes = poll?.options?.reduce((sum, o) => sum + (o.votes?.length || 0), 0) || 0;
  const userVotedIndex = poll?.options?.findIndex((o) =>
    o.votes?.some((v) => (v._id || v) === user?._id)
  );
  const hasVoted = userVotedIndex >= 0;
  const isExpired = poll?.expiresAt && new Date() > new Date(poll.expiresAt);

  const handleVote = async (index) => {
    if (isExpired) return;
    const res = await votePollApi(post._id, index);
    if (res?.status === "success") {
      setPoll(res.data.poll);
    }
  };

  const handleDelete = async () => {
    const res = await deletePost(post._id, dispatch);
    if (res?.status === "success") {
      toast.success(res?.message);
      getPosts();
    }
  };

  return (
    <div className="post-card-section">
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
              <div className="more-item cp p-10" onClick={handleDelete}>
                <i className="fa fa-trash"></i> <span>Delete</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="poll-content">
        <div className="poll-icon-badge">
          <i className="fa-solid fa-square-poll-vertical"></i> Poll
        </div>
        <h3 className="poll-question">{poll?.question}</h3>
        {post?.caption && <p className="poll-caption">{post.caption}</p>}

        <div className="poll-options">
          {poll?.options?.map((opt, i) => {
            const pct = totalVotes > 0 ? Math.round((opt.votes?.length / totalVotes) * 100) : 0;
            const isSelected = userVotedIndex === i;

            return (
              <div
                key={i}
                className={`poll-option ${hasVoted || isExpired ? "voted" : "clickable"} ${isSelected ? "selected" : ""}`}
                onClick={() => !hasVoted && !isExpired && handleVote(i)}
              >
                {(hasVoted || isExpired) && (
                  <div className="poll-option-bar" style={{ width: `${pct}%` }}></div>
                )}
                <span className="poll-option-text">{opt.text}</span>
                {(hasVoted || isExpired) && (
                  <span className="poll-option-pct">{pct}%</span>
                )}
                {isSelected && <i className="fa fa-check poll-check"></i>}
              </div>
            );
          })}
        </div>

        <div className="poll-meta">
          <span>{totalVotes} vote{totalVotes !== 1 ? "s" : ""}</span>
          {poll?.expiresAt && (
            <span>
              {isExpired
                ? "Poll ended"
                : `Ends ${moment(poll.expiresAt).fromNow()}`}
            </span>
          )}
        </div>
      </div>

      <div className="post-card-bottom">
        <div className="post-btns">
          <div className={`post-btn ${liked ? "post-btn-active" : ""}`} onClick={async () => {
            setLiked(!liked);
            setLikeCount((p) => liked ? p - 1 : p + 1);
            await likePostApi(post?._id);
          }}>
            <i className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
            <span>Like{likeCount > 0 ? ` (${likeCount})` : ""}</span>
          </div>
          <div className="post-btn">
            <i className="fa fa-share"></i>
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollCard;
