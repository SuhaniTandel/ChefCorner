import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./recipebycategory.css"

function RecipeByCategory() {

  const { category_id } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/recipes/${category_id}`)
      .then((res) => {
        setRecipes(res.data);
      })
      .catch(() => {
        console.log("Error fetching recipes");
      });
  }, [category_id]);

  return (
    <>
      {/* Banner */}
      <section 
        className="inner-page-banner bg-common"
        style={{ backgroundImage: "url(/assets/img/figure/inner-page-banner1.jpg)" }}
      >
        <div className="container">
          <div className="breadcrumbs-area">
            <h1>Category Recipes</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>Recipes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Recipes */}
      <section className="recipe-without-sidebar-wrap padding-top-80 padding-bottom-22">
        <div className="container">

          <div className="row">
            {recipes.length > 0 ? (
              recipes.map((item) => (

                <div className="col-lg-4 col-md-6 col-sm-6 col-12 d-flex" key={item.recipe_id}>
                  
                  <div className="product-box-layout1 w-100 recipe-card">

                    {/* Image */}
                    <figure className="item-figure">
                      <Link to={`/single-recipe2/${item.recipe_id}`}>
                        <img 
                          src={`http://localhost:3001/public/${item.image}`} 
                          alt={item.recipe_name}
                        />
                      </Link>
                    </figure>

                    {/* Content */}
                    <div className="item-content d-flex flex-column">

                      <span className="sub-title">
                        {item.category_name}
                      </span>

                      <h3 className="item-title">
                        <Link to={`/single-recipe2/${item.recipe_id}`}>
                          {item.recipe_name}
                        </Link>
                      </h3>

                      {/* Rating */}
                      <ul className="item-rating">
                        <li className="star-fill"><i className="fas fa-star"></i></li>
                        <li className="star-fill"><i className="fas fa-star"></i></li>
                        <li className="star-fill"><i className="fas fa-star"></i></li>
                        <li className="star-fill"><i className="fas fa-star"></i></li>
                        <li className="star-empty"><i className="fas fa-star"></i></li>
                      </ul>

                      {/* Description */}
                      <p className="description">
                        {item.description}
                      </p>

                      {/* Meta */}
                      <ul className="entry-meta mt-auto">

                        <li>
                          <span>
                            <i className="fas fa-clock"></i>
                            {Number(item.prep_time || 0) + Number(item.cook_time || 0)} Mins
                          </span>
                        </li>

                        <li>
                          <span>
                            <i className="fas fa-user"></i> Admin
                          </span>
                        </li>

                        <li>
                          <span>
                            <i className="fas fa-heart"></i>
                            {item.likes || 0} Likes
                          </span>
                        </li>

                      </ul>

                    </div>

                  </div>

                </div>

              ))
            ) : (
              <h4>No Recipes Found</h4>
            )}
          </div>

        </div>
      </section>
    </>
  );
}

export default RecipeByCategory;