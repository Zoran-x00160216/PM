import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/auth";
import { setText } from "../../../actions/text";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Register = ({ setAlert, register, isAuthenticated, setText }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    tier: "basic"
  });

  // state for password toggle
  const [passwordShown, setPasswordShown] = useState(false);

  const { email, password, password2, tier } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "myDanger");
    } else {
      setText(password);
      // const salt = await bcrypt.genSalt(10);
      // const hash = await bcrypt.hash(password, salt);
      register({ email, password, tier });
    }
  };

  // Navigate to if register in
  if (isAuthenticated) {
    navigate("/webAccounts");
  }

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const checkPasswordLength = password => {
    if (password === "") {
      return <></>;
    } else if (password && password.length < 14) {
      return <small className="textRed">Bad password</small>;
    } else if (password && password.length >= 14 && password.length <= 20) {
      return <small className=" textPrimary">Strong password</small>;
    } else {
      return <small className="textSecondary">Super strong password</small>;
    }
  };

  return (
    <main>
      <div className="imgHome"></div>
      <div className="container">
        <div className="vh-100 row fs-6 d-flex flex-wrap justify-content-center align-content-center m-2">
          <div className="col-md-5 mb-3">
            <h4 className="fw-bold">
              Secure your passwords with Password Manager
            </h4>
          </div>
          <div className="col-md-10 d-flex justify-content-center align-content-center ">
            <div className="shadow-sm p-5 bg-body myRounded">
              <form className="myForm" onSubmit={e => onSubmit(e)}>
                <div className="mb-3">
                  <input
                    type="email"
                    autoComplete="username"
                    className="form-control myRounded"
                    id="exampleInputEmail1"
                    placeholder="Email"
                    aria-describedby="emailHelp"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    required
                  ></input>
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="d-flex">
                  <div className="mb-3 mr-1 flex-grow-1">
                    <input
                      type={passwordShown ? "text" : "password"}
                      autoComplete="current-password"
                      className="form-control myRounded vw-90"
                      // id="exampleInputPassword1"
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
                {checkPasswordLength(password)}
                <div className="d-flex">
                  <div className="mr-1 flex-grow-1">
                    <input
                      type={passwordShown ? "text" : "password"}
                      autoComplete="current-password"
                      className="form-control myRounded vw-90"
                      // id="exampleInputPassword1"
                      name="password2"
                      value={password2}
                      onChange={e => onChange(e)}
                      required
                      placeholder="Confirm Master Password"
                    ></input>
                  </div>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={togglePassword}
                    className="lrgIcon cursor mt-2 textPrimary"
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="mt-4 shadow myBtn primary longBtn"
                  >
                    Sign In
                  </button>
                </div>

                <div className="large-text mt-3">
                  <Link to="/login">
                    <strong>Login</strong>
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register, setText })(
  Register
);
