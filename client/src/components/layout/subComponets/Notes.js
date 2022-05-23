import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { getNotes } from "../../../actions/notes";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/dropdown";

const Notes = ({ getNotes, notes: { loading, notes }, text: { txt } }) => {
  useEffect(() => {
    getNotes(txt.txt);
  }, [getNotes, txt.txt]);
  // console.log(notes);
  // const accountsArray = webAccounts.webAccounts;
  const accounts =
    Array.isArray(notes) &&
    notes.map((n) => {
      const linkWithParam = `/notes/edit/${n._id}`;

      return (
        <div
          key={n._id}
          className="d-flex justify-content-between border-bottom mb-3"
        >
          <div>
            <p className="margin0 fs-6">
              Name:
              <Link to={linkWithParam}>
                <span className="textSecondary"> {n.name}</span>
              </Link>
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
              <li>
                <Link
                  to={linkWithParam}
                  key={n._id}
                  className="mb-2 dropdown-item"
                >
                  Edit
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    });

  return (
    <Fragment>
      <div className="container myVh">
        <div className="row">
          <Sidebar />
          <div className="col-sm-6 mt-3">
            <div className="m-2 p-3 shadow-sm mb-5  bg-body myRounded">
              <div className="col">
                <div className="p-2 hstack gap-5 border-bottom mb-4">
                  <div className="me-auto vw-90">
                    <h5>Notes</h5>
                  </div>
                  <Link to="/notes/add" className="cursor">
                    Add
                    <i className="bi bi-plus-circle textSecondary lrgIcon p-2"></i>
                  </Link>
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
    </Fragment>
  );
};

Notes.propTypes = {
  getNotes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  notes: state.notes,
  text: state.text,
});

export default connect(mapStateToProps, { getNotes })(Notes);
