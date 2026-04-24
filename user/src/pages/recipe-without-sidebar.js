import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function RecipeWithoutSidebar() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/api/viewrecipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ PREMIUM CHECK FUNCTION (ADDED)
  const openRecipe = async (recipe) => {
    const user_id = localStorage.getItem("user_id");

    // Normal recipe → direct open
    if (Number(recipe.is_premium) !== 1) {
      navigate(`/single-recipe2/${recipe.recipe_id}`);
      return;
    }

    // Not logged in
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
        navigate(`/single-recipe2/${recipe.recipe_id}`);
      } else {
        // ✅ GO TO VIEW PLAN
        navigate("/view-plan", {
          state: {
            recipe_id: recipe.recipe_id,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Filter recipes
  const filteredRecipes = recipes.filter(
    (item) =>
      item.recipe_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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

      <section className="recipe-without-sidebar-wrap padding-top-80 padding-bottom-22">
        <div className="container">

          {/* Search Box */}
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

          {/* Recipes List */}
          <div className="row">
            {filteredRecipes.map((item) => (
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-12"
                key={item.recipe_id}
              >
                <div className="product-box-layout1">

                  <figure className="item-figure" style={{ position: "relative" }}>
                    {/* ✅ CLICK HANDLER CHANGED */}
                    <div
                      onClick={() => openRecipe(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={`http://localhost:3001/public/${item.image}`}
                        alt={item.recipe_name}
                      />
                    </div>

                    {/* ✅ PREMIUM BADGE */}
                    {Number(item.is_premium) === 1 && (
                      <span style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "gold",
                        padding: "5px 8px",
                        borderRadius: "50%",
                        fontSize: "14px"
                      }}>
                        🔒
                      </span>
                    )}
                  </figure>

                  <div className="item-content">
                    <span className="sub-title">{item.category_name}</span>

                    {/* ✅ TITLE CLICK UPDATED */}
                    <h3
                      className="item-title"
                      onClick={() => openRecipe(item)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.recipe_name}
                    </h3>

                    <ul className="item-rating">
                      <li className="star-fill"><i className="fas fa-star"></i></li>
                      <li className="star-fill"><i className="fas fa-star"></i></li>
                      <li className="star-fill"><i className="fas fa-star"></i></li>
                      <li className="star-fill"><i className="fas fa-star"></i></li>
                      <li className="star-empty"><i className="fas fa-star"></i></li>
                    </ul>

                    <p>{item.description?.substring(0, 80)}...</p>

                    <ul className="entry-meta">
                      <li>
                        <a href="#">
                          <i className="fas fa-clock"></i>
                          {parseInt(item.prep_time) + parseInt(item.cook_time)} 
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-user"></i>by <span>{item.author_name || "Admin"}</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-heart"></i>
                          <span>{item.likes || 0}</span> Likes
                        </a>
                      </li>
                    </ul>

                    {/* ✅ PREMIUM BUTTON */}
                    {Number(item.is_premium) === 1 && (
                      <div style={{ textAlign: "center", marginTop: "10px" }}>
                        <button
                          onClick={() => openRecipe(item)}
                          style={{
                            background: "#ff6600",
                            color: "#fff",
                            border: "none",
                            padding: "8px 15px",
                            borderRadius: "5px",
                            cursor: "pointer"
                          }}
                        >
                          🔒 Unlock Premium ₹{item.price}
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default RecipeWithoutSidebar;