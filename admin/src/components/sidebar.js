import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [chefOpen, setChefOpen] = useState(false); // 👨‍🍳

  return (
    <aside className="admin-sidebar">
      <ul>

        <li className="title">MAIN</li>

        <li>
          <Link to="/dash">
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </Link>
        </li>


        <li className="title">MANAGEMENT</li>

        {/* RECIPES */}
        <li className={`dropdown ${recipeOpen ? "open" : ""}`}>
          <div className="dropdown-head" onClick={() => setRecipeOpen(!recipeOpen)}>
            <div className="left">
              <i className="fas fa-utensils"></i>
              <span>Recipes</span>
            </div>
            <i className="fas fa-chevron-down arrow"></i>
          </div>

          <ul className="dropdown-menu">
            <li>
              <Link to="/viewrecipes">
                <i className="fas fa-list"></i>
                <span>View Recipes</span>
              </Link>
            </li>
            <li>
              <Link to="/addrecipe">
                <i className="fas fa-plus"></i>
                <span>Add Recipe</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* CATEGORIES */}
        <li className={`dropdown ${categoryOpen ? "open" : ""}`}>
          <div className="dropdown-head" onClick={() => setCategoryOpen(!categoryOpen)}>
            <div className="left">
              <i className="fas fa-th-large"></i>
              <span>Categories</span>
            </div>
            <i className="fas fa-chevron-down arrow"></i>
          </div>

          <ul className="dropdown-menu">
            <li>
              <Link to="/viewcategory">
                <i className="fas fa-list"></i>
                <span>View Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/addcategory">
                <i className="fas fa-plus"></i>
                <span>Add Category</span>
              </Link>
            </li>
          </ul>
        </li>

        

        {/* NORMAL LINKS */}
        <li>
          <Link to="/premium">
            <i className="fas fa-star"></i>
            <span>Premium Recipes</span>
          </Link>
        </li>
        <li>
          <Link to="/add-plan">
              <i className="fas fa-plus"></i>
              <span>Add Plan</span>
          </Link>
        </li>

        <li>
          <Link to="/view-plan">
              <i className="fas fa-list"></i>
              <span>View Plans</span>
          </Link>
        </li>

        <li>
          <Link to="/subscriptions">
            <i className="fas fa-credit-card"></i>
            <span>User Subscriptions</span>
          </Link>
        </li>

        <li className="title">CONTENT</li>

        <li>
          <Link to="/reviews">
            <i className="fas fa-comments"></i>
            <span>Reviews</span>
          </Link>
        </li>

        <li className="title">SETTINGS</li>

        <li>
          <Link to="/settings">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </Link>
        </li>

        <li>
          <Link to="/logout">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </Link>
        </li>

      </ul>
    </aside>
  );
}

export default Sidebar;