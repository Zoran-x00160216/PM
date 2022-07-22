import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "../subComponets/Sidebar";
import { connect } from "react-redux";
import { createCard } from "../../../actions/cards";
import "bootstrap/dist/css/bootstrap.min.css";

const CardsFormAdd = ({ createCard, cards: { cards }, text: { txt } }) => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    expiryMonth: "",
    expiryYear: "",
    folder: "",
    favorite: false
  });

  const { name, number, expiryMonth, expiryYear, folder, favorite } = formData;

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
    createCard(formData, txt.txt);
  };

  if (cards.status === 200) {
    navigate("/cards");
  }

  return (
    <Fragment>
      <main>
        <div className="container myVh">
          <div className="row">
            <Sidebar className="hideElement" />
            <div className="col-sm-6 mt-3">
              <div className="m-2 p-2 myShadow mb-5 bgCards myRounded">
                <div className="modal-header">
                  <h5 className="modal-title textPrimary">Add</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={e => {
                      navigate("/cards");
                    }}
                  ></button>
                </div>
                <form onSubmit={e => onSubmit(e)}>
                  <div className="modal-body fs-6">
                    <div className="mb-1">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
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
                    <div className="mb-1">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Number:
                      </label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control myInput"
                          name="number"
                          value={number}
                          onChange={e => onChange(e)}
                          minLength="14"
                          maxLength="14"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-md-6">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Expiry Month:
                        </label>
                        <select
                          type="number"
                          className="form-control myInput"
                          id="inputGroupSelect01"
                          name="expiryMonth"
                          value={expiryMonth}
                          onChange={e => onChange(e)}
                          required
                        >
                          <option selected></option>
                          <option value="1">01/January</option>
                          <option value="2">02/February</option>
                          <option value="3">03/March</option>
                          <option value="4">04/April</option>
                          <option value="5">05/May</option>
                          <option value="6">06/June</option>
                          <option value="7">07/July</option>
                          <option value="8">08/August</option>
                          <option value="9">09/September</option>
                          <option value="10">10/October</option>
                          <option value="11">11/November</option>
                          <option value="12">12/December</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Expiry Year:
                        </label>
                        <select
                          type="number"
                          className="form-control myInput"
                          id="inputGroupSelect02"
                          name="expiryYear"
                          value={expiryYear}
                          onChange={e => onChange(e)}
                          required
                        >
                          <option selected></option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="mb-1 col-md-6">
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
                      <div className="mb-1 col-md-6">
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
                    <div className="d-flex justify-content-end mb-3">
                      <button
                        type="button"
                        className="btn m-1 btn-outline-success shadow myBtn bgGrey"
                        onClick={e => {
                          navigate("/vault");
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

CardsFormAdd.propType = {
  createCard: PropTypes.func.isRequired,
  // alert: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert,
  text: state.text,
  cards: state.cards
});
export default connect(mapStateToProps, {
  createCard
})(CardsFormAdd);
