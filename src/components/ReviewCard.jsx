import React from "react";

function ReviewCard({ name, rating, text, avatar }) {
  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="star">
          {i < rating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="review-card">
      <div className="review-rating">{renderStars(rating)}</div>
      <div className="review-user">
        <img src={avatar} alt={name} className="review-avatar" />
        <div className="review-name">{name}</div>
      </div>
      <p className="review-text">{text}</p>
    </div>
  );
}

export default ReviewCard;
