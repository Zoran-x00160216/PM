import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faGear } from "@fortawesome/free-solid-svg-icons";
// import "bootstrap/js/src/collapse";

const NavbarComp = ({ auth: { isAuthenticated, loading, tier }, logout }) => {
  const privateLink = (
    <>
      <li className="nav-item">
        <Link to="/" className="nav-link active" aria-current="page">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/webAccounts" className="nav-link" aria-current="page">
          Vault
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/about" className="nav-link">
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/help" className="nav-link">
          Help
        </Link>
      </li>
      {tier !== "admin" ? null : (
        <li className="nav-item">
          <Link to="/adminDashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
      )}
      <li className="nav-item">
        <Link onClick={logout} className="nav-link" to="#!">
          <FontAwesomeIcon
            icon={faRightToBracket}
            className="textPrimary mr-1"
          />
          Logout
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/settings" className="nav-link">
          <FontAwesomeIcon icon={faGear} className="textPrimary mr-1" />
          Settings
        </Link>
      </li>
    </>
  );

  const publicLink = (
    <>
      <li className="nav-item">
        <Link to="/" className="nav-link active" aria-current="page">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/login" className="nav-link" aria-current="page">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link" aria-current="page">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/about" className="nav-link">
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/help" className="nav-link">
          Help
        </Link>
      </li>
    </>
  );

  return (
    <nav
      id="navbar"
      className="navbar sticky-top navbar-expand-lg navbar-light bgBody"
    >
      <div className="container-fluid fs-6 myNavbar">
        <img src={logo} className="rounded float-start navLogo" alt="PM"></img>
        <p className="navbar-brand me-auto mb-2 mb-lg-0">
          <b>PM</b>
        </p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse bgBody" id="navbarToggler">
          <ul className="navbar-nav me-auto mb-2 d-flex flex-wrap justify-content-center align-content-center">
            {!loading && (
              <Fragment>{isAuthenticated ? privateLink : publicLink}</Fragment>
            )}
          </ul>
        </div>

        {/* <form className="d-flex">
            <input
              className="form-control me-2 shadow myBtn searchWidth"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            ></input>
            <button className="shadow myBtn secondary" type="submit">
              Search
            </button>
          </form> */}
      </div>
      {/* </div> */}
    </nav>
  );
};

NavbarComp.protoType = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavbarComp);
