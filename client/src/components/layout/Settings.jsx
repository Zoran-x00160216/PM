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
import { updateUser } from "../../actions/auth";

const Settings = ({
  auth: { user },
  setText,
  webAccounts: { webAccounts },
  notes: { notes, loading },
  cards: { cards },
  identity: { identity },
  editWebAccount,
  editNote,
  editCard,
  editIdentity,
  setAlert,
  updateUser
}) => {
  const [formData, setFormData] = useState({
    password: "",
    password2: ""
  });

  const { password, password2 } = formData;

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "myDanger");
    } else {
      setText(password);
      changeEncryptionOnDBItems(password);
      updateUser({ password });
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
        editWebAccount(webAccount, password);
      });
    Array.isArray(notes) &&
      notes.forEach(note => {
        editNote(note, password);
      });
    Array.isArray(cards) &&
      cards.forEach(card => {
        editCard(card, password);
      });
    Array.isArray(identity) &&
      identity.forEach(idn => {
        editIdentity(idn, password);
      });
  };

  let passResoults = checkPassStrength(password);

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
                      Account permission:{" "}
                      <span className="textPrimary">{user.tier}</span>
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
                  <div className="fs-6">
                    <div className="mb-1">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        New Master Password:
                      </label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control myInput vw50p"
                          name="password"
                          value={password}
                          onChange={e => onChange(e)}
                          minLength="14"
                          required
                        ></input>
                      </div>
                    </div>
                    <small className={passResoults[1]}>{passResoults[0]}</small>
                    <div className="mb-1">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Confirm New Master Password:
                      </label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control myInput vw50p"
                          name="password2"
                          value={password2}
                          onChange={e => onChange(e)}
                          minLength="14"
                          required
                        ></input>
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
  updateUser: PropTypes.func.isRequired
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
  updateUser
})(Settings);
