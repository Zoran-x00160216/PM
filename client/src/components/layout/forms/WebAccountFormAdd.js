import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "../subComponets/Sidebar";
import AlertComponent from "../AlertComponent";
import { connect } from "react-redux";
import { createWebAccount } from "../../../actions/webAccounts";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faArrowRotateLeft,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const WebAccountFormAdd = ({
  createWebAccount,
  webAccounts: { webAccounts },
  text: { txt }
}) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    uri: "",
    folder: "",
    favorite: false,
    note: ""
  });

  const { name, username, password, uri, folder, favorite, note } = formData;

  // state for password toggle
  const [passwordShown, setPasswordShown] = useState(false);

  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitch = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const onSubmit = e => {
    e.preventDefault();
    createWebAccount(formData, txt.txt);
  };

  const navigate = useNavigate();
  if (webAccounts.status === 200) {
    navigate("/vault");
  }

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <Fragment>
      <main>
        <AlertComponent />
        <div className="container myVh">
          <div className="row">
            <Sidebar className="hideElement" />
            <div className="col-sm-6 mt-3">
              <div className="m-2 p-2 shadow-sm mb-5 bg-body myRounded">
                <div className="modal-header">
                  <h5 className="modal-title textPrimary">Add</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={e => {
                      navigate("/vault");
                    }}
                  ></button>
                </div>
                <form onSubmit={e => onSubmit(e)}>
                  <div className="modal-body fs-6">
                    <div>
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Name:
                      </label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control myInput"
                          name="name"
                          value={name}
                          onChange={e => onChange(e)}
                          required
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Username:
                      </label>
                      <div className="d-flex">
                        <div className="mr-1 flex-grow-1">
                          <input
                            type="text"
                            className="form-control myInput"
                            id="recipient-username"
                            autoComplete="username"
                            name="username"
                            value={username}
                            onChange={e => onChange(e)}
                            required
                          ></input>
                        </div>
                        <div className="cursor">
                          <CopyToClipboard text={username}>
                            <FontAwesomeIcon
                              icon={faCopy}
                              className="lrgIcon textPrimary"
                            />
                          </CopyToClipboard>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Password:
                      </label>
                      <div className="d-flex">
                        <div className="mr-1 flex-grow-1">
                          <input
                            type={passwordShown ? "text" : "password"}
                            className="form-control myInput vw-90"
                            name="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => onChange(e)}
                            minLength="14"
                            required
                          ></input>
                        </div>
                        <FontAwesomeIcon
                          icon={faEye}
                          onClick={togglePassword}
                          className="lrgIcon cursor mr-1 textPrimary"
                        />
                        <FontAwesomeIcon
                          icon={faArrowRotateLeft}
                          className="lrgIcon cursor mr-1 textPrimary"
                        />
                        <CopyToClipboard text={password}>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="lrgIcon cursor textPrimary"
                          />
                        </CopyToClipboard>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        URI:
                      </label>
                      <div className="d-flex">
                        <div className="mr-1 flex-grow-1">
                          <input
                            type="text"
                            className="form-control myInput"
                            name="uri"
                            value={uri}
                            onChange={e => onChange(e)}
                          ></input>
                        </div>
                        {/* <div className="cursor">
                          <CopyToClipboard text={uri}>
                            <FontAwesomeIcon
                              icon={faCopy}
                              className="lrgIcon textPrimary"
                            />
                          </CopyToClipboard>
                        </div> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Folder:
                        </label>
                        <input
                          type="text"
                          className="form-control myInput"
                          name="folder"
                          value={folder}
                          onChange={e => onChange(e)}
                        ></input>
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Favorites:
                        </label>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            name="favorite"
                            value={favorite}
                            onChange={e => {
                              handleSwitch(e);
                            }}
                            aria-checked={favorite}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message-text" className="col-form-label">
                        Note:
                      </label>
                      <textarea
                        className="form-control myInput"
                        id="message-text"
                        name="note"
                        value={note}
                        onChange={e => onChange(e)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-3">
                    <button
                      type="button"
                      className="btn m-1 btn-outline-success shadow myBtn secondary"
                      onClick={e => {
                        navigate("/vault");
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

WebAccountFormAdd.propType = {
  createWebAccount: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired,
  webAccounts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert,
  text: state.text,
  webAccounts: state.webAccounts
});
export default connect(mapStateToProps, {
  createWebAccount
})(WebAccountFormAdd);
