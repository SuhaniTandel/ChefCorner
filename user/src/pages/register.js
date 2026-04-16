import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import "./register.css";

function Register() {

  function RegisterUser() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    
    if (!name || !email || !password || !confirm_password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
      });
      return;
    }

    if (password !== confirm_password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match",
      });
      return;
    }

    // API Call
    Axios.post("http://localhost:3001/api/register", {
      name: name,
      email: email,
      password: password
    })
    .then((response) => {

      if (response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Registered Successfully"
        }).then(() => {
          window.location = "/login";
        });
      }

    });

  }

  return (
    <div>

      {/* Banner */}
      <section
        className="inner-page-banner bg-common"
        style={{ backgroundImage: "url(/img/figure/inner-page-banner1.jpg)" }}
      >
        <div className="container">
          <div className="breadcrumbs-area">
            <h1>User Register</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>Register</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Register Form */}
      <section className="register-section">
        <div className="container">
          <div className="register-card">

            <h2 className="register-title">Create Account</h2>

            <form>

              <div className="form-group">
                <label>Full Name</label>
                <input type="text" id="name" placeholder="Enter your full name" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" id="password" placeholder="Enter password" />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" id="confirm_password" placeholder="Confirm password" />
              </div>

              <button type="button" className="register-btn" onClick={RegisterUser}>
                Register
              </button>

              <p className="login-link">
                Already have an account? <Link to="/login">Login</Link>
              </p>

            </form>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Register;