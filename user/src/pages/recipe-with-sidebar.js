/* global $ */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./recipe-with-sidebar.css";

function RecipeWithSidebar() {
  const [recipes, setRecipes] = useState([]);
  const [latest, setLatest] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // ================= FETCH DATA =================
  useEffect(() => {
    Axios.get("http://localhost:3001/api/viewrecipes")
      .then((res) => {
        setRecipes(res.data);
        const latestData = [...res.data]
          .sort((a, b) => b.recipe_id - a.recipe_id)
          .slice(0, 5);
        setLatest(latestData);
      })
      .catch((err) => console.log(err));
  }, []);

  // ================= PREMIUM CHECK FUNCTION =================
  const openRecipe = async (recipe) => {
    const user_id = localStorage.getItem("user_id");

    if (Number(recipe.is_premium) !== 1) {
      navigate(`/single-recipe1/${recipe.recipe_id}`);
      return;
    }

    if (!user_id) {
      navigate("/login");
      return;
    }

    try {
      const res = await Axios.post(
        "http://localhost:3001/api/check-subscription",
        { user_id, recipe_id: recipe.recipe_id }
      );

      if (res.data.subscribed) {
        navigate(`/single-recipe1/${recipe.recipe_id}`);
      } else {

        // ✅ ONLY CHANGE IS HERE
        navigate("/view-plan", {
          state: {
            recipe_id: recipe.recipe_id
          },
        });

      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= OWL CAROUSEL =================
  useEffect(() => {
    const $ = window.$;
    setTimeout(() => {
      if ($ && $.fn.owlCarousel) {
        $(".rc-carousel").owlCarousel({
          items: 1,
          loop: true,
          margin: 5,
          nav: true,
          dots: false,
          autoplay: true,
          autoplayTimeout: 5000,
          smartSpeed: 700,
        });
      }
    }, 500);
  }, []);

  // ================= SEARCH FILTER =================
  const filteredRecipes = recipes.filter(
    (item) =>
      item.recipe_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* BANNER */}
      <section
        className="inner-page-banner bg-common"
        data-bg-image="img/figure/inner-page-banner1.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumbs-area">
                <h1>Search Your Recipes</h1>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>All Recipes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH BOX */}
      <section className="recipe-search-wrap padding-top-40 padding-bottom-22">
        <div className="container">
          <div className="adv-search-wrap">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Author Name or Recipe Search . . ."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="btn-group">
                <div className="input-group-btn">
                  <button type="button" className="btn-search">
                    <i className="flaticon-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECIPES LIST */}
      <section className="all-recipes-page-wrap padding-top-20 padding-bottom-22">
        <div className="container">
          <div className="row gutters-60">
            {/* LEFT */}
            <div className="col-lg-8">
              <div className="row">
                {filteredRecipes.map((item) => (
                  <div className="col-md-6 col-12" key={item.recipe_id}>
                    <div className="product-box-layout1">
                      <figure className="item-figure" style={{ position: "relative" }}>
                        <div
                          onClick={() => openRecipe(item)}
                          style={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={`http://localhost:3001/public/${item.image}`}
                            alt={item.recipe_name}
                          />
                          {Number(item.is_premium) === 1 && (
                            <span className="premium-badge">✨</span>
                          )}
                        </div>
                      </figure>

                      <div className="item-content">
                        <span className="sub-title">{item.category_name}</span>
                        <h3
                          className="item-title"
                          onClick={() => openRecipe(item)}
                          style={{ cursor: "pointer" }}
                        >
                          {item.recipe_name}
                        </h3>
                        <p>{item.description?.substring(0, 80)}...</p>
                        <ul className="entry-meta">
                          <li>
                            <i className="fas fa-clock"></i>
                            {parseInt(item.prep_time) + parseInt(item.cook_time)} Mins
                          </li>
                          <li>
                            <i className="fas fa-user"></i>
                            by <span>{item.author_name || "Admin"}</span>
                          </li>
                          <li>
                            <i className="fas fa-heart"></i>
                            {item.likes || 0}
                          </li>
                        </ul>

                        {/* PREMIUM BUTTON */}
                        {Number(item.is_premium) === 1 && (
                          <div className="premium-center-btn">
                            <button
                              className="subscribe-btn"
                              onClick={() => openRecipe(item)}
                            >
                              🔒 Unlock Premium Recipe ₹{item.price}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="col-lg-4 sidebar-widget-area">
              <div className="widget">
                <div className="section-heading heading-dark">
                  <h3 className="item-heading">LATEST RECIPES</h3>
                </div>
                <div className="widget-latest">
                  <ul className="block-list">
                    {latest.map((item) => (
                      <li className="single-item" key={item.recipe_id}>
                        <div className="item-img small-img" style={{ position: "relative" }}>
                          <img
                            src={`http://localhost:3001/public/${item.image}`}
                            alt={item.recipe_name}
                          />
                          {Number(item.is_premium) === 1 && (
                            <span className="premium-badge">🔒</span>
                          )}
                        </div>
                        <div className="item-content">
                          <div className="item-ctg">{item.category_name}</div>
                          <h4
                            onClick={() => openRecipe(item)}
                            style={{ cursor: "pointer" }}
                          >
                            {item.recipe_name}
                          </h4>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default RecipeWithSidebar;