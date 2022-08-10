import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PasswordGen from "../../../password/PasswordGen";
import checkPassStrength from "../../../../utility/checkPassStrength";
import { connect } from "react-redux";
import {
  deleteWebAccount,
  editWebAccount,
  getWebAccounts
} from "../../../../actions/webAccounts";
import { generatePassword } from "../../../../utility/passwordGenerator";
import { formatDate } from "../../../../utility/formatDate";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faTrashCan,
  faArrowRotateLeft,
  faEye,
  faGear
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormModal.css";

const WebAccountFormEdit = ({
  editWebAccount,
  deleteWebAccount,
  getWebAccounts,
  webAccounts: { loading, webAccounts },
  text: { txt },
  setOpenModalEdit,
  loginId
}) => {
  const [openModal, setOpenModal] = useState(false);

  // state for edit or delete toggle if true delete
  const [edit, setEdit] = useState(false);

  // state for password toggle
  const [passwordShown, setPasswordShown] = useState(false);

  const passProps = {
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true
  };

  // state for data
  const [formData, setFormData] = useState({
    _id: "",
    user_id: "",
    name: "",
    username: "",
    password: "",
    uri: "",
    category: "",
    favorite: false,
    note: "",
    updated: "",
    date: ""
  });

  const {
    name,
    username,
    password,
    uri,
    category,
    favorite,
    note,
    updated,
    date
  } = formData;

  // loop over all login accounts and store in var one matching param id
  let account = [];

  useEffect(() => {
    webAccounts.forEach(webAccount => {
      if (loginId === webAccount._id) {
        Object.keys(webAccount).forEach(function() {
          account.push(webAccount);
        });
      }
    });
    setFormData({
      _id: loading || !account[0]._id ? "" : account[0]._id,
      user_id: loading || !account[0].user_id ? "" : account[0].user_id,
      name: loading || !account[0].name ? "" : account[0].name,
      username: loading || !account[0].username ? "" : account[0].username,
      password: loading || !account[0].password ? "" : account[0].password,
      uri: loading || !account[0].uri ? "" : account[0].uri,
      category: loading || !account[0].category ? "" : account[0].category,
      favorite: loading || !account[0].favorite ? false : account[0].favorite,
      note: loading || !account[0].note ? "" : account[0].note,
      updated:
        loading || !account[0].updated ? "" : formatDate(account[0].updated),
      date: loading || !account[0].date ? "" : formatDate(account[0].date)
    });
  }, [loading]);

  // save input in the formdata state
  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handles switch state
  const handleSwitch = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  // check if edit is false or true and submit accordingly true=delete
  const onSubmit = e => {
    e.preventDefault();
    edit ? deleteWebAccount(formData) : editWebAccount(formData, txt.txt);
    setTimeout(() => getWebAccounts(txt.txt), 60);
    setTimeout(() => setOpenModalEdit(false), 80);
    console.log(txt, txt.txt);
  };

  // Password toggle handler
  const togglePassword = () => {
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

  let passResoults = checkPassStrength(password);

  return (
    <>
      <main className="modalBackgroundForm">
        <div className="modalContainerForm bgCards">
          <div className="modal-header">
            <h5 className="modal-title textPrimary">Edit</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                setOpenModalEdit(false);
              }}
            ></button>
          </div>
          <form onSubmit={e => onSubmit(e)}>
            <div className="modal-body formScroll fs-6">
              <div className="mb-1">
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
              <div className="mb-1">
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
              <div className="mb-1">
                <label htmlFor="recipient-name" className="col-form-label">
                  Password:
                </label>
                <div className="d-flex">
                  <div className="mr-1 flex-grow-1">
                    <input
                      type={passwordShown ? "text" : "password"}
                      className="form-control myInput vw-90"
                      autoComplete="current-password"
                      name="password"
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
                <small className={passResoults[1]}>{passResoults[0]}</small>
              </div>
              <div className="mb-1">
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
                  <div className="cursor">
                    <CopyToClipboard text={uri}>
                      <FontAwesomeIcon
                        icon={faCopy}
                        className="lrgIcon textPrimary"
                      />
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-1 col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Category:
                  </label>
                  <input
                    type="text"
                    className="form-control myInput"
                    name="category"
                    value={category}
                    onChange={e => onChange(e)}
                  ></input>
                </div>
                <div className="mb-1 col-md-6 form-check form-switch">
                  <label
                    htmlFor="recipient-name"
                    className="col-form-label form-check-label"
                  >
                    Favorites:
                  </label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="radio"
                      // role="switch"
                      name="favorite"
                      value={favorite}
                      onChange={e => {
                        handleSwitch(e);
                      }}
                      checked={favorite}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="mb-1">
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
            <div className="d-flex justify-content-between mb-3">
              <button
                type="submit"
                name="delete"
                className="noBorder m-2 bg-body"
                onClick={() => setEdit(true)}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="textRed lrgIcon"
                />
              </button>
              <button
                type="button"
                className="btn m-1 btn-outline-success shadow myBtn bgGrey"
                onClick={() => {
                  setOpenModalEdit(false);
                }}
              >
                Close
              </button>
              <button
                type="submit"
                name="update"
                className="btn m-1 btn-outline-success shadow myBtn primary"
              >
                Update
              </button>
            </div>
          </form>
          <div className="m-1 fs-6">
            <span className="small">
              Created: {date}
              <br></br>Last update: {updated}
            </span>
          </div>
        </div>
      </main>
    </>
  );
};

WebAccountFormEdit.propTypes = {
  editWebAccount: PropTypes.func.isRequired,
  deleteWebAccount: PropTypes.func.isRequired,
  webAccounts: PropTypes.object.isRequired,
  getWebAccounts: PropTypes.func.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  loginId: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  webAccounts: state.webAccounts,
  text: state.text
});

export default connect(mapStateToProps, {
  editWebAccount,
  deleteWebAccount,
  getWebAccounts
})(WebAccountFormEdit);
