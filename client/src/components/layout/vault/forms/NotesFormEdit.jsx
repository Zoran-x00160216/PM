import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteNote, editNote, getNotes } from "../../../../actions/notes";
import { formatDate } from "../../../../utility/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const NotesFormEdit = ({
  editNote,
  deleteNote,
  getNotes,
  notes: { loading, notes },
  text: { txt },
  categoryRedux: { categories },
  setOpenModalEdit,
  noteId
}) => {
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    _id: "",
    user_id: "",
    name: "",
    note: "",
    category: "",
    favorite: false,
    updated: "",
    date: ""
  });

  const { name, note, category, favorite, updated, date } = formData;

  let account = [];

  useEffect(() => {
    Array.isArray(notes) &&
      notes.forEach(note => {
        if (noteId === note._id) {
          return account.push(note);
        }
      });

    setFormData({
      _id: loading || !account[0]._id ? "" : account[0]._id,
      user_id: loading || !account[0].user_id ? "" : account[0].user_id,
      name: loading || !account[0].name ? "" : account[0].name,
      note: loading || !account[0].note ? "" : account[0].note,
      category:
        loading || !account[0].category._id ? "" : account[0].category._id,
      favorite: loading || !account[0].favorite ? false : account[0].favorite,
      updated: formatDate(account[0].updated),
      date: formatDate(account[0].date)
    });
  }, [loading]);

  const cat =
    Array.isArray(categories) &&
    categories.map(c => {
      return (
        <option key={c._id} value={c._id}>
          {c.name}
        </option>
      );
    });

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
    setTimeout(() => getNotes(txt.txt), 60);
    setTimeout(() => setOpenModalEdit(false), 80);
  };

  // if (editStatus.acknowledged === true || editStatus.deletedCount === 1) {
  //   setTimeout(() => getNotes(txt.txt), 60);
  //   setTimeout(() => setOpenModalEdit(false), 80);
  // }

  return (
    <>
      <main className="modalBackgroundForm">
        <div className="modalContainerForm bgCards">
          <div className="modal-header">
            <h5 className="modal-title textPrimary">Edit a Note</h5>
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
            <div className="modal-body  fs-6">
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
                  rows="40"
                  id="message-text"
                  name="note"
                  value={note}
                  onChange={e => onChange(e)}
                ></textarea>
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
                    <option defaultValue={""}></option>
                    {cat}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="col-form-label">Favorites:</label>
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
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <button
                  type="submit"
                  name="delete"
                  className="bgCards noBorder"
                  onClick={() => setEdit(true)}
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="lrgIcon deleteBtn"
                  />
                </button>
              </div>
              <div>
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
            </div>
          </form>
          <div className="d-flex justify-content-between">
            {date === updated ? (
              <span className="small-text">Created: {date}</span>
            ) : (
              <>
                {" "}
                <span className="small-text">Created: {date}</span>
                <span className="small-text">Last update: {updated}</span>{" "}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

NotesFormEdit.propTypes = {
  editNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired,
  notes: PropTypes.object.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  noteId: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  text: PropTypes.object.isRequired,
  categoryRedux: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notes: state.notes,
  text: state.text,
  categoryRedux: state.categoryRedux
});

export default connect(mapStateToProps, { editNote, deleteNote, getNotes })(
  NotesFormEdit
);
