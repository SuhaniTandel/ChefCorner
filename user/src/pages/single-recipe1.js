/* global $ */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import "./single-recipe1.css";


function SingleRecipe(){

  const { id } = useParams();

  const [recipe, setRecipe] = useState({});
  const [latest, setLatest] = useState([]);
  const [likes, setLikes] = useState(0);
  const [rating, setRating] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

useEffect(() => {
  window.scrollTo(0, 0);

  const viewed = localStorage.getItem(`viewed_${id}`);

  if (!viewed) {

    // 🔥 IMPORTANT GUARD
    if (window.__viewedOnce) return;
    window.__viewedOnce = true;

    Axios.get(`http://localhost:3001/api/singlerecipe/${id}?increment=true`)
      .then((res) => {
        setRecipe(res.data);
        setLikes(res.data.likes || 0);
        localStorage.setItem(`viewed_${id}`, true);
      });

  } else {

    Axios.get(`http://localhost:3001/api/singlerecipe/${id}`)
      .then((res) => {
        setRecipe(res.data);
        setLikes(res.data.likes || 0);
      });

  }

}, [id]);




  // ================= FETCH LATEST =================
  useEffect(() => {
    Axios.get("http://localhost:3001/api/viewrecipes")
      .then((res) => {
        const sorted = [...res.data]
          .sort((a, b) => b.recipe_id - a.recipe_id)
          .slice(0, 4);

        setLatest(sorted);
      });
  }, []);

  // ================= LIKE =================
const handleLike = () => {
  Axios.put(`http://localhost:3001/api/updatelikes/${id}`)
    .then((res) => {
      setLikes(res.data.likes);
    });
};


  // ================= REVIEW =================
const submitReview = () => {

  const name = document.getElementById("r_name").value;
  const email = document.getElementById("r_email").value;
  const message = document.getElementById("r_message").value;

  if (!name || !email || !message || rating === 0) {
    alert("Fill all fields");
    return;
  }

  Axios.post("http://localhost:3001/api/addreview", {
    recipe_id: recipe.recipe_id,
    name,
    email,
    message,
    rating
  }).then(() => {

    // ✅ success message
    setSuccessMsg("Review submitted successfully!");

    // ✅ CLEAR FORM (FIX)
    document.getElementById("r_name").value = "";
    document.getElementById("r_email").value = "";
    document.getElementById("r_message").value = "";

    // ✅ RESET RATING (FIX)
    setRating(0);

    // optional auto remove message after 3 sec
    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);

  });
};

  return(
    <>

    {/* BANNER */}
    <section className="inner-page-banner bg-common">
      <div className="container">
        <div className="breadcrumbs-area">
          <h1>{recipe.recipe_name}</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li>Recipe Details</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="single-recipe-wrap-layout1 padding-top-74 padding-bottom-50">
      <div className="container">
        <div className="row gutters-60">

          {/* ================= LEFT ================= */}
          <div className="col-lg-8">

            <section className="single-recipe-wrap-layout2 padding-bottom-80">
        <div className="container">
          {/* IMAGE */}
              <div className="item-figure">
                <img
                  src={`http://localhost:3001/public/${recipe.image}`}
                  alt=""
                  onDoubleClick={handleLike}
                />
              </div>
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

                const [text, time] = step.split(":"); // split text & time

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
          </div>

          {/* ================= SIDEBAR ================= */}
          <div className="col-lg-4 sidebar-widget-area">

            {/* LATEST */}
            {/* ✅ LATEST RECIPES */}
        <div class="widget">
          <div class="section-heading heading-dark">
            <h3 class="item-heading">LATEST RECIPES</h3>
          </div>

          <div class="widget-latest">
            <ul class="block-list">

                {latest.map((item, index) => (

                <li class="single-item" key={index}>

                    <div class="item-img small-img">
                      <Link to={`/recipe/${item.recipe_id}`}>
                        <img src={`http://localhost:3001/public/${item.image}`} alt=""/>
                      </Link>
                      <div class="count-number">{index+1}</div>
                    </div>

                    <div class="item-content">
                      <div class="item-ctg">{item.category_name}</div>

                        <h4 class="item-title">
                          <Link to={`/single-recipe1/${item.recipe_id}`}>
                            {item.recipe_name}
                          </Link>
                        </h4>
                    </div>

                </li>

                ))}

            </ul>
          </div>
        </div>

            {/* ✅ YOUR NEWSLETTER (UNCHANGED UI) */}
        <div class="widget">
        <div class="widget-newsletter-subscribe">
        <h3>GET LATEST UPDATES</h3>
        <p>Newsletter Subscribe</p>

        <form class="newsletter-subscribe-form">

        <div class="form-group">
        <input 
        type="text" 
        placeholder="your e-mail address" 
        class="form-control" 
        name="email"
        required
        />
        <div class="help-block with-errors"></div>
        </div>

        <div class="form-group mb-none">
        <button type="submit" class="item-btn">SUBSCRIBE</button>
        </div>

        </form>

        </div>
        </div>

            {/* ✅ POPULAR TAGS */}
        <div class="widget">
        <div class="section-heading heading-dark">
        <h3 class="item-heading">POPULAR TAGS</h3>
        </div>

        <div class="widget-tag">
        <ul>
        <li><a href="#">Food</a></li>
        <li><a href="#">Dessert</a></li>
        <li><a href="#">Healthy</a></li>
        <li><a href="#">Breakfast</a></li>
        <li><a href="#">Dinner</a></li>
        <li><a href="#">Veg</a></li>
        <li><a href="#">Non-Veg</a></li>
        </ul>
        </div>
        </div>

          </div>

        </div>
      </div>
    </section>

    </>
  );
}

export default SingleRecipe;