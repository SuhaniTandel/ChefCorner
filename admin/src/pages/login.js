import Axios from "axios";
import React from "react";
import Swal from "sweetalert2";

function Login() {

  function loginuser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
      });
      return;
    }

    Axios.post("http://localhost:3001/api/login", { email, password })
      .then((response) => {

        if (response.data.message) {

          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message
          });

        } else {

          const data = { email: email };
          sessionStorage.setItem("mydata", JSON.stringify(data));

          Swal.fire({
            icon: "success",
            title: "Success",
            text: `Welcome ${email}`
          }).then(() => {
            window.location = "/dash";
          });

        }
      });

  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>ChefCorner Login</h1>
        <p>Enter your credentials to access your account</p>

        <form>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="button" className="btn-login" onClick={loginuser}>Login </button>

        </form>

        <p className="forgot-password">
          <a href="#">Forgot your password?</a>
        </p>
      </div>
    </div>
  );
}

export default Login;