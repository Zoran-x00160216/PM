import React from "react";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import home from "../../img/home.png";

const Home = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    <Navigate to="/vault"></Navigate>;
  }
  return (
    <main className="home">
      {/* <img src={home} className="homeImg rounded float-start" alt="PM"></img> */}

      <div className="container">
        <div className="vh-100 row d-flex flex-wrap justify-content-center align-content-center m-2">
          <div className="col-md-5 mb-3">
            <h2 className="fw-bold">
              Secure your passwords with Password Manager
            </h2>
          </div>
          <div className="col-md-10 d-flex justify-content-center align-content-center ">
            <div className="large-text mt-3 p-3">
              <Link
                to="/login"
                className="btn btn-outline-success shadow myBtn  primary fs-5"
              >
                <strong>Login</strong>
              </Link>
            </div>

            <div className="large-text mt-3 p-3">
              <Link
                to="/register"
                className="btn btn-outline-success shadow myBtn  secondary fs-5"
              >
                <strong>Sign In</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
