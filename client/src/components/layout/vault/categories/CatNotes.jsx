import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NotesFormEdit from "../forms/NotesFormEdit";
import { connect } from "react-redux";
import { getNotes } from "../../../../actions/notes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CatNotes = ({ getNotes, notes: { notes }, text: { txt }, c }) => {
  const [noteId, setNoteId] = useState();
  const [openModalEdit, setOpenModalEdit] = useState(false);

  useEffect(() => {
    getNotes(txt.txt);
  }, [getNotes, txt.txt]);

  const setIdAndOpenModalEdit = (id) => {
    setNoteId(id);
    setOpenModalEdit(true);
  };
  const accounts =
    Array.isArray(notes) &&
    notes.map((n) => {
      return n.category._id !== c ? null : (
        <div
          key={n._id}
          className="d-flex justify-content-between border-bottom mb-3"
        >
          <div>
            <p className="margin0 fs-6">
              Name:{n.favorite}
              <span
                onClick={() => setIdAndOpenModalEdit(n._id)}
                className="textSecondary"
              >
                {n.name}
              </span>
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
  return accounts.length === 0 ? null : (
    <>
      {openModalEdit && (
        <NotesFormEdit setOpenModalEdit={setOpenModalEdit} noteId={noteId} />
      )}

      <div>
        <ul className="mt-3 p-1">
          <>{accounts}</>
        </ul>
      </div>
    </>
  );
};

CatNotes.propTypes = {
  getNotes: PropTypes.func.isRequired,
  notes: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  c: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.notes,
  text: state.text,
});

export default connect(mapStateToProps, { getNotes })(CatNotes);
