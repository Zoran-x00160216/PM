import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Home = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    useNavigate("/vault");
  }
  return (
    <>
      <main>
        <div className="imgHome"></div>
        <div className="container">
          <div className="row myVh  d-flex justify-content-center align-content-center">
            <div className="col-md-5 p-3">
              <div className="shadow-sm p-4 mb-5 fixedHgthCards bgCards myRounded">
                <h5 className="fw-bold mb-3">
                  Secure your passwords with Password Manager
                </h5>
                <p>
                  How do you store your passwords? Did you know that almost all
                  social media companies were hacked and customer data was
                  stolen. In latest incident twitter confirmed data breaches as
                  5.4m acccounts sold on hacker forum.
                  <a
                    href="https://www.hackread.com/twitter-data-breach-accounts-sold-hacker-forum/"
                    target="_blank"
                  >
                    <i className=".text-info"> read more on that here...</i>
                  </a>
                </p>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5 mb-3 p-3">
              <div className="shadow-sm p-5 mb-5 fixedHgthCards bgCards myRounded">
                <div>
                  <p className="fw-bold">sign in for free</p>
                </div>
                <div className="row">
                  <div className="col-md-5 mt-3 mr-2 p-3">
                    <Link
                      to="/login"
                      className="btn btn-outline-success shadow myBtn primary fs-5"
                    >
                      <small>Login</small>
                    </Link>
                  </div>

                  <div className="col-md-5 mt-3 p-3">
                    <Link
                      to="/register"
                      className="btn btn-outline-success shadow myBtn  secondary fs-5"
                    >
                      <small>Sign In</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-center align-content-center imgHomeKeyboard">
          <div className="col-md-5 mt-3 p-3">
            <div className="shadow-sm p-5 mb-5 fixedHgthCards bgCards myRounded">
              <h5 className="fw-bold mb-3 textPrimary">Easy to use</h5>
              <p>
                It's straitgh forward to use PM pasword manager, all you need is
                to register and you ready to go. Create web login with all
                needed details and you can start shopping. Save creditcard
                details or note...
              </p>
            </div>
            <div className="shadow-sm p-5 mb-5 fixedHgthCards bgCards myRounded">
              <h5 className="fw-bold mb-3 textPrimary">
                Generate Strong Password
              </h5>
              <p>
                Build in password generator will create strong passwords for
                you. Just set number of characters and complexity and auto
                generator will create password. No need to remeber any
                password..
              </p>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5 mt-3 p-3">
            <div className="shadow-sm p-5 mb-5 fixedHgthCards bgCards myRounded">
              <h5 className="fw-bold mb-3 textPrimary">Security</h5>
              <p>
                All sensitive data is encrypted with AES256 encription standard,
                which is internationaly recognised as one of the safest
                ecryption standards.
              </p>
            </div>
            <div className="shadow-sm p-5 mb-5 fixedHgthCards bgCards myRounded">
              <h5 className="fw-bold mb-3 textPrimary">Dark Web Breaches</h5>
              <p>
                In the few clicks you can find out is it any of your accounts
                copromised. We check all known databases containing stolen
                crededentials.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);
