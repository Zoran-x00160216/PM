import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "./sidebar/Sidebar";
import NotesFormAdd from "./forms/NotesFormAdd";
import NotesFormEdit from "./forms/NotesFormEdit";
import { connect } from "react-redux";
import { getNotes } from "../../../actions/notes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPlus,
  faMagnifyingGlass,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Spinner from "../../spinner/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/dropdown";

const Notes = ({ getNotes, notes: { loading, notes }, text: { txt } }) => {
  const [noteId, setNoteId] = useState();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    getNotes(txt.txt);
  }, [getNotes, txt.txt]);

  const handleInput = e => {
    e.preventDefault();
    setSearchVal(e.target.value);
  };

  const handleClearBtn = () => {
    setSearchVal("");
  };

  const filteredNotes = notes.filter(note => {
    return note.name.includes(searchVal);
  });

  const setIdAndOpenModalEdit = id => {
    setNoteId(id);
    setOpenModalEdit(true);
  };
  const accounts =
    Array.isArray(notes) &&
    filteredNotes.map(n => {
      return (
        <div
          key={n._id}
          className="d-flex justify-content-between border-bottom mb-3"
        >
          <div>
            <p
              className="margin0 fs-6 cursor"
              onClick={() => setIdAndOpenModalEdit(n._id)}
            >
              Name:
              <span className="textSecondary">{n.name}</span>
            </p>
            {/* <p className="margin0">Note: {note.note}</p> */}
          </div>

          <div className="dropdown">
            <FontAwesomeIcon
              icon={faEllipsis}
              className="lrgIcon cursor textSecondary dropdown-toggle"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />

            <ul
              className="dropdown-menu noBorder shadow-sm myRounded"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <CopyToClipboard text={n.note}>
                  <span className="dropdown-item">Copy Note</span>
                </CopyToClipboard>
              </li>
              <li
                onClick={() => setIdAndOpenModalEdit(n._id)}
                className="mb-2 dropdown-item"
              >
                Edit
              </li>
            </ul>
          </div>
        </div>
      );
    });

  return loading && notes.length === 0 ? (
    <Spinner />
  ) : (
    <>
      {openModalAdd && <NotesFormAdd setOpenModalAdd={setOpenModalAdd} />}
      {openModalEdit && (
        <NotesFormEdit setOpenModalEdit={setOpenModalEdit} noteId={noteId} />
      )}
      <div className="myContainer">
        <div className="row">
          <Sidebar />
          <div className="col-md-8 mt-3">
            <div className="p-3 shadow-sm mb-5 bgCards myRounded">
              <div className="me-auto vw-90">
                <p>Notes</p>
              </div>
              <div className="col">
                <div className="p-2 hstack gap-5 border-bottom mb-4">
                  <div
                    onClick={() => setOpenModalAdd(true)}
                    className="cursor me-auto vw-60"
                  >
                    <small className="mr-2">Add</small>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="smIcon textPrimary"
                    />
                  </div>
                  <div className="input-wrap shadow-sm">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="smIcon textPrimary"
                    ></FontAwesomeIcon>
                    <input
                      onChange={handleInput}
                      value={searchVal}
                      type="text"
                      name="data-search"
                      id="data-search"
                      placeholder="Search Notes"
                    />

                    <FontAwesomeIcon
                      icon={faXmark}
                      className="smIcon textPrimary cursor"
                      onClick={handleClearBtn}
                    ></FontAwesomeIcon>
                  </div>
                </div>
                <div>
                  <ul className="mt-3 p-1">
                    <>{accounts}</>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Notes.propTypes = {
  getNotes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  notes: state.notes,
  text: state.text
});

export default connect(mapStateToProps, { getNotes })(Notes);
