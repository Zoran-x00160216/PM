import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createIdentity, getIdentity } from "../../../../actions/identity";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormModal.css";

const IdentityFormAdd = ({
  createIdentity,
  getIdentity,
  setOpenModalAdd,
  identity: { identity },
  text: { txt }
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    PPS: "",
    passportNum: "",
    drivingLicense: "",
    phoneHome: "",
    phoneMobile: "",
    addressStreet: "",
    country: "",
    city: "",
    postalCode: "",
    category: "",
    favorite: false
  });

  const {
    name,
    email,
    PPS,
    passportNum,
    drivingLicense,
    phoneHome,
    phoneMobile,
    addressStreet,
    country,
    city,
    postalCode,
    category,
    favorite
  } = formData;

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
    createIdentity(formData, txt.txt);
    setTimeout(() => getIdentity(txt.txt), 60);
    setTimeout(() => setOpenModalAdd(false), 80);
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
            <div className="modal-body formScroll fs-6">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control myInput"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                    required
                  ></input>
                </div>
                <div className="col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Email:
                  </label>
                  <input
                    type="text"
                    className="form-control myInput"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">
                    PPS:
                  </label>
                  <input
                    type="text"
                    className="form-control myInput"
                    name="PPS"
                    value={PPS}
                    onChange={e => onChange(e)}
                  ></input>
                </div>
                <div className="col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Passport num:
                  </label>
                  <input
                    type="text"
                    className="form-control myInput"
                    name="passportNum"
                    value={passportNum}
                    onChange={e => onChange(e)}
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="recipient-name" className="col-form-label">
                  Driving License:
                </label>
                <input
                  type="text"
                  className="form-control myInput"
                  name="drivingLicense"
                  value={drivingLicense}
                  onChange={e => onChange(e)}
                ></input>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Phone-Home:
                  </label>
                  <input
                    type="text"
                    className="form-control myInput"
                    name="phoneHome"
                    value={phoneHome}
                    onChange={e => onChange(e)}
                  ></input>
                </div>
                <div className="col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Phone-Mobile:
                  </label>
                  <input
                    type="text"
                    className="form-control myInput"
                    name="phoneMobile"
                    value={phoneMobile}
                    onChange={e => onChange(e)}
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="recipient-name" className="col-form-label">
                  Address:
                </label>
                <input
                  type="text"
                  className="form-control myInput"
                  name="addressStreet"
                  value={addressStreet}
                  onChange={e => onChange(e)}
                ></input>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Country:
                  </label>
                  <input
                    type="text"
                    className="form-control myInput"
                    name="country"
                    value={country}
                    onChange={e => onChange(e)}
                  ></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="recipient-name" className="col-form-label">
                    City:
                  </label>
                  <input
                    type="text"
                    className="form-control myInput"
                    name="city"
                    value={city}
                    onChange={e => onChange(e)}
                  ></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Postal Code:
                  </label>
                  <input
                    type="text"
                    className="form-control myInput"
                    name="postalCode"
                    value={postalCode}
                    onChange={e => onChange(e)}
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Category:
                  </label>
                  <input
                    type="text"
                    className="form-control myInput"
                    name="category"
                    value={category}
                    onChange={e => onChange(e)}
                  ></input>
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
            <div className="d-flex justify-content-end mb-3">
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

IdentityFormAdd.propType = {
  createIdentity: PropTypes.func.isRequired,
  getIdentity: PropTypes.func.isRequired,
  identity: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  setOpenModalAdd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  identity: state.identity,
  text: state.text
});
export default connect(mapStateToProps, {
  createIdentity,
  getIdentity
})(IdentityFormAdd);
