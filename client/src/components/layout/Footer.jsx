import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faGear } from "@fortawesome/free-solid-svg-icons";

const Footer = ({ auth: { isAuthenticated, loading, tier }, logout }) => {
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
    <footer className="navbar navbar-expand-lg navbar-light p-5 border-top">
      <div className="container-fluid justify-content-center">
        <div className="py-3 mt-3">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!loading && (
              <Fragment>{isAuthenticated ? privateLink : publicLink}</Fragment>
            )}
          </ul>

          <p className="text-center textPrimary pt-3">
            &copy; X00160216 Zoran Railic 2022
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.protoType = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Footer);
