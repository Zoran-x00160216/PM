import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/collapse";

const Navbar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <img src={logo} className="rounded float-start" alt="PM"></img>
        <p className="navbar-brand me-auto mb-2 mb-lg-0">
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
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
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

export default Navbar;
