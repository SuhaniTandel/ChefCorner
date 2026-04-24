import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./viewrecipes.css";

function ViewRecipes() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // 🔄 Fetch Recipes
  const fetchRecipes = () => {
    Axios.get("http://localhost:3001/api/viewrecipes")
      .then((response) => {
        setList(response.data || []);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "Failed to load recipes", "error");
      });
  };

  // ✅ Approve
  const approveRecipe = (id) => {
    Axios.put(`http://localhost:3001/api/approve-recipe/${id}`)
      .then(() => {
        fetchRecipes();
        Swal.fire("Approved!", "Recipe approved successfully", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to approve recipe", "error");
      });
  };

  // ❌ Reject
  const rejectRecipe = (id) => {
    Axios.put(`http://localhost:3001/api/reject-recipe/${id}`)
      .then(() => {
        fetchRecipes();
        Swal.fire("Rejected!", "Recipe rejected successfully", "warning");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to reject recipe", "error");
      });
  };

  // ⭐ PREMIUM TOGGLE (NEW)
  const togglePremium = (recipe_id, currentStatus) => {
    Axios.post("http://localhost:3001/api/togglePremium", {
      recipe_id,
      is_premium: currentStatus === 1 ? 0 : 1
    })
      .then(() => {
        fetchRecipes();
        Swal.fire(
          "Updated!",
          currentStatus === 1
            ? "Removed from Premium"
            : "Marked as Premium",
          "success"
        );
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update", "error");
      });
  };

  // 📊 Stats
  const stats = [
    {
      label: "Total Recipes",
      value: list.length,
      icon: "👨‍🍳",
      colorClass: "blue-border"
    },
    {
      label: "Premium Recipes",
      value: list.filter(r => r.is_premium === 1).length,
      icon: "⭐",
      colorClass: "purple-border"
    },
    {
      label: "Pending Approval",
      value: list.filter(r => r.approval_status === 0).length,
      icon: "⏳",
      colorClass: "orange-border"
    },
    {
      label: "Approved Recipes",
      value: list.filter(r => r.approval_status === 1).length,
      icon: "✅",
      colorClass: "green-border"
    },
    {
      label: "Rejected Recipes",
      value: list.filter(r => r.approval_status === 2).length,
      icon: "❌",
      colorClass: "red-border"
    }
  ];

  const topStats = stats.slice(0, 2);
  const bottomStats = stats.slice(2);

  return (
    <div className="admin-content">

      {/* Header */}
      <div className="recipe-header">
        <h1>🍽️ Recipes Management</h1>
        <p>View, approve and manage all recipes</p>
      </div>

      {/* 🔥 TOP 2 STATS */}
      <div className="top-stats">
        {topStats.map((stat, idx) => (
          <div key={idx} className={`stat-card ${stat.colorClass}`}>
            <div className="stat-content">
              <div>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
              <div className="stat-icon">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 BOTTOM 3 STATS */}
      <div className="bottom-stats">
        {bottomStats.map((stat, idx) => (
          <div key={idx} className={`stat-card ${stat.colorClass}`}>
            <div className="stat-content">
              <div>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
              <div className="stat-icon">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* List */}
      <h2 className="recipe-title">📚 Recipe List</h2>

      <div className="recipe-grid">
        {list.length === 0 ? (
          <p>No recipes found 😢</p>
        ) : (
          list.map((recipe) => (
            <div key={recipe.recipe_id} className="recipe-card">

              {/* Image */}
              <div className="recipe-image">
                <img
                  src={`http://localhost:3001/public/${recipe.image}`}
                  alt={recipe.recipe_name}
                />

                {/* ⭐ PREMIUM BADGE */}
                {recipe.is_premium === 1 && (
                  <span className="premium-badge">⭐ Premium</span>
                )}
              </div>

              {/* Body */}
              <div className="recipe-body">
                <h3 className="recipe-title-text">
                  {recipe.recipe_name}
                </h3>

                {/* Tags */}
                <div className="recipe-tags">
                  <span className="chef-tag">
                    <i className="fas fa-user"></i> Admin
                  </span>

                  <span className="category-tag">
                    <i className="fas fa-utensils"></i>{" "}
                    {recipe.category_name || "Category"}
                  </span>
                </div>

                {/* Stats */}
                <div className="recipe-stats">
                  <div className="stat-box views">
                    <i className="fas fa-eye"></i>
                    <span>{recipe.views || 0}</span>
                  </div>

                  <div className="stat-box likes">
                    <i className="fas fa-heart"></i>
                    <span>{recipe.likes || 0}</span>
                  </div>
                </div>

                <div className="recipe-footer">

                  {/* Status */}
                  <span
                    className={`status 
                      ${recipe.approval_status === 0 ? "pending" : ""}
                      ${recipe.approval_status === 1 ? "approved" : ""}
                      ${recipe.approval_status === 2 ? "rejected" : ""}
                    `}
                  >
                    {recipe.approval_status === 0 && "⏳ Pending"}
                    {recipe.approval_status === 1 && "✅ Approved"}
                    {recipe.approval_status === 2 && "❌ Rejected"}
                  </span>

                  {/* Actions */}
                  <div className="recipe-actions">

                    <button className="view-btn">
                      View
                    </button>

                    {/* ⭐ PREMIUM BUTTON (NEW) */}
                    <button
                      className="premium-btn"
                      onClick={() =>
                        togglePremium(recipe.recipe_id, recipe.is_premium)
                      }
                    >
                      {recipe.is_premium === 1
                        ? "❌ Remove Premium"
                        : "⭐ Make Premium"}
                    </button>

                    {recipe.approval_status === 0 && (
                      <select
                        className="action-dropdown"
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value === "approve") {
                            approveRecipe(recipe.recipe_id);
                          } else if (e.target.value === "reject") {
                            rejectRecipe(recipe.recipe_id);
                          }
                          e.target.value = "";
                        }}
                      >
                        <option value="" hidden>⚙</option>
                        <option value="approve">✅ Approve</option>
                        <option value="reject">❌ Reject</option>
                      </select>
                    )}

                  </div>

                </div>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default ViewRecipes;