import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createNote, getNotes } from "../../../../actions/notes";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCopy, faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormModal.css";

const NotesFormAdd = ({
  getNotes,
  setOpenModalAdd,
  createNote,
  text: { txt },
  categoryRedux: { categories }
}) => {
  const [formData, setFormData] = useState({
    name: "",
    note: "",
    category: "",
    favorite: false
  });

  const { name, note, category, favorite } = formData;

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
    createNote(formData, txt.txt);
    setTimeout(() => getNotes(txt.txt), 60);
    setTimeout(() => setOpenModalAdd(false), 80);
  };

  // if (editStatus.status === 200) {
  //   setTimeout(() => getNotes(txt.txt), 60);
  //   setTimeout(() => setOpenModalAdd(false), 80);
  // }

  return (
    <>
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
                <label htmlFor="message-text" className="col-form-label">
                  Note:
                </label>
                <textarea
                  className="form-control myInput"
                  id="message-text"
                  name="note"
                  rows="40"
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
          </form>
        </div>
      </main>
    </>
  );
};

NotesFormAdd.propType = {
  createNote: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
  setOpenModalAdd: PropTypes.func.isRequired,
  categoryRedux: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  text: state.text,
  categoryRedux: state.categoryRedux
});

export default connect(mapStateToProps, {
  createNote,
  getNotes
})(NotesFormAdd);
