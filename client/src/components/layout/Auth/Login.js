import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../actions/auth";
import { setText } from "../../../actions/text";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated, setText }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const [textPs, setTextPs] = useState("");

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Navigate to vault if logged in
  if (isAuthenticated) {
    setText(password);
    return <Navigate to="/vault" />;
  }

  return (
    <main>
      <div className="container">
        <div className="vh-100 row fs-6 d-flex flex-wrap justify-content-center align-content-center m-2">
          <div className="col-md-5 mb-3">
            <h4 className="fw-bold">
              Secure your passwords with Password Manager
            </h4>
          </div>
          <div className="col-md-10 d-flex justify-content-center align-content-center ">
            <div className="shadow-sm p-5 bg-body myRounded">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    autoComplete="username"
                    className="form-control myRounded"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
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
                    autoComplete="current-password"
                    className="form-control myRounded"
                    id="exampleInputPassword1"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    required
                  ></input>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-success shadow myBtn  primary fs-5"
                >
                  Login
                </button>
                <div className="large-text mt-3">
                  <Link to="/register">
                    <strong>Sign In</strong>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, setText })(Login);
