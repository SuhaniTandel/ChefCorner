import React, { useState } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import "./login.css";

function Login() {

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ ADD STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ LOGIN FUNCTION
  const handleLogin = (e) => {
    e.preventDefault(); // ❌ reload stop

    Axios.post("http://localhost:3001/api/login", {
      email: email,
      password: password
    })
    .then((response) => {

      if (response.data.success) {

        // ✅ SAVE LOGIN
        localStorage.setItem("user_id", response.data.user_id);

        // ✅ REDIRECT BACK
        const from = location.state?.from || "/";
        navigate(from);

      } else {
        alert("Invalid email or password");
      }

    })
    .catch(() => {
      alert("Error in login");
    });
  };

  return (
    <div>

      {/* Banner */}
      <section
        className="inner-page-banner bg-common"
        style={{ backgroundImage: "url(/img/figure/inner-page-banner1.jpg)" }}
      >
        <div className="container">
          <div className="breadcrumbs-area">
            <h1>User Login Page</h1>
            <ul>
              <li><a href="/">Home</a></li>
              <li>Login</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="login-page-wrap padding-top-80 padding-bottom-50">
        <div className="container">
          <div className="row">

            <div className="col-lg-6 mx-auto">
              <div className="login-box-layout1">

                <div className="section-heading heading-dark">
                  <h2 className="item-heading">LOGIN FORM</h2>
                </div>

                {/* ✅ ADD onSubmit */}
                <form className="login-form" onSubmit={handleLogin}>

                  <div className="row">

                    <div className="col-md-6">
                      <label className="mb-3">Username or Email Address</label>
                      <input
                        className="main-input-box"
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="mb-3">Password</label>
                      <input
                        className="main-input-box"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                  </div>

                  <div className="row mt-3">

                    <div className="col-md-6">
                      <div className="checkbox checkbox-primary">
                        <input id="checkbox1" type="checkbox" />
                        <label htmlFor="checkbox1">Remember Me</label>
                      </div>
                    </div>

                    <div className="col-md-6 text-end">
                      <a href="#" className="lost-password">
                        Lost your password?
                      </a>
                    </div>

                  </div>

                  <div className="btn-area mt-4">

                    <button className="btn-fill btn-primary" type="submit">
                      Login
                    </button>

                    <button 
                      className="btn-fill btn-dark" 
                      type="button" 
                      onClick={() => (window.location = "/register")}
                    >
                      Create an Account
                    </button>

                  </div>

                </form>

                <label className="mt-4">Or Connect With Social Networks</label>

                <div className="login-box-social">
                  <ul>
                    <li><a href="#" className="facebook"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#" className="twitter"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#" className="linkedin"><i className="fab fa-linkedin-in"></i></a></li>
                    <li><a href="#" className="google"><i className="fab fa-google-plus-g"></i></a></li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Login;