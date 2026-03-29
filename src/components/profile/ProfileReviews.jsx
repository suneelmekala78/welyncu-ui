import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiRequest } from "../../helper/apis";
import { toast } from "react-toastify";

const ProfileReviews = ({ user, getUserData }) => {
  const { userId } = useSelector((state) => state.user);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const reviews = user?.reviews || [];
  const isOwnProfile = user?._id === userId;

  const handleSubmitReview = async () => {
    if (!rating || !reviewText.trim()) {
      toast.error("Please provide a rating and review text");
      return;
    }
    try {
      const res = await apiRequest({
        url: "/user/add-review",
        method: "POST",
        data: { targetUserId: user._id, rating, text: reviewText },
      });
      if (res?.status === "success") {
        toast.success("Review added!");
        setRating(0);
        setReviewText("");
        if (getUserData) getUserData();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-reviews-section mt-10 mb-10 p-15 box-shadow">
      <div className="all-profile-reviews">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div className="review-card box-shadow" key={index}>
              <div className="review-card-top">
                <div className="review-card-top-left">
                  <img
                    src={
                      review.reviewerProfileUrl ||
                      "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
                    }
                    alt="profile-pic"
                  />
                  <div className="review-person-details">
                    <b>{review.reviewerName || "User"}</b>
                    <span>{review.reviewerHeadline || ""}</span>
                  </div>
                </div>
                <div className="review-card-top-right">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`${review.rating >= star ? "fa" : "fa-regular"} fa-star`}
                      style={{ color: "#ffb800", fontSize: "12px" }}
                    ></i>
                  ))}
                </div>
              </div>
              <div className="review-card-bottom">
                <span>{review.text}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="noposts-text" style={{ width: "100%" }}>No reviews yet</div>
        )}
      </div>

      {!isOwnProfile && (
        <div className="give-review-card box-shadow mt-10 p-15">
          <b className="give-review-title">Give Review</b>
          <div className="ratings">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`${(hoverRating || rating) >= star ? "fa" : "fa-regular"} fa-star`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              ></i>
            ))}
          </div>
          <textarea
            className="review-input"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
          ></textarea>
          <div className="review-btns">
            <div></div>
            <div className="review-send-btn send-btn btn-background" onClick={handleSubmitReview}>
              Send
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileReviews;
