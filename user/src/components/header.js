import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./header.css";

function Header() {
  const [recipes, setRecipes] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all recipes for search
    Axios.get("http://localhost:3001/api/viewrecipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle enter or search button click
  const handleSearch = () => {
    const foundRecipe = recipes.find((r) =>
      r.recipe_name.toLowerCase().includes(search.toLowerCase())
    );
    if (foundRecipe) {
      navigate(`/single-recipe1/${foundRecipe.recipe_id}`);
      setShowSearch(false);
      setSearch("");
    } else {
      alert("Recipe not found");
    }
  };

  return (
    <>
      <header className="header-one">
        <div id="header-main-menu" className="header-main-menu header-sticky">
          <div className="container">
            <div className="row">
              {/* LEFT NAV */}
              <div className="col-lg-8 col-md-3 col-sm-4 col-4 possition-static">
                <nav className="site-nav">
                  <div className="site-logo-desktop">
                    <img src="/assets/img/ChefCorner-logo.png" alt="Site Logo" />
                  </div>

                  <ul id="site-menu" className="site-menu">
                    <li><Link to="/dash">Home</Link></li>
                    <li><Link to="/category">Category</Link></li>
                    <li className="recipe-menu">
                      <a href="#">Recipes</a>
                      <ul id="recipeDropdown" className="dropdown-menu-col-1">
                        <li><Link to="/recipe-with-sidebar">Recipes With Sidebar</Link></li>
                        <li><Link to="/recipe-without-sidebar">Recipes Without Sidebar</Link></li>
                      </ul>
                    </li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/about">About us</Link></li>

                    {/* SEARCH ICON + INPUT */}
                    <li className="search-area">
                      <button
                        className="search-button"
                        onClick={() => setShowSearch(!showSearch)}
                      >
                        <i className="fas fa-search"></i>
                      </button>

                      {showSearch && (
                        <div className="header-search-box">
                          <input
                            type="text"
                            placeholder="Search recipe..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSearch();
                            }}
                          />
                          <button onClick={handleSearch}>
                            <i className="fas fa-search"></i>
                          </button>

                          {/* Suggestions dropdown */}
                          {search && (
                            <div className="search-suggestions">
                              {recipes
                                .filter((r) =>
                                  r.recipe_name.toLowerCase().includes(search.toLowerCase())
                                )
                                .slice(0, 5)
                                .map((r) => (
                                  <div
                                    key={r.recipe_id}
                                    className="suggestion-item"
                                    onClick={() => {
                                      navigate(`/single-recipe1/${r.recipe_id}`);
                                      setShowSearch(false);  // ✅ close search after click
                                      setSearch("");         // clear search input
                                    }}
                                  >
                                    {r.recipe_name}
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>

              {/* RIGHT ACTION BUTTONS */}
              <div className="col-lg-4 col-md-9 col-sm-8 col-8 d-flex align-items-center justify-content-end">
                <div className="nav-action-elements-layout1">
                  <ul>
                    <li>
                      <button
                        type="button"
                        className="login-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                      >
                        <i className="flaticon-profile"></i> Login
                      </button>
                    </li>
                    <li>
                      <Link to="/submit-recipe" className="fill-btn">
                        <i className="flaticon-plus-1"></i>SUBMIT RECIPE
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;