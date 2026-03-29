import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  viewStoryApi,
  deleteStoryApi,
  likeStoryApi,
  replyStoryApi,
  getStoryViewersApi,
  votePollStoryApi,
} from "../../helper/apis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const STORY_DURATION = 6000;

const StoryCard = ({ storyView, setStoryView, activeStoryGroup, onRefresh }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showViewers, setShowViewers] = useState(false);
  const [viewers, setViewers] = useState([]);
  const [likeAnim, setLikeAnim] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const replyInputRef = useRef(null);

  const stories = activeStoryGroup?.stories || [];
  const storyUser = activeStoryGroup?.user;
  const currentStory = stories[currentIndex];
  const isOwn = storyUser?._id === user?._id;
  const isLiked = currentStory?.likes?.some(
    (l) => (l.user?._id || l.user) === user?._id
  );

  // Mark story as viewed
  useEffect(() => {
    if (storyView && currentStory?._id) {
      viewStoryApi(currentStory._id);
    }
  }, [storyView, currentStory?._id]);

  // Auto-advance with progress bar
  useEffect(() => {
    if (!storyView || stories.length === 0 || paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return prev;
        return prev + 100 / (STORY_DURATION / 100);
      });
    }, 100);

    timerRef.current = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setStoryView(false);
        setCurrentIndex(0);
      }
    }, STORY_DURATION);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyView, currentIndex, stories.length, paused]);

  // Reset index when opening a new group
  useEffect(() => {
    if (storyView) {
      setCurrentIndex(0);
      setShowViewers(false);
      setShowReplies(false);
      setReplyText("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStoryGroup]);

  const goNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setStoryView(false);
      setCurrentIndex(0);
    }
  }, [currentIndex, stories.length, setStoryView]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleDelete = async () => {
    if (!currentStory?._id) return;
    const res = await deleteStoryApi(currentStory._id);
    if (res?.status === "success") {
      toast.success("Story deleted");
      setStoryView(false);
      if (onRefresh) onRefresh();
    }
  };

  const handleLike = async () => {
    if (!currentStory?._id) return;
    setPaused(true);
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 800);
    await likeStoryApi(currentStory._id);
    // Optimistic toggle
    if (isLiked) {
      currentStory.likes = currentStory.likes.filter(
        (l) => (l.user?._id || l.user) !== user?._id
      );
    } else {
      currentStory.likes = [...(currentStory.likes || []), { user: user?._id }];
    }
    setPaused(false);
  };

  const handleDoubleClick = () => {
    if (!isLiked) handleLike();
    else {
      setLikeAnim(true);
      setTimeout(() => setLikeAnim(false), 800);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !currentStory?._id) return;
    setPaused(true);
    const res = await replyStoryApi(currentStory._id, replyText.trim());
    if (res?.status === "success") {
      toast.success("Reply sent!");
      setReplyText("");
      currentStory.replies = [...(currentStory.replies || []), res.reply];
    }
    setPaused(false);
  };

  const handleShowViewers = async () => {
    if (!currentStory?._id) return;
    setPaused(true);
    setShowViewers(true);
    const res = await getStoryViewersApi(currentStory._id);
    if (res?.status === "success") {
      setViewers(res.viewers);
    }
  };

  const handlePollVote = async (optionIndex) => {
    if (!currentStory?._id) return;
    setPaused(true);
    const res = await votePollStoryApi(currentStory._id, optionIndex);
    if (res?.status === "success") {
      currentStory.poll = res.poll;
    }
    setPaused(false);
  };

  const handleDM = () => {
    setStoryView(false);
    navigate("/messages", {
      state: { targetUserId: storyUser?._id, targetUser: storyUser },
    });
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  // Keyboard navigation
  useEffect(() => {
    if (!storyView) return;
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") { setStoryView(false); setCurrentIndex(0); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [storyView, goNext, goPrev, setStoryView]);

  if (!currentStory) return null;

  // Get total votes for poll
  const totalVotes = currentStory?.poll?.options?.reduce(
    (sum, opt) => sum + (opt.votes?.length || 0), 0
  ) || 0;
  const userVotedIndex = currentStory?.poll?.options?.findIndex(
    (opt) => opt.votes?.some((v) => v === user?._id || v?.toString?.() === user?._id)
  );

  return (
    <div
      className={
        storyView
          ? "story-view-section story-view-section-active"
          : "story-view-section"
      }
      onClick={(e) => {
        if (e.target === e.currentTarget) { setStoryView(false); setCurrentIndex(0); }
      }}
    >
      {/* Close button */}
      <i className="fa fa-xmark story-close-btn" onClick={() => { setStoryView(false); setCurrentIndex(0); }}></i>

      {/* Navigation arrows */}
      {currentIndex > 0 && (
        <div className="story-nav-arrow story-nav-left" onClick={goPrev}>
          <i className="fa fa-chevron-left"></i>
        </div>
      )}
      {currentIndex < stories.length - 1 && (
        <div className="story-nav-arrow story-nav-right" onClick={goNext}>
          <i className="fa fa-chevron-right"></i>
        </div>
      )}

      <div className="story-view-card" onDoubleClick={handleDoubleClick}>
        {/* Progress bars */}
        <div className="story-progress-container">
          {stories.map((_, i) => (
            <div key={i} className="story-progress-bar">
              <div
                className="story-progress-fill"
                style={{
                  width:
                    i < currentIndex
                      ? "100%"
                      : i === currentIndex
                      ? `${progress}%`
                      : "0%",
                  transition: i === currentIndex ? "width 0.1s linear" : "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Story header */}
        <div className="story-header">
          <div className="story-header-left">
            <img src={storyUser?.profileUrl} alt="profile" className="story-header-avatar" />
            <div className="story-header-info">
              <b>{storyUser?.fullName}</b>
              <span>{getTimeAgo(currentStory.createdAt)}</span>
            </div>
          </div>
          <div className="story-header-right">
            {!isOwn && (
              <i className="fa fa-paper-plane story-action-icon" onClick={handleDM} title="Send DM"></i>
            )}
            {isOwn && (
              <>
                <i className="fa fa-eye story-action-icon" onClick={handleShowViewers} title="Viewers"></i>
                <i className="fa fa-trash story-action-icon" onClick={handleDelete} title="Delete"></i>
              </>
            )}
            <i
              className="fa fa-pause story-action-icon"
              style={{ opacity: paused ? 1 : 0.5 }}
              onClick={() => setPaused(!paused)}
              title={paused ? "Play" : "Pause"}
            ></i>
          </div>
        </div>

        {/* Tap zones for prev/next */}
        <div className="story-tap-zones">
          <div className="story-tap-left" onClick={goPrev}></div>
          <div className="story-tap-right" onClick={goNext}></div>
        </div>

        {/* Story content */}
        <div className="story-view-card-mid">
          <div className="media">
            {currentStory.mediaUrl ? (
              <img src={currentStory.mediaUrl} alt="story" />
            ) : currentStory.poll ? (
              <div
                className="story-poll-container"
                style={{ backgroundColor: currentStory.backgroundColor || "#0a66c2" }}
              >
                <h3 className="story-poll-question">{currentStory.poll.question}</h3>
                <div className="story-poll-options">
                  {currentStory.poll.options.map((opt, idx) => {
                    const pct = totalVotes > 0 ? Math.round((opt.votes.length / totalVotes) * 100) : 0;
                    const isVoted = userVotedIndex === idx;
                    const hasVoted = userVotedIndex > -1;
                    return (
                      <div
                        key={idx}
                        className={`story-poll-option ${isVoted ? "story-poll-voted" : ""} ${hasVoted ? "story-poll-revealed" : ""}`}
                        onClick={() => !hasVoted && handlePollVote(idx)}
                      >
                        <div className="story-poll-option-bg" style={{ width: hasVoted ? `${pct}%` : "0%" }}></div>
                        <span className="story-poll-option-text">{opt.text}</span>
                        {hasVoted && <span className="story-poll-option-pct">{pct}%</span>}
                      </div>
                    );
                  })}
                </div>
                {totalVotes > 0 && (
                  <div className="story-poll-total">{totalVotes} vote{totalVotes !== 1 ? "s" : ""}</div>
                )}
              </div>
            ) : (
              <div
                className="story-text-content"
                style={{ backgroundColor: currentStory.backgroundColor || "#0a66c2" }}
              >
                <p>{currentStory.text}</p>
              </div>
            )}
          </div>

          {/* Like animation overlay */}
          {likeAnim && (
            <div className="story-like-animation">
              <i className="fa fa-heart"></i>
            </div>
          )}
        </div>

        {/* Story footer - interactions */}
        <div className="story-footer">
          <div className="story-footer-stats">
            <span className="story-stat" onClick={handleLike}>
              <i className={`fa fa-heart ${isLiked ? "story-liked" : ""}`}></i>
              {currentStory.likes?.length || 0}
            </span>
            {isOwn && (
              <span className="story-stat" onClick={handleShowViewers}>
                <i className="fa fa-eye"></i>
                {currentStory.viewers?.length || 0}
              </span>
            )}
            <span className="story-stat" onClick={() => { setPaused(true); setShowReplies(!showReplies); }}>
              <i className="fa fa-comment"></i>
              {currentStory.replies?.length || 0}
            </span>
          </div>

          {/* Reply input (for others' stories) */}
          {!isOwn && (
            <form className="story-reply-form" onSubmit={handleReply}>
              <input
                ref={replyInputRef}
                type="text"
                placeholder="Reply to story..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onFocus={() => setPaused(true)}
                onBlur={() => { if (!replyText) setPaused(false); }}
                maxLength={500}
              />
              <button type="submit" disabled={!replyText.trim()}>
                <i className="fa fa-paper-plane"></i>
              </button>
            </form>
          )}
        </div>

        {/* Replies panel */}
        {showReplies && currentStory.replies?.length > 0 && (
          <div className="story-replies-panel">
            <div className="story-replies-header">
              <span>Replies ({currentStory.replies.length})</span>
              <i className="fa fa-xmark" onClick={() => { setShowReplies(false); setPaused(false); }}></i>
            </div>
            <div className="story-replies-list">
              {currentStory.replies.map((reply, idx) => (
                <div key={idx} className="story-reply-item">
                  <img src={reply.user?.profileUrl || storyUser?.profileUrl} alt="avatar" />
                  <div className="story-reply-content">
                    <b>{reply.user?.fullName || "User"}</b>
                    <p>{reply.text}</p>
                    <span>{getTimeAgo(reply.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Viewers panel */}
        {showViewers && (
          <div className="story-viewers-panel">
            <div className="story-viewers-header">
              <span>Viewed by ({viewers.length})</span>
              <i className="fa fa-xmark" onClick={() => { setShowViewers(false); setPaused(false); }}></i>
            </div>
            <div className="story-viewers-list">
              {viewers.length === 0 ? (
                <div className="story-no-viewers">No views yet</div>
              ) : (
                viewers.map((v, idx) => (
                  <div key={idx} className="story-viewer-item">
                    <img src={v.user?.profileUrl} alt="avatar" />
                    <div className="story-viewer-info">
                      <b>{v.user?.fullName}</b>
                      <span>{v.user?.headline}</span>
                    </div>
                    <span className="story-viewer-time">{getTimeAgo(v.viewedAt)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryCard;
