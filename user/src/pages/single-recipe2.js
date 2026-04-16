import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import "./single-recipe2.css";

function SingleRecipe2() {

  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    Axios.put(`http://localhost:3001/api/updatelikes/${id}`)
      .then((res) => {
        setLikes(res.data.likes);
      })
      .catch((err) => console.log(err));
  };

  // ✅ REPLACE ONLY THIS useEffect

useEffect(() => {
  window.scrollTo(0, 0);

  let viewedRecipes = JSON.parse(localStorage.getItem("viewedRecipes")) || [];

  const alreadyViewed = viewedRecipes.includes(id);

  const url = alreadyViewed
    ? `http://localhost:3001/api/singlerecipe/${id}`
    : `http://localhost:3001/api/singlerecipe/${id}?increment=true`;

  Axios.get(url)
    .then((res) => {
      setRecipe(res.data);
      setLikes(res.data.likes || 0);

      // ✅ save in localStorage only first time
      if (!alreadyViewed) {
        viewedRecipes.push(id);
        localStorage.setItem("viewedRecipes", JSON.stringify(viewedRecipes));
      }
    })
    .catch((err) => console.log(err));

}, [id]);

  // 🔥 REVIEW SUBMIT
  const submitReview = () => {

    const name = document.getElementById("r_name").value;
    const email = document.getElementById("r_email").value;
    const message = document.getElementById("r_message").value;

    if (!name || !email || !message || rating === 0) {
      alert("Please fill all fields and select rating");
      return;
    }

    Axios.post("http://localhost:3001/api/addreview", {
      recipe_id: recipe.recipe_id,
      name,
      email,
      message,
      rating
    }).then(() => {
      setSuccessMsg("Thank you! Your review has been submitted successfully.");

      document.getElementById("r_name").value = "";
      document.getElementById("r_email").value = "";
      document.getElementById("r_message").value = "";
      setRating(0);
    });
  };

  if (!recipe) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <>
      {/* 🔥 BANNER */}
      <section className="inner-page-banner bg-common">
        <div className="container">
          <div className="breadcrumbs-area">
            <h1>Single Recipe</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>Recipe Details</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 🔥 IMAGE */}
      <section className="single-recipe-main-banner">
        <div className="item-figure">
          <img
            src={`http://localhost:3001/public/${recipe.image}`}
            alt="recipe"
            onDoubleClick={handleLike}
            style={{
              width: "100%",
              height: "650px",
              objectFit: "cover",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          />
        </div>
      </section>

      {/* 🔥 MAIN CONTENT */}
      <section className="single-recipe-wrap-layout2 padding-bottom-80">
        <div className="container">
          <div className="single-recipe-layout2">

            <div className="ctg-name">
              {recipe.category_name}
            </div>

            <h2 className="item-title">
              {recipe.recipe_name}
            </h2>

            <div className="recipe-meta-box">

              <div className="meta-item">
                <i className="fas fa-clock"></i>
                <h5>PREP TIME</h5>
                <p>{recipe.prep_time}</p>
              </div>

              <div className="meta-item">
                <i className="fas fa-utensils"></i>
                <h5>COOK TIME</h5>
                <p>{recipe.cook_time}</p>
              </div>

              <div className="meta-item">
                <i className="fas fa-users"></i>
                <h5>SERVING</h5>
                <p>{recipe.servings} People</p>
              </div>

              <div className="meta-item">
                <i className="fas fa-rupee-sign"></i>
                <h5>PRICE</h5>
                <p>₹{recipe.price}</p>
              </div>

              <div className="meta-item">
                <i className="fas fa-signal"></i>
                <h5>DIFFICULTY</h5>
                <p>{recipe.difficulty}</p>
              </div>

              <div className="meta-item">
                <i className="fas fa-eye"></i>
                <h5>VIEWS</h5>
                <p>{recipe.views || 0}</p>
              </div>

              <div className="meta-item">
                <i className="fas fa-heart" style={{ color: "red" }}></i>
                <h5>LIKES</h5>
                <p>{likes}</p>
              </div>

            </div>

            <p className="item-description">
              {recipe.description}
            </p>

            {/* INGREDIENTS */}
            <div className="making-elements-wrap">
              <div className="row">
                <div className="col-xl-6 col-12">
                  <div className="ingridients-wrap">
                    <h3 className="item-title">
                      <i className="fas fa-list-ul"></i> Ingredients
                    </h3>

                    {recipe.ingredients?.split(",").map((item, index) => (
                      <div className="checkbox checkbox-primary" key={index}>
                        <input id={`ing${index}`} type="checkbox" />
                        <label htmlFor={`ing${index}`}>{item}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NUTRITION */}
                <div className="col-xl-6 col-12">
                  <div className="nutrition-wrap">
                    <h3 className="item-title">
                      <i className="fas fa-info"></i> Nutrition
                    </h3>

                    <ul className="nutrition-list">
                      {recipe.nutrition?.split(",").map((item, index) => {
                        const parts = item.split(":");
                        return (
                          <li key={index}>
                            <div className="nutrition-name">{parts[0]}</div>
                            <div className="nutrition-value">{parts[1]}</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* DIRECTIONS */}
            <div className="direction-wrap-layout2">
              <div className="section-heading2 heading-dark">
                <h2 className="item-heading">Follow The Directions</h2>
              </div>

              {recipe.steps?.split("|").map((step, index) => {

                const [text, time] = step.split(":");

                return (
                  <div className="direction-box-layout2" key={index}>
                    <div className="serial-number">
                      <h4 className="number-title">{String(index + 1).padStart(2, "0")}</h4>
                      <span>Step</span>
                    </div>

                    <div className="item-content">
                      <span className="item-time">
                        <i className="far fa-clock"></i> {time || 1} 
                      </span>
                      <p>{text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {successMsg && <div className="success-box">{successMsg}</div>}

            {/* REVIEW */}
            <div className="review-box">
              <h3 className="review-title">LEAVE A REVIEW</h3>

              <div className="rating">
                <span>Rating</span>
                <div className="stars">
                  {[1,2,3,4,5].map((star) => (
                    <i
                      key={star}
                      className={star <= rating ? "fas fa-star" : "far fa-star"}
                      onClick={() => setRating(star === rating ? rating - 1 : star)}
                    ></i>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Comment :</label>
                <textarea id="r_message" className="form-control" rows="5"></textarea>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label>Name :</label>
                  <input type="text" id="r_name" className="form-control" />
                </div>

                <div className="col-md-6">
                  <label>E-mail :</label>
                  <input type="email" id="r_email" className="form-control" />
                </div>
              </div>

              <button className="review-btn" onClick={submitReview}>
                POST REVIEW
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default SingleRecipe2;