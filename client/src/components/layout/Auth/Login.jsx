import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../actions/auth";
import { setText } from "../../../actions/text";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Login = ({ login, isAuthenticated, tier, setText }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  // state for password toggle
  const [passwordShown, setPasswordShown] = useState(false);

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  // Navigate to dashboard, vault for user or admin dashboard for admin
  if (isAuthenticated) {
    setText(password);
    if (tier === "admin") {
      navigate("/adminDashboard");
    } else {
      navigate("/webAccounts");
    }
  }

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <main>
      <div className="imgLogin"></div>

      <div className="container">
        <div className="vh-100 row fs-6 d-flex flex-wrap justify-content-center align-content-center m-2">
          <div className="col-md-5 mb-3">
            <h4 className="fw-bold">
              Secure your passwords with Password Manager
            </h4>
          </div>
          <div className="col-md-10 d-flex justify-content-center align-content-center ">
            <div className="shadow-sm p-5 bg-body myRounded">
              <form onSubmit={e => onSubmit(e)}>
                <div className="mb-3">
                  <input
                    type="email"
                    autoComplete="username"
                    className="form-control myRounded"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={e => onChange(e)}
                    required
                  ></input>
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="d-flex">
                  <div className="mr-1 flex-grow-1">
                    <input
                      type={passwordShown ? "text" : "password"}
                      autoComplete="current-password"
                      className="form-control myRounded vw-90"
                      id="exampleInputPassword1"
                      name="password"
                      value={password}
                      onChange={e => onChange(e)}
                      required
                      placeholder="Master Password"
                    ></input>
                  </div>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={togglePassword}
                    className="lrgIcon cursor mt-2 textPrimary"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="mt-4 shadow myBtn longBtn primary"
                  >
                    Login
                  </button>
                </div>

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
  tier: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  tier: state.auth.tier
});

export default connect(mapStateToProps, { login, setText })(Login);
