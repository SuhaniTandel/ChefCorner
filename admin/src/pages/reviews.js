import React, { useEffect, useState } from "react";
import Axios from "axios";

function Reviews() {

  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    neutral: 0,
    negative: 0
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {

      const res = await Axios.get("http://localhost:3001/api/getreviews");

      const data = res.data || [];

      setReviews(data);

      // ================= STATS =================
      const total = data.length;
      const positive = data.filter(r => Number(r.rating) >= 4).length;
      const neutral = data.filter(r => Number(r.rating) === 3).length;
      const negative = data.filter(r => Number(r.rating) <= 2).length;

      setStats({
        total,
        positive,
        neutral,
        negative
      });

    } catch (err) {
      console.log("Reviews Error:", err);
    }
  };

  // ⭐ Stars
  const renderStars = (rating) => {
    return "⭐".repeat(Number(rating) || 0);
  };

  return (
    <div className="admin-content">

      {/* HEADER */}
      <div className="welcome-box">
        <h1>User Reviews ⭐</h1>
        <p>See what users are saying about recipes</p>
      </div>

      {/* STATS */}
      <div className="stats">

        <div className="card">
          <h3>Total Reviews</h3>
          <p>{stats.total}</p>
        </div>

        <div className="card">
          <h3>Positive Reviews</h3>
          <p>{stats.positive}</p>
        </div>

        <div className="card">
          <h3>Neutral Reviews</h3>
          <p>{stats.neutral}</p>
        </div>

        <div className="card">
          <h3>Negative Reviews</h3>
          <p>{stats.negative}</p>
        </div>

      </div>

      {/* TABLE */}
      <div className="table-box">
        <h2>Recent Reviews</h2>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Recipe</th>
              <th>Rating</th>
              <th>Comment</th>
            </tr>
          </thead>

          <tbody>

            {reviews.length > 0 ? (
              reviews.map((r) => (
                <tr key={r.review_id}>

                  <td>{r.name}</td>

                  <td>{r.recipe_name || "Unknown Recipe"}</td>

                  <td>{renderStars(r.rating)}</td>

                  <td>{r.message}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Reviews Found
                </td>
              </tr>
            )}

          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Reviews;