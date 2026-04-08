import React from "react";

function LoginModal() {
  return (
    <div
      className="modal fade"
      id="myModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">

            <form>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>

            </form>

          </div>

          <div className="modal-footer">
            <p style={{margin:"0 auto"}}>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginModal;