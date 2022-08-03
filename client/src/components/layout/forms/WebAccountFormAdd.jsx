import React, { useState } from "react";
import PropTypes from "prop-types";
import PasswordGen from "../../password/PasswordGen";
import { connect } from "react-redux";
import { generatePassword } from "../../../utility/passwordGenerator";
import { createWebAccount, getWebAccounts } from "../../../actions/webAccounts";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faEye,
  faArrowRotateLeft,
  faGear
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormModal.css";

const WebAccountFormAdd = ({
  createWebAccount,
  getWebAccounts,
  webAccounts: { editAccount },
  text: { txt },
  setOpenModalAdd
}) => {
  // const navigate = useNavigate();
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

  const [openModal, setOpenModal] = useState(false);

  // state for password toggle
  const [passwordShown, setPasswordShown] = useState(false);

  const passProps = {
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true
  };

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
    setTimeout(() => getWebAccounts(txt.txt), 100);
    setTimeout(() => setOpenModalAdd(false), 120);
  };

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const getPassword = () => {
    const newPassword = generatePassword(passProps, 15);
    setFormData({ ...formData, password: newPassword });
  };

  const setPassInput = (pass, e) => {
    e.preventDefault();
    setFormData({ ...formData, password: pass.value });
    setOpenModal(false);
  };

  return (
    <>
      <main className="modalBackgroundForm">
        <div className="modalContainerForm bgCards">
          <div className="modal-header">
            <h5 className="modal-title textPrimary">Add an Account</h5>
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
            <div className="modal-body formScroll fs-6">
              <div>
                <label htmlFor="recipient-name" className="col-form-label">
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
                <label htmlFor="recipient-name" className="col-form-label">
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
                <label htmlFor="recipient-name" className="col-form-label">
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
                    onClick={e => getPassword(e)}
                  />
                  <FontAwesomeIcon
                    icon={faGear}
                    className="lrgIcon cursor mr-1 textPrimary"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  />
                  {openModal && (
                    <PasswordGen
                      setModal={setOpenModal}
                      setPassInput={setPassInput}
                    />
                  )}
                  <CopyToClipboard text={password}>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="lrgIcon cursor textPrimary"
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <div>
                <label htmlFor="recipient-name" className="col-form-label">
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
                  <label htmlFor="recipient-name" className="col-form-label">
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
                  <label htmlFor="recipient-name" className="col-form-label">
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
          </form>
        </div>
      </main>
    </>
  );
};

WebAccountFormAdd.propType = {
  createWebAccount: PropTypes.func.isRequired,
  getWebAccounts: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
  webAccounts: PropTypes.object.isRequired,
  setOpenModalAdd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  text: state.text,
  webAccounts: state.webAccounts
});
export default connect(mapStateToProps, {
  createWebAccount,
  getWebAccounts
})(WebAccountFormAdd);
