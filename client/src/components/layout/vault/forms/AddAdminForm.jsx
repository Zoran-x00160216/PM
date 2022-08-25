import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers, createAdmin } from "../../../../actions/admin";
import { setAlert } from "../../../../actions/alert";
import checkPassStrength from "../../../../utility/checkPassStrength";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const AddAdminForm = ({ setOpenModalAdd, createAdmin, getUsers, setAlert }) => {
  // state for password toggle
  const [passwordShown, setPasswordShown] = useState(false);
  // set form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: ""
  });
  const { email, password, password2 } = formData;

  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(email, password);
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "myDanger");
    } else {
      createAdmin({ email, password });
      setTimeout(() => getUsers(), 60);
      setTimeout(() => setOpenModalAdd(false), 70);
    }
  };

  let passResoults = checkPassStrength(password);
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <main className="modalBackgroundForm">
        <div className="modalContainerFormSmall bgCards">
          <div className="modal-header">
            <h5 className="modal-title textPrimary">Add Admin</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                setOpenModalAdd(false);
              }}
            ></button>
          </div>
          <form onSubmit={e => onSubmit(e)}>
            <div className="modal-body fs-6">
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
                    placeholder="Password"
                  ></input>
                </div>
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={togglePassword}
                  className="lrgIcon cursor mt-2 textPrimary"
                />
              </div>
              <small className={passResoults[1]}>{passResoults[0]}</small>
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
                    placeholder="Confirm Password"
                  ></input>
                </div>
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={togglePassword}
                  className="lrgIcon cursor mt-2 textPrimary"
                />
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  className="btn m-1 btn-outline-success shadow myBtn bgGrey"
                  onClick={() => {
                    setOpenModalAdd(false);
                  }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  name="update"
                  className="btn m-1 btn-outline-success shadow myBtn primary"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

AddAdminForm.propTypes = {
  setOpenModalAdd: PropTypes.func.isRequired,
  createAdmin: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { getUsers, createAdmin, setAlert })(AddAdminForm);
