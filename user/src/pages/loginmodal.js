import React from "react";

function LoginModal() {
  return (
    <div
      className="modal fade"
      id="myModal"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <div className="title-default-bold mb-none">Login</div>

            {/* ✅ Bootstrap 4 close */}
            <button
              type="button"
              className="close"
              data-dismiss="modal"
            >
              ×
            </button>
          </div>

          {/* BODY */}
          <div className="modal-body">

            <form className="login-form">

              <input
                className="main-input-box"
                type="text"
                placeholder="User Name"
              />

              <input
                className="main-input-box"
                type="password"
                placeholder="Password"
              />

              <div className="inline-box mb-5 mt-4">

                <div className="checkbox checkbox-primary">
                  <input id="modal-checkbox" type="checkbox" />
                  <label htmlFor="modal-checkbox">Remember Me</label>
                </div>

                <label className="lost-password">
                  <a href="#">Lost your password?</a>
                </label>

              </div>

              <div className="inline-box mb-5 mt-4">

                <button className="btn-fill" type="submit">
                  Login
                </button>

                <a href="#" className="btn-register">
                  <i className="fas fa-user"></i> Register Here!
                </a>

              </div>

            </form>

            <label>Login connect with your Social Network</label>

            <div className="login-box-social">
              <ul>
                <li>
                  <a href="#" className="facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="linkedin">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="google">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginModal;