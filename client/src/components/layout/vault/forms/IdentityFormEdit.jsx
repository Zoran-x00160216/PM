import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteIdentity,
  editIdentity,
  getIdentity
} from "../../../../actions/identity";
import { formatDate } from "../../../../utility/formatDate";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/modal";

const IdentityFormEdit = ({
  editIdentity,
  deleteIdentity,
  getIdentity,
  identity: { loading, identity },
  text: { txt },
  setOpenModalEdit,
  passId
}) => {
  const [edit, setEdit] = useState(false);

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
    favorite: false,
    updated: "",
    date: ""
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
    favorite,
    updated,
    date
  } = formData;

  let account = [];
  Array.isArray(identity) &&
    identity.map(item => {
      if (passId === item._id) {
        Object.keys(item).forEach(function() {
          account.push(item);
        });
      }
      return item;
    });
  useEffect(() => {
    // console.log(account);
    setFormData({
      _id: loading || !account[0]._id ? "" : account[0]._id,
      user_id: loading || !account[0].user_id ? "" : account[0].user_id,
      name: loading || !account[0].name ? "" : account[0].name,
      email: loading || !account[0].email ? "" : account[0].email,
      PPS: loading || !account[0].PPS ? "" : account[0].PPS,
      passportNum:
        loading || !account[0].passportNum ? "" : account[0].passportNum,
      drivingLicense:
        loading || !account[0].drivingLicense ? "" : account[0].drivingLicense,
      phoneHome: loading || !account[0].phoneHome ? "" : account[0].phoneHome,
      phoneMobile:
        loading || !account[0].phoneMobile ? "" : account[0].phoneMobile,
      addressStreet:
        loading || !account[0].addressStreet ? "" : account[0].addressStreet,
      country: loading || !account[0].country ? "" : account[0].country,
      city: loading || !account[0].city ? "" : account[0].city,
      postalCode:
        loading || !account[0].postalCode ? "" : account[0].postalCode,
      category: loading || !account[0].category ? "" : account[0].category,
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
    edit ? deleteIdentity(formData) : editIdentity(formData, txt.txt);
    setTimeout(() => getIdentity(txt.txt), 100);
    setTimeout(() => setOpenModalEdit(false), 120);
  };

  return (
    <>
      <main className="modalBackgroundForm">
        <div className="modalContainerForm bgCards">
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
              <div>
                <label htmlFor="recipient-name" className="col-form-label">
                  PPS:
                </label>
                <div className="d-flex">
                  <div className="mr-1 flex-grow-1">
                    <input
                      type="text"
                      className="form-control myInput vw-90"
                      name="PPS"
                      value={PPS}
                      onChange={e => onChange(e)}
                    ></input>
                  </div>
                  <CopyToClipboard text={PPS}>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="lrgIcon cursor textPrimary"
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <div>
                <label htmlFor="recipient-name" className="col-form-label">
                  Passport Num:
                </label>
                <div className="d-flex">
                  <div className="mr-1 flex-grow-1">
                    <input
                      type="text"
                      className="form-control myInput vw-90"
                      name="passportNum"
                      value={passportNum}
                      onChange={e => onChange(e)}
                    ></input>
                  </div>
                  <CopyToClipboard text={passportNum}>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="lrgIcon cursor textPrimary"
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <div>
                <label htmlFor="recipient-name" className="col-form-label">
                  Driving License:
                </label>
                <div className="d-flex">
                  <div className="mr-1 flex-grow-1">
                    <input
                      type="text"
                      className="form-control myInput vw-90"
                      name="drivingLicense"
                      value={drivingLicense}
                      onChange={e => onChange(e)}
                    ></input>
                  </div>
                  <CopyToClipboard text={drivingLicense}>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="lrgIcon cursor textPrimary"
                    />
                  </CopyToClipboard>
                </div>
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
            <div className="d-flex justify-content-between mb-3 mt-3">
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

IdentityFormEdit.propTypes = {
  editIdentity: PropTypes.func.isRequired,
  deleteIdentity: PropTypes.func.isRequired,
  getIdentity: PropTypes.func.isRequired,
  passId: PropTypes.string.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  identity: PropTypes.object.isRequired,
  edit: PropTypes.bool,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  identity: state.identity,
  text: state.text
});
export default connect(mapStateToProps, {
  editIdentity,
  deleteIdentity,
  getIdentity
})(IdentityFormEdit);