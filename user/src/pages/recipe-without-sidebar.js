import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function RecipeWithoutSidebar() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/viewrecipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Filter recipes based on search input
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
                  <figure className="item-figure">
                    <Link to={`/single-recipe2/${item.recipe_id}`}>
                      <img
                        src={`http://localhost:3001/public/${item.image}`}
                        alt={item.recipe_name}
                      />
                    </Link>
                  </figure>

                  <div className="item-content">
                    <span className="sub-title">{item.category_name}</span>
                    <h3 className="item-title">
                      <Link to={`/single-recipe2/${item.recipe_id}`}>
                        {item.recipe_name}
                      </Link>
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
                          {parseInt(item.prep_time) + parseInt(item.cook_time)} Mins
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