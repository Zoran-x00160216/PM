import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCategories, createCategory } from "../../../../actions/category";
import "../../vault/sidebar/SidebarModal.css";

const CategoryFormAdd = ({
  setOpenModalAdd,
  createCategory,
  getCategories
}) => {
  const [formData, setFormData] = useState({
    name: "",
    items: ["no category"]
  });
  const { name } = formData;

  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createCategory(formData);
    setTimeout(() => getCategories(), 70);
    setTimeout(() => setOpenModalAdd(false), 70);
  };
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

CategoryFormAdd.propTypes = {
  setOpenModalAdd: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, { getCategories, createCategory })(
  CategoryFormAdd
);
