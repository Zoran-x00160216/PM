import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formatDate } from "../../../../utility/formatDate";
import {
  editCategory,
  getCategories,
  createCategory,
  deleteCategory
} from "../../../../actions/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./FormModal.css";

const CategoryFormEdit = ({
  setOpenModalEdit,
  passId,
  editCategory,
  getCategories,
  deleteCategory,
  categoryRedux: { loading, categories }
}) => {
  const [formData, setFormData] = useState({
    _id: "",
    user_id: "",
    name: "",
    items: ["no category"]
  });
  const { name, updated, date } = formData;

  const [edit, setEdit] = useState(false);

  let account = [];
  Array.isArray(categories) &&
    categories.map(category => {
      if (passId === category._id) {
        Object.keys(category).forEach(function() {
          account.push(category);
        });
      }
      return category;
    });

  useEffect(() => {
    // console.log(account);
    setFormData({
      _id: loading || !account[0]._id ? "" : account[0]._id,
      user_id: loading || !account[0].user_id ? "" : account[0].user_id,
      name: loading || !account[0].name ? "" : account[0].name,
      items: loading || !account[0].items ? "" : account[0].items,
      updated: formatDate(account[0].updated),
      date: formatDate(account[0].date)
    });
  }, [loading]);
  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    edit ? deleteCategory(formData) : editCategory(formData);
    setTimeout(() => getCategories(), 50);
    setTimeout(() => setOpenModalEdit(false), 70);
  };
  return (
    <>
      <main className="modalBackgroundForm">
        <div className="modalContainerFormSmall bgCards">
          <div className="modal-header">
            <h5 className="modal-title textPrimary">Edit</h5>
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
            <div className="modal-body fs-6">
              <div>
                <label htmlFor="recipient-name" className="col-form-label">
                  Name of category:
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
            </div>
            <div className="d-flex justify-content-between mb-3">
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
          </form>
          <div className="m-1 fs-6">
            <span className="small">
              Created: {date}
              <br></br>Last update: {updated}
            </span>
          </div>
        </div>
      </main>
    </>
  );
};

CategoryFormEdit.propTypes = {
  setOpenModalEdit: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  passId: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  categoryRedux: state.categoryRedux
});

export default connect(mapStateToProps, {
  editCategory,
  getCategories,
  createCategory,
  deleteCategory
})(CategoryFormEdit);
