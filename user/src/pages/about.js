import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./about.css";

function About() {

  const [about, setAbout] = useState({});
  const [latest, setLatest] = useState([]);

  useEffect(() => {

    // ABOUT DATA
    Axios.get("http://localhost:3001/api/about")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAbout(res.data[0]);
        } else {
          setAbout(res.data);
        }
      })
      .catch((err) => console.log(err));

    // LATEST RECIPES
    Axios.get("http://localhost:3001/api/viewrecipes")
      .then((res) => {
        const latestData = res.data
          .sort((a, b) => b.recipe_id - a.recipe_id)
          .slice(0, 4);

        setLatest(latestData);
      });

  }, []);

  const img = (i) => `http://localhost:3001/public/${i}`;

  return (
    <>{/* Banner */}
      <section className="inner-page-banner bg-common">
        <div className="container">
          <div className="breadcrumbs-area">
            <h1>About Us</h1>

            <ul className="breadcrumb-list">
              <li><a href="/">Home</a></li>
              <li>About</li>
            </ul>

          </div>
        </div>
      </section>
    
    <section className="all-recipes-page-wrap padding-top-80 padding-bottom-50">
      <div className="container">
        <div className="row gutters-60">

          {/* ================= LEFT ================= */}
          <div className="col-lg-8">
            <div className="about-box">

              <div className="about-image">
                <img src="/assets/img/figure/avatar.jpg" alt="chef" />
              </div>

              <div className="about-text"> 
                <h2>Cooking With Passion</h2> 
                <p> Our recipe website is created for people who love cooking and exploring new flavors. We believe that cooking is not only about preparing food but also about creativity, joy and sharing moments with loved ones. </p> 
                <p> Here you will find a variety of recipes including breakfast, lunch, dinner, snacks and desserts. Every recipe is explained in simple steps so that beginners can easily follow and create delicious meals at home. </p>
              </div>
            </div>
              
            <div className="form">
              <div className="section-heading heading-dark">
                <h2 className="item-heading">QUICK CONTACT ME</h2>
              </div>

              {/* CONTACT FORM */}
              
              
              
                <form className="about-contact-form">
                  <div className="row">

                    <div className="col-md-4 form-group">
                      <input type="text" placeholder="Name *" className="form-control" required />
                    </div>

                    <div className="col-md-4 form-group">
                      <input type="email" placeholder="E-mail *" className="form-control" required />
                    </div>

                    <div className="col-md-4 form-group">
                      <input type="text" placeholder="Phone *" className="form-control" required />
                    </div>

                    <div className="col-12 form-group">
                      <textarea placeholder="Message" className="textarea form-control" rows="7" required></textarea>
                    </div>

                    <div className="col-12 form-group mb-0 mt-3">
                      <button type="submit" className="item-btn">SEND MESSAGE</button>
                    </div>

                  </div>
                </form>
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
                  <li className="single-item"><a href="#"><i className="fab fa-facebook-f"></i>LIKE ME ON</a></li>
                  <li className="single-item"><a href="#"><i className="fab fa-twitter"></i>LIKE ME</a></li>
                  <li className="single-item"><a href="#"><i className="fab fa-linkedin-in"></i>LIKE ME</a></li>
                  <li className="single-item"><a href="#"><i className="fab fa-pinterest-p"></i>LIKE ME</a></li>
                  <li className="single-item"><a href="#"><i className="fab fa-instagram"></i>LIKE ME</a></li>
                  <li className="single-item"><a href="#"><i className="fab fa-youtube"></i>Subscribe</a></li>
                </ul>
              </div>
            </div>


            {/* LATEST RECIPES */}
            <div className="widget">
              <div className="section-heading heading-dark">
                <h3 className="item-heading">LATEST RECIPES</h3>
              </div>

              <div className="widget-latest">
                <ul className="block-list">

                  {latest.map((item, index) => (
                    <li className="single-item" key={index}>

                      <div className="item-img">
                        <img src={img(item.image)} alt="" />
                        <div className="count-number">{index + 1}</div>
                      </div>

                      <div className="item-content">
                        <div className="item-ctg">{item.category_name}</div>

                        <h4 className="item-title">
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
    </>
  );
}

export default About;