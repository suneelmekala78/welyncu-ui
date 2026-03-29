import React, { useEffect, useState, useCallback } from "react";
import { viewStoryApi, deleteStoryApi } from "../../helper/apis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const STORY_DURATION = 5000; // 5 seconds per story

const StoryCard = ({ storyView, setStoryView, activeStoryGroup }) => {
  const { user } = useSelector((state) => state.user);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const stories = activeStoryGroup?.stories || [];
  const storyUser = activeStoryGroup?.user;
  const currentStory = stories[currentIndex];
  const isOwn = storyUser?._id === user?._id;

  // Mark story as viewed
  useEffect(() => {
    if (storyView && currentStory?._id) {
      viewStoryApi(currentStory._id);
    }
  }, [storyView, currentStory?._id]);

  // Auto-advance with progress bar
  useEffect(() => {
    if (!storyView || stories.length === 0) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return prev;
        }
        return prev + 100 / (STORY_DURATION / 100);
      });
    }, 100);

    const timeout = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setStoryView(false);
        setCurrentIndex(0);
      }
    }, STORY_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [storyView, currentIndex, stories.length]);

  // Reset index when opening a new group
  useEffect(() => {
    if (storyView) setCurrentIndex(0);
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
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  if (!currentStory) return null;

  return (
    <div
      className={
        storyView
          ? "story-view-section story-view-section-active"
          : "story-view-section"
      }
    >
      <i className="fa fa-xmark" onClick={() => { setStoryView(false); setCurrentIndex(0); }}></i>

      {/* Navigation arrows */}
      {currentIndex > 0 && (
        <i
          className="fa fa-chevron-left"
          style={{
            position: "absolute",
            left: "50px",
            fontSize: "24px",
            color: "white",
            cursor: "pointer",
            zIndex: 10,
          }}
          onClick={goPrev}
        ></i>
      )}
      {currentIndex < stories.length - 1 && (
        <i
          className="fa fa-chevron-right"
          style={{
            position: "absolute",
            right: "50px",
            fontSize: "24px",
            color: "white",
            cursor: "pointer",
            zIndex: 10,
          }}
          onClick={goNext}
        ></i>
      )}

      <div className="story-view-card">
        {/* Progress bars */}
        <div style={{ display: "flex", gap: "3px", marginBottom: "10px" }}>
          {stories.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: "3px",
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  backgroundColor: "white",
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

        {/* Story user info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            color: "white",
          }}
        >
          <img
            src={storyUser?.profileUrl}
            alt="profile"
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <div>
            <b style={{ fontSize: "14px" }}>{storyUser?.fullName}</b>
            <div style={{ fontSize: "11px", opacity: 0.7 }}>
              {getTimeAgo(currentStory.createdAt)}
            </div>
          </div>
          {isOwn && (
            <i
              className="fa fa-trash"
              style={{
                marginLeft: "auto",
                cursor: "pointer",
                color: "white",
                fontSize: "14px",
              }}
              onClick={handleDelete}
            ></i>
          )}
        </div>

        {/* Story content */}
        <div className="story-view-card-mid">
          <div className="media">
            {currentStory.mediaUrl ? (
              <img src={currentStory.mediaUrl} alt="story" />
            ) : (
              <div
                style={{
                  width: "100%",
                  minHeight: "300px",
                  backgroundColor:
                    currentStory.backgroundColor || "#0a66c2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "30px",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    color: "white",
                    fontSize: "20px",
                    textAlign: "center",
                    wordBreak: "break-word",
                  }}
                >
                  {currentStory.text}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Viewer count for own stories */}
        {isOwn && currentStory.viewers && (
          <div
            style={{
              color: "white",
              fontSize: "12px",
              textAlign: "center",
              marginTop: "10px",
              opacity: 0.7,
            }}
          >
            <i className="fa fa-eye"></i> {currentStory.viewers.length} views
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryCard;
