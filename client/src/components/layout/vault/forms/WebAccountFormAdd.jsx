import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PasswordGen from "../../../password/PasswordGen";
import checkPassStrength from "../../../../utility/checkPassStrength";
import { connect } from "react-redux";
import { generatePassword } from "../../../../utility/passwordGenerator";
import {
  createWebAccount,
  getWebAccounts
} from "../../../../actions/webAccounts";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faEye,
  faArrowRotateLeft,
  faGear
} from "@fortawesome/free-solid-svg-icons";
import "./FormModal.css";

const WebAccountFormAdd = ({
  createWebAccount,
  getWebAccounts,
  text: { txt },
  setOpenModalAdd,
  categoryRedux: { categories }
}) => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    uri: "",
    category: "",
    favorite: false,
    note: ""
  });

  const { name, username, password, uri, category, favorite, note } = formData;
  const [openModal, setOpenModal] = useState(false);

  // state for password toggle
  const [passwordShown, setPasswordShown] = useState(false);

  const passProps = {
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true
  };

  let catId = "";
  const cat =
    Array.isArray(categories) &&
    categories.map(c => {
      if (c.name === "no category") {
        catId = c._id;
      }

      return (
        <option key={c._id} value={c._id}>
          {c.name}
        </option>
      );
    });

  useEffect(() => {
    if (category === "") {
      setFormData({ ...formData, category: catId });
    }
  }, []);

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
    setTimeout(() => getWebAccounts(txt.txt), 60);
    setTimeout(() => setOpenModalAdd(false), 80);
  };

  // if (editStatus.status === 200) {
  //   setTimeout(() => getWebAccounts(txt.txt), 60);
  //   setTimeout(() => setOpenModalAdd(false), 80);
  // }

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

  let passResoults = checkPassStrength(password);
  return (
    <>
      {openModal && (
        <PasswordGen setModal={setOpenModal} setPassInput={setPassInput} />
      )}
      <main className="modalBackgroundForm">
        <div className="modalContainerForm bgCards">
          <div className="modal-header">
            <h5 className="modal-title textPrimary">Add</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                setOpenModalAdd(false);
              }}
            ></button>
          </div>
          <form onSubmit={e => onSubmit(e)} className="mb-2">
            <div className="modal-body formScroll fs-6">
              <div>
                <label
                  htmlFor="recipient-name"
                  className="col-form-label small-text"
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

                  <CopyToClipboard text={password}>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="lrgIcon cursor textPrimary"
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <small className={passResoults[1]}>{passResoults[0]}</small>
              <div>
                <label htmlFor="recipient-name" className="col-form-label">
                  Web Address:
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
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Category:
                  </label>
                  <select
                    type="text"
                    className="form-control myInput"
                    id="inputGroupSelect01"
                    name="category"
                    value={category}
                    onChange={e => onChange(e)}
                  >
                    {cat}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">
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
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className=" btn-outline-success shadow myBtn bgGrey mr-2"
                onClick={() => {
                  setOpenModalAdd(false);
                }}
              >
                Close
              </button>
              <button
                type="submit"
                name="update"
                className="btn-outline-success shadow myBtn primary"
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
  setOpenModalAdd: PropTypes.func.isRequired,
  categoryRedux: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  text: state.text,
  categoryRedux: state.categoryRedux
});
export default connect(mapStateToProps, {
  createWebAccount,
  getWebAccounts
})(WebAccountFormAdd);
