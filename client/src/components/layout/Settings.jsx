import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Sidebar from "./vault/sidebar/Sidebar";
import checkPassStrength from "../../utility/checkPassStrength";
import { editWebAccount } from "../../actions/webAccounts";
import { editNote } from "../../actions/notes";
import { editCard } from "../../actions/cards";
import { editIdentity } from "../../actions/identity";
import { setText } from "../../actions/text";
import { setAlert } from "../../actions/alert";
import { updateUserPassword } from "../../actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Settings = ({
  auth: { user },
  setText,
  webAccounts: { webAccounts },
  notes: { notes },
  cards: { cards },
  identity: { identity },
  editWebAccount,
  editNote,
  editCard,
  editIdentity,
  setAlert,
  updateUserPassword
}) => {
  const [formData, setFormData] = useState({
    password: "",
    password2: ""
  });

  const { password, password2 } = formData;
  // state for password toggle
  const [passwordShown, setPasswordShown] = useState(false);

  const alertControler = false;
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "myDanger");
    } else {
      setText(password);
      changeEncryptionOnDBItems(password);
      updateUserPassword(password);
      setFormData({ password: "", password2: "" });
    }
  };

  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeEncryptionOnDBItems = () => {
    Array.isArray(webAccounts) &&
      webAccounts.forEach(webAccount => {
        const cat = { category: webAccount.category._id };
        webAccount = { ...webAccount, ...cat };
        editWebAccount(webAccount, password, alertControler);
      });
    Array.isArray(notes) &&
      notes.forEach(note => {
        const cat = { category: note.category._id };
        note = { ...note, ...cat };
        editNote(note, password, alertControler);
      });
    Array.isArray(cards) &&
      cards.forEach(card => {
        const cat = { category: card.category._id };
        card = { ...card, ...cat };
        editCard(card, password, alertControler);
      });
    Array.isArray(identity) &&
      identity.forEach(idn => {
        const cat = { category: idn.category._id };
        idn = { ...idn, ...cat };
        editIdentity(idn, password, alertControler);
      });
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
      <div className="container myVh">
        <div className="row">
          <Sidebar />
          <div className="col-sm-6 mt-3">
            <div className="m-2 p-3 shadow-sm mb-5 bgCards myRounded">
              <div className="p-2 hstack gap-5 border-bottom mb-4">
                <div className="me-auto">
                  <p>Account details</p>
                  <p>
                    <small>
                      Email: <span className="textPrimary">{user.email}</span>
                    </small>
                  </p>
                  <p>
                    <small>
                      Account: <span className="textPrimary">{user.tier}</span>
                    </small>
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <p>
                    <small>Change your masster password</small>
                  </p>
                </div>

                <form onSubmit={e => onSubmit(e)}>
                  <div className="d-flex">
                    <div className="mb-3">
                      <div className="mr-1 d-flex">
                        <input
                          type={passwordShown ? "text" : "password"}
                          autoComplete="current-password"
                          className="form-control myRounded searchWidth mr-2"
                          id="exampleInputPassword1"
                          name="password"
                          value={password}
                          onChange={e => onChange(e)}
                          minLength="14"
                          required
                          placeholder="Master Password"
                        ></input>

                        <FontAwesomeIcon
                          icon={faEye}
                          onClick={togglePassword}
                          className="lrgIcon cursor mt-2 textPrimary"
                        />
                      </div>
                    </div>
                  </div>
                  <small className={passResoults[1]}>{passResoults[0]}</small>
                  <div className="mb-3">
                    <div className="mr-1 d-flex">
                      <input
                        type={passwordShown ? "text" : "password"}
                        autoComplete="current-password"
                        className="form-control myRounded searchWidth mr-2"
                        id="exampleInputPassword2"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                        minLength="14"
                        required
                        placeholder="Confirm Master Password"
                      ></input>

                      <FontAwesomeIcon
                        icon={faEye}
                        onClick={togglePassword}
                        className="lrgIcon cursor mt-2 textPrimary"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center vw50p">
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
      </div>
    </>
  );
};

Settings.propTypes = {
  webAccounts: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
  identity: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  editWebAccount: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  editIdentity: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  updateUserPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  webAccounts: state.webAccounts,
  notes: state.notes,
  cards: state.cards,
  identity: state.identity
});

export default connect(mapStateToProps, {
  editNote,
  editWebAccount,
  editCard,
  editIdentity,
  setText,
  setAlert,
  updateUserPassword
})(Settings);
