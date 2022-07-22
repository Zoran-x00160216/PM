import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "../subComponets/Sidebar";
import { connect } from "react-redux";
import { deleteNote, editNote } from "../../../actions/notes";
import { formatDate } from "../../../utility/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const NotesFormEdit = ({
  editNote,
  deleteNote,
  notes: { loading, notes },
  text: { txt }
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    _id: "",
    user_id: "",
    name: "",
    note: "",
    folder: "",
    favorite: false,
    updated: "",
    date: ""
  });

  const { name, note, folder, favorite, updated, date } = formData;
  let account = [];
  Array.isArray(notes) &&
    notes.map(note => {
      if (params.id === note._id) {
        Object.keys(note).forEach(function() {
          account.push(note);
        });
      }
      return note;
    });
  useEffect(() => {
    // console.log(account);
    setFormData({
      _id: loading || !account[0]._id ? "" : account[0]._id,
      user_id: loading || !account[0].user_id ? "" : account[0].user_id,
      name: loading || !account[0].name ? "" : account[0].name,
      note: loading || !account[0].note ? "" : account[0].note,
      folder: loading || !account[0].folder ? "" : account[0].folder,
      favorite: loading || !account[0].favorite ? false : account[0].favorite,
      updated: formatDate(account[0].updated),
      date: formatDate(account[0].date)
    });
  }, [loading]);

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
    edit ? deleteNote(formData) : editNote(formData, txt.txt);
  };

  if (notes.acknowledged === true || notes.deletedCount === 1) {
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
              <div className="m-2 p-2 shadow-sm mb-5 bgCards myRounded">
                <div className="modal-header">
                  <h5 className="modal-title textPrimary">Edit</h5>
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
                    <div className="mb-1">
                      <label className="col-form-label">Name:</label>
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
                        rows="10"
                        id="message-text"
                        name="note"
                        value={note}
                        onChange={e => onChange(e)}
                      ></textarea>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="col-form-label">Folder:</label>
                        <input
                          type="text"
                          className="form-control myInput"
                          name="folder"
                          value={folder}
                          onChange={e => onChange(e)}
                        ></input>
                      </div>
                      <div className="col-md-6">
                        <label className="col-form-label">Favorites:</label>
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
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div>
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
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn m-1 btn-outline-success shadow myBtn bgGrey"
                        onClick={e => {
                          navigate("/notes");
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
                  </div>
                </form>
                <div className="m-3 fs-6">
                  <span className="small">
                    Created: {date}
                    <br></br>Last update: {updated}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

NotesFormEdit.propTypes = {
  editNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  notes: PropTypes.object.isRequired,
  edit: PropTypes.bool,
  alert: PropTypes.array.isRequired,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert,
  notes: state.notes,
  text: state.text
});

export default connect(mapStateToProps, { editNote, deleteNote })(
  NotesFormEdit
);
