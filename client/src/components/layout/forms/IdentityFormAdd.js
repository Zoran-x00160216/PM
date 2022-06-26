import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "../subComponets/Sidebar";
import { connect } from "react-redux";
import { createIdentity } from "../../../actions/identity";
import "bootstrap/dist/css/bootstrap.min.css";

const IdentityFormAdd = ({
  createIdentity,
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
    folder: "",
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
    folder,
    favorite
  } = formData;

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
    createIdentity(formData, txt.txt);
  };

  if (identity.status === 200) {
    navigate("/identity");
  }

  return (
    <Fragment>
      <main>
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
                      navigate("/identity");
                    }}
                  ></button>
                </div>
                <form onSubmit={e => onSubmit(e)}>
                  <div className="modal-body fs-6">
                    <div className="row">
                      <div className="col-md-6">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
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
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
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
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
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
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
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
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
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
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
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
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
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
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
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
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
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
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
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
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
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
                  </div>
                  <div className="d-flex justify-content-end mb-3">
                    <button
                      type="button"
                      className="btn m-1 btn-outline-success shadow myBtn secondary"
                      onClick={e => {
                        navigate("/identity");
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
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

IdentityFormAdd.propType = {
  createIdentity: PropTypes.func.isRequired,
  // alert: PropTypes.object.isRequired,
  identity: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // alert: state.alert,
  identity: state.identity,
  text: state.text
});
export default connect(mapStateToProps, {
  createIdentity
})(IdentityFormAdd);
