import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/collapse";
// import "bootstrap/js/src/collapse";

const NavbarComp = ({ auth: { isAuthenticated, loading }, logout }) => {
  const privateLink = (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link to="/" className="nav-link active" aria-current="page">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/vault" className="nav-link active" aria-current="page">
          Vault
        </Link>
      </li>
      <li className="nav-item">
        <a onClick={logout} className="nav-link" href="#!">
          Logout
          <i className="bi bi-box-arrow-left textPrimary p-2"></i>
        </a>
      </li>
      <li className="nav-item">
        <Link to="/about" className="nav-link">
          About
        </Link>
      </li>
    </ul>
  );

  const publicLink = (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link to="/" className="nav-link active" aria-current="page">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/login" className="nav-link active" aria-current="page">
          login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link active" aria-current="page">
          register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/about" className="nav-link">
          About
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light navbarBg">
      <div className="container fs-6">
        <img src={logo} className="rounded float-start" alt="PM"></img>
        <p className="navbar-brand me-auto mb-2 mb-lg-0 myPr5">
          <b>PM</b>
        </p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse navbarBg"
          id="navbarTogglerDemo03"
        >
          {!loading && (
            <Fragment>{isAuthenticated ? privateLink : publicLink}</Fragment>
          )}
          <form className="d-flex">
            <input
              className="form-control me-2 shadow myBtn"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            ></input>
            <button
              className="btn btn-outline-success shadow myBtn secondary"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

NavbarComp.protoType = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavbarComp);
