import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./category.css";

function Category() {

  const [list, setList] = useState([]);

  // 🔄 Fetch categories from backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    Axios.get("http://localhost:3001/api/viewcategory")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  return (
    <>
      {/* Banner */}
      <section
        className="inner-page-banner bg-common"
        style={{ backgroundImage: "url(/assets/img/figure/inner-page-banner1.jpg)" }}
      >
        <div className="container">
          <div className="breadcrumbs-area">
            <h1>Recipe Categories</h1>
            <ul>
              <li><a href="/">Home</a></li>
              <li>Categories</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="category-page-wrap padding-top-80 padding-bottom-50 category-page">
        <div className="container">
          <div className="row">

            {list.length > 0 ? (
              list.map((item) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-6 col-12"
                  key={item.category_id}
                >
                  <div className="category-box-layout1">

                    <Link to={`/recipes/${item.category_id}`} className="category-link">

                    {/* Image + Content Together */}
                    <figure className="item-figure">

                      <img
                        src={`http://localhost:3001/public/${item.image}`}
                        alt={item.category_name}
                      />

                      {/* Content OVER image */}
                      <div className="item-content">
                        <h3 className="item-title">
                          {item.category_name}
                        </h3>
                        <span className="sub-title">
                          {item.total_recipes} Recipes
                        </span>
                      </div>

                    </figure>

                  </Link>

                  </div>
                </div>
              ))
            ) : (
              <h3 style={{ textAlign: "center", width: "100%" }}>
                No Categories Found
              </h3>
            )}

          </div>
        </div>
      </section>
    </>
  );
}

export default Category;