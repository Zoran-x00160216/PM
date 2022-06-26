import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "../subComponets/Sidebar";
import { connect } from "react-redux";
import { createNote } from "../../../actions/notes";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCopy, faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const NotesFormAdd = ({ createNote, notes: { notes }, text: { txt } }) => {
  const [formData, setFormData] = useState({
    name: "",
    note: "",
    folder: "",
    favorite: false
  });

  const { name, note, folder, favorite } = formData;

  const navigate = useNavigate();

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
    createNote(formData, txt.txt);
  };

  if (notes.status === 200) {
    navigate("/notes");
  }

  return (
    <Fragment>
      <main>
        {/* <AlertComponent /> */}
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
                      navigate("/notes");
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

NotesFormAdd.propType = {
  createNote: PropTypes.func.isRequired,
  // alert: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // alert: state.alert,
  text: state.text,
  notes: state.notes
});
export default connect(mapStateToProps, {
  createNote
})(NotesFormAdd);
