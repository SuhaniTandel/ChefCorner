import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function SubscriptionRecipes() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {

    const user_id = parseInt(localStorage.getItem("user_id"));

    if (!user_id) {
      console.log("User not logged in");
      return;
    }

    Axios.get(`http://localhost:3001/api/subscription-recipes/${user_id}`)
      .then((res) => {
        console.log("API DATA:", res.data); // 👈 DEBUG
        setRecipes(res.data.data || res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  return (
    <>
      <section className="inner-page-banner bg-common">
        <div className="container">
          <div className="breadcrumbs-area">
            <h1>👑 My Premium Recipes</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>Subscription</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="padding-top-80 padding-bottom-22">
        <div className="container">
          <div className="row">

            {recipes && recipes.length > 0 ? (
              recipes.map((item) => (
                <div className="col-lg-4 col-md-6 col-12" key={item.recipe_id}>
                  <div className="product-box-layout1">

                    <figure className="item-figure">
                      <Link to={`/single-recipe2/${item.recipe_id}`}>
                        <img
                          src={`http://localhost:3001/public/${item.image || "default.jpg"}`}
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

                      <p>{item.description?.substring(0, 80)}...</p>

                      <ul className="entry-meta">
                        <li>
                          <i className="fas fa-clock"></i>
                          {parseInt(item.prep_time || 0) + parseInt(item.cook_time || 0)} Mins
                        </li>
                        <li>
                          <i className="fas fa-user"></i>
                          {item.author_name || "Admin"}
                        </li>
                      </ul>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3>No premium recipes found</h3>
            )}

          </div>
        </div>
      </section>
    </>
  );
}

export default SubscriptionRecipes;