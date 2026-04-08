import React from "react";
import "../pages/contact.css";

function Contact() {
  return (
    <div>

      {/* Banner */}
      <section className="inner-page-banner bg-common">
        <div className="container">
          <div className="breadcrumbs-area">
            <h1>Contact With Us</h1>

            <ul className="breadcrumb-list">
              <li><a href="/">Home</a></li>
              <li>Contact</li>
            </ul>

          </div>
        </div>
      </section>

      {/* Contact Box */}
      <div className="contact-wrapper">

        <div className="contact-box">

          <h3>Our Address</h3>

          <p>
            Korem ipsum dolor sitter amet consectetuer adipiscing elitter
            Curabtur ugueque habitant morbi tristique.
          </p>

          <div className="contact-address">
            <ul>
              <li>📍  Vadodara, India</li>
              <li>✉  chefcornerrecipe@gmail.com</li>
              <li>📞 +91 1234567891</li>
            </ul>
          </div>

          <h3>Send Us Message</h3>

          <form className="contact-form-box">
            <input type="text" placeholder="Name"/>
            <input type="email" placeholder="Email"/>
            <input type="text" placeholder="Subject"/>
            <textarea rows="5" placeholder="Message"></textarea>

            <button>SUBMIT MESSAGE</button>
          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;