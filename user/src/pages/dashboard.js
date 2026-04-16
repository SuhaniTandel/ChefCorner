import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./dashboard.css";

function Dashboard() {

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [latest, setLatest] = useState([]);

  useEffect(() => {

    Axios.get("http://localhost:3001/api/viewrecipes")
    .then((res) => {

      // ALL RECIPES
      setRecipes(res.data);

      // ✅ LATEST (newest first)
      const latestData = [...res.data]
        .sort((a, b) => b.recipe_id - a.recipe_id) // latest first
        .slice(0, 5); // only 5

      setLatest(latestData);

    })
    .catch((err) => console.log(err));

    Axios.get("http://localhost:3001/api/viewcategory")
      .then(res => setCategories(res.data));

    const $ = window.$;

    setTimeout(() => {
      if ($ && $.fn.owlCarousel) {

        $(".nav-control-layout2").owlCarousel({
          items:1, loop:true, nav:true, autoplay:true, dots:false 
        });

        $(".nav-control-layout1").owlCarousel({
          items:1, loop:true, nav:true, autoplay:true, dots:false 
        });

      }
    }, 800);

  }, []);

  const img = (i) => `http://localhost:3001/public/${i}`;

  return (
    <>

{/* ================= SLIDER ================= */}
<section className="ranna-slider-area">
  <div className="container">
    <div className="rc-carousel owl-carousel nav-control-layout2">

      {recipes.slice(0,3).map((r)=>(
        <div className="ranna-slider-content-layout1" key={r.recipe_id}>
          <figure className="item-figure">
            <img src={img(r.image)} alt="" />
          </figure>

          <div className="item-content">
            <span className="sub-title">{r.category_name}</span>
            
            <h2 className="item-title">{r.recipe_name}</h2>

            <ul className="item-rating">
              <li className="star-fill"><i className="fas fa-star"></i></li>
              <li className="star-fill"><i className="fas fa-star"></i></li>
              <li className="star-fill"><i className="fas fa-star"></i></li>
              <li className="star-fill"><i className="fas fa-star"></i></li>
              <li className="star-empty"><i className="fas fa-star"></i></li>
            </ul>

            <p>{r.description}</p>

            <ul className="entry-meta">
              <li><i className="fas fa-clock"></i>{r.prep_time}</li>
              <li><i className="fas fa-signal"></i>{r.difficulty}</li>
              <li><i className="fas fa-heart"></i>{r.likes || 0}</li>
            </ul>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>


{/* ================= TOP 3 ================= */}
<section className="padding-bottom-18">
  <div className="container">
    <div className="row">

      {recipes.slice(0,3).map((r)=>(
        <div className="col-lg-4" key={r.recipe_id}>
          <div className="product-box-layout1">
            <figure className="item-figure">
              <img src={img(r.image)} alt="" />
            </figure>

            <div className="item-content">
              <span className="sub-title">{r.category_name}</span>
              <h3>{r.recipe_name}</h3>

              <ul className="entry-meta">
                <li><i className="fas fa-clock"></i>{r.prep_time}</li>
                <li><i className="fas fa-signal"></i>{r.difficulty}</li>
                <li><i className="fas fa-heart"></i>{r.likes}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>


{/* ================= MAIN + SIDEBAR ================= */}
<section className="padding-bottom-45">
  <div className="container">
    <div className="row gutters-60">

  {/* ================= LEFT ================= */}
  <div className="col-lg-8">

    <div className="section-heading heading-dark">
      <h2 className="item-heading">TRENDING RECIPES</h2>
    </div>

    <div className="row">

      {/* BIG FIRST RECIPE */}
      {recipes.slice(0,1).map((r) => (
        <div className="col-12" key={r.recipe_id}>
          <div className="product-box-layout1">

            <figure className="item-figure">
              <Link to={`/single-recipe1/${r.recipe_id}`}>
                <img src={img(r.image)} alt={r.recipe_name} />
              </Link>
            </figure>

            <div className="item-content">
              <span className="sub-title">{r.category_name}</span>

              <h2 className="item-title">
                <Link to={`/single-recipe1/${r.recipe_id}`}>
                  {r.recipe_name}
                </Link>
              </h2>

              <ul className="item-rating">
                <li className="star-fill"><i className="fas fa-star"></i></li>
                <li className="star-fill"><i className="fas fa-star"></i></li>
                <li className="star-fill"><i className="fas fa-star"></i></li>
                <li className="star-fill"><i className="fas fa-star"></i></li>
                <li className="star-empty"><i className="fas fa-star"></i></li>
                <li><span>9<span> / 10</span></span></li>
              </ul>

              <p>{r.description?.slice(0,120)}</p>

              <ul className="entry-meta">
                <li><i className="fas fa-clock"></i>{r.prep_time}</li>
                <li><i className="fas fa-signal"></i>{r.difficulty}</li>
                <li><i className="fas fa-heart"></i>{r.likes || 0} Likes</li>
              </ul>
            </div>

          </div>
        </div>
      ))}

      {/* SMALL GRID RECIPES */}
      {recipes.slice(1,5).map((r) => (
        <div className="col-md-6 col-sm-6 col-12" key={r.recipe_id}>
          <div className="product-box-layout1">

            <figure className="item-figure">
              <Link to={`/single-recipe1/${r.recipe_id}`}>
                <img src={img(r.image)} alt={r.recipe_name} />
              </Link>
            </figure>

            <div className="item-content">
              <span className="sub-title">{r.category_name}</span>

              <h3 className="item-title">
                <Link to={`/single-recipe1/${r.recipe_id}`}>
                  {r.recipe_name}
                </Link>
              </h3>

              <ul className="item-rating">
                <li className="star-fill"><i className="fas fa-star"></i></li>
                <li className="star-fill"><i className="fas fa-star"></i></li>
                <li className="star-fill"><i className="fas fa-star"></i></li>
                <li className="star-fill"><i className="fas fa-star"></i></li>
                <li className="star-empty"><i className="fas fa-star"></i></li>
                <li><span>9<span> / 10</span></span></li>
              </ul>

              <p>{r.description?.slice(0,80)}</p>

              <ul className="entry-meta">
                <li><i className="fas fa-clock"></i>{r.prep_time}</li>
                <li><i className="fas fa-signal"></i>{r.difficulty}</li>
                <li><i className="fas fa-heart"></i>{r.likes || 0}</li>
              </ul>
            </div>

          </div>
        </div>
      ))}

    </div>

    

  </div>


  {/* ================= RIGHT SIDEBAR ================= */}
  <div className="col-lg-4 sidebar-widget-area sidebar-break-md">

   

    {/* FOLLOW */}
    <div className="widget">
      <div className="section-heading heading-dark">
        <h3 className="item-heading">SUBSCRIBE & FOLLOW</h3>
      </div>

      <div className="widget-follow-us">
        <ul>
          <li class="single-item"><a href="#"><i class="fab fa-facebook-f"></i>LIKE ME ON</a></li>
          <li class="single-item"><a href="#"><i class="fab fa-twitter"></i>LIKE ME</a></li>
          <li class="single-item"><a href="#"><i class="fab fa-linkedin-in"></i>LIKE ME</a></li>
          <li class="single-item"><a href="#"><i class="fab fa-pinterest-p"></i>LIKE ME</a></li>
          <li class="single-item"><a href="#"><i class="fab fa-instagram"></i>LIKE ME</a></li>
          <li class="single-item"><a href="#"><i class="fab fa-youtube"></i>Subscribe</a></li>
        </ul>
      </div>
    </div>

    {/* LATEST (already dynamic tumhare paas hai) */}
    <div className="widget">
      <div className="section-heading heading-dark">
        <h3 className="item-heading">LATEST RECIPES</h3>
      </div>

      <div className="widget-latest">
        <ul className="block-list">

          {latest.map((item, index) => (
            <li className="single-item" key={index}>

              <div className="item-img">
                <Link to={`/recipe/${item.recipe_id}`}>
                  <img src={img(item.image)} alt="" />
                </Link>
                <div className="count-number">{index + 1}</div>
              </div>

              <div className="item-content">
                <div className="item-ctg">{item.category_name}</div>

                <h4 className="item-title">
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

    {/* CATEGORIES */}
    <div className="widget">
      <div className="section-heading heading-dark">
        <h3 className="item-heading">CATEGORIES</h3>
      </div>

      <div className="widget-categories">
        <ul>
          {categories.map((c) => (
            <li key={c.category_id}>
              <a href="#">
                {c.category_name}
                <span>{c.count || 0}</span>
              </a>
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

  </div>

</div>
  </div>
</section>

<section className="padding-bottom-45">
  <div className="container">

    <div className="section-heading heading-dark">
      <h2 className="item-heading">EDITOR'S CHOICE</h2>
    </div>

    <div className="row">

      {recipes.slice(0,3).map((r) => (
        <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={r.recipe_id}>

          <div className="product-box-layout2">

            <figure className="item-figure">
              <Link to={`/single-recipe1/${r.recipe_id}`}>
                <img src={img(r.image)} alt={r.recipe_name} />
              </Link>
            </figure>

            <div className="item-content">

              <span className="sub-title">{r.category_name}</span>

              <h3 className="item-title">
                <Link to={`/single-recipe1/${r.recipe_id}`}>
                  {r.recipe_name}
                </Link>
              </h3>

              {/* Rating */}
              <ul className="item-rating">
                <li className="star-fill"><i className="fas fa-star"></i></li>
                <li className="star-fill"><i className="fas fa-star"></i></li>
                <li className="star-fill"><i className="fas fa-star"></i></li>
                <li className="star-fill"><i className="fas fa-star"></i></li>
                <li className="star-empty"><i className="fas fa-star"></i></li>
                <li><span>9<span> / 10</span></span></li>
              </ul>

              {/* META */}
              <ul className="entry-meta">
                <li>
                  <i className="fas fa-clock"></i>{r.prep_time}
                </li>
                <li>
                  <i className="fas fa-signal"></i>{r.difficulty}
                </li>
                <li>
                  <i className="fas fa-heart"></i>{r.likes || 0} Likes
                </li>
              </ul>

            </div>

          </div>

        </div>
      ))}

    </div>

  </div>
</section>



{/* ================= POPULAR ================= */}
<section className="padding-bottom-45">
  <div className="container">
    <div className="row gutters-60">

      {/* LEFT SIDE */}
      <div className="col-lg-8">
        <div className="section-heading heading-dark">
          <h2 className="item-heading">POPULAR RECIPES</h2>
        </div>

        <div className="row">
          {recipes.slice(0,4).map((r) => (
            <div className="col-xl-12 col-lg-6 col-md-6 col-sm-6 col-12" key={r.recipe_id}>
              <div className="product-box-layout3">

                <figure className="item-figure">
                  <Link to={`/single-recipe1/${r.recipe_id}`}>
                    <img src={img(r.image)} alt={r.recipe_name} />
                  </Link>
                </figure>

                <div className="item-content">
                  <span className="sub-title">{r.category_name}</span>

                  <h3 className="item-title">
                    <Link to={`/single-recipe1/${r.recipe_id}`}>
                      {r.recipe_name}
                    </Link>
                  </h3>

                  {/* Rating (static ya future me dynamic kar lena) */}
                  <ul className="item-rating">
                    <li className="star-fill"><i className="fas fa-star"></i></li>
                    <li className="star-fill"><i className="fas fa-star"></i></li>
                    <li className="star-fill"><i className="fas fa-star"></i></li>
                    <li className="star-fill"><i className="fas fa-star"></i></li>
                    <li className="star-empty"><i className="fas fa-star"></i></li>
                    <li><span>9<span> / 10</span></span></li>
                  </ul>

                  <p>{r.description?.slice(0,120)}</p>

                  <ul className="entry-meta">
                    <li>
                      <i className="fas fa-clock"></i>{r.prep_time}
                    </li>
                    <li>
                      <i className="fas fa-signal"></i>{r.difficulty}
                    </li>
                    <li>
                      <i className="fas fa-heart"></i>{r.likes || 0} Likes
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - FEATURED */}
      <div className="col-lg-4 sidebar-widget-area sidebar-break-md">

        <div className="widget">
          <div className="section-heading heading-dark">
            <h3 className="item-heading">FEATURED ARTICLE</h3>
          </div>

          <div className="widget-featured-feed">
            <div className="rc-carousel owl-carousel nav-control-layout1">

              {recipes.slice(0,5).map((r) => (
                <div className="featured-box-layout1" key={r.recipe_id}>
                  <div className="item-img">
                    <img src={img(r.image)} alt="" className="img-fluid" />
                  </div>

                  <div className="item-content">
                    <span className="ctg-name">{r.category_name}</span>

                    <h4 className="item-title">
                      <Link to={`/single-recipe1/${r.recipe_id}`}>
                        {r.recipe_name}
                      </Link>
                    </h4>

                    <p>{r.description?.slice(0,80)}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* TAGS (same as your static) */}
        <div className="widget">
          <div className="section-heading heading-dark">
            <h3 className="item-heading">POPULAR TAGS</h3>
          </div>

          <div className="widget-tag">
            <ul>
              <li><a href="#">DESERT</a></li>
              <li><a href="#">CAKE</a></li>
              <li><a href="#">BREAKFAST</a></li>
              <li><a href="#">BURGER</a></li>
              <li><a href="#">DINNER</a></li>
              <li><a href="#">PIZZA</a></li>
              <li><a href="#">SEA FOOD</a></li>
              <li><a href="#">SALAD</a></li>
              <li><a href="#">JUICE</a></li>
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

export default Dashboard;