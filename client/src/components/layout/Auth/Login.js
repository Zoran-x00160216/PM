import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="bg-light">
      <div className="container m-2">
        <div className="vh-100 row d-flex flex-wrap justify-content-center align-content-center">
          <div className="col-md-5 mb-3">
            <h2 className="fw-bold">
              Secure your passwords with Password Manager
            </h2>
          </div>
          <div className="col-md-10 d-flex justify-content-center align-content-center ">
            <div className="shadow-sm p-5 bg-body myRounded">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control myBtn"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  ></input>
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control myBtn"
                    id="exampleInputPassword1"
                  ></input>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  ></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-success shadow myBtn  primary fs-5"
                >
                  Login
                </button>
                <div className="large-text mt-3">
                  <Link to="/register">
                    <strong>Register</strong>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
