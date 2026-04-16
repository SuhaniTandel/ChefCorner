import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./reviews.css";

function Reviews() {

  const { id } = useParams(); // recipe_id

  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState({ avgRating: 0, totalReviews: 0 });

  // 🔄 Fetch Reviews
  useEffect(() => {
    if (!id) return;

    Axios.get(`http://localhost:3001/api/getreviews/${id}`)
      .then((res) => {
        setReviews(res.data);
      });

    Axios.get(`http://localhost:3001/api/averagerating/${id}`)
      .then((res) => {
        setAvg(res.data);
      });

  }, [id]);

  // ⭐ Star render function
  const renderStars = (count) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={i <= count ? "fas fa-star active" : "far fa-star"}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="reviews-page">

      <h1>⭐ Reviews</h1>

      {/* 📊 Average Rating */}
      <div className="avg-box">
        <h2>{avg.avgRating || 0} / 5</h2>
        <div className="stars">
          {renderStars(Math.round(avg.avgRating || 0))}
        </div>
        <p>{avg.totalReviews} Reviews</p>
      </div>

      {/* 📝 Reviews List */}
      <div className="review-list">

        {reviews.length === 0 ? (
          <p>No reviews yet 😢</p>
        ) : (
          reviews.map((r, index) => (
            <div key={index} className="review-card">

              <div className="review-header">
                <h4>{r.name}</h4>
                <div className="stars">
                  {renderStars(r.rating)}
                </div>
              </div>

              <p className="review-message">{r.message}</p>

              <small className="review-email">{r.email}</small>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Reviews;