import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCard, editCard, getCards } from "../../../../actions/cards";
import { formatDate } from "../../../../utility/formatDate";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrashCan, faEye } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const CardsFormEdit = ({
  editCard,
  deleteCard,
  getCards,
  cards: { loading, cards },
  text: { txt },
  setOpenModalEdit,
  passId
}) => {
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    _id: "",
    user_id: "",
    name: "",
    number: "",
    expiryMonth: "",
    expiryYear: "",
    category: "",
    favorite: false
  });

  const {
    name,
    number,
    expiryMonth,
    expiryYear,
    category,
    favorite,
    updated,
    date
  } = formData;

  // state for password toggle
  const [passwordShown, setPasswordShown] = useState(false);

  let account = [];
  Array.isArray(cards) &&
    cards.map(card => {
      if (passId === card._id) {
        Object.keys(card).forEach(function() {
          account.push(card);
        });
      }
      return card;
    });
  useEffect(() => {
    // console.log(account);
    setFormData({
      _id: loading || !account[0]._id ? "" : account[0]._id,
      user_id: loading || !account[0].user_id ? "" : account[0].user_id,
      name: loading || !account[0].name ? "" : account[0].name,
      number: loading || !account[0].number ? "" : account[0].number,
      expiryMonth:
        loading || !account[0].expiryMonth ? "" : account[0].expiryMonth,
      expiryYear:
        loading || !account[0].expiryYear ? "" : account[0].expiryYear,
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
    edit ? deleteCard(formData) : editCard(formData, txt.txt);
    setTimeout(() => getCards(txt.txt), 100);
    setTimeout(() => setOpenModalEdit(false), 120);
  };

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <main className="modalBackgroundForm">
        <div className="modalContainerForm bgCards">
          <div className="modal-header">
            <h5 className="modal-title textPrimary">Edit a Card</h5>
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
              <div className="mb-1">
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
              <div className="mb-1">
                <label htmlFor="recipient-name" className="col-form-label">
                  Number:
                </label>
                <div className="d-flex">
                  <div className="mr-1 flex-grow-1">
                    <input
                      type={passwordShown ? "text" : "password"}
                      className="form-control myInput"
                      id="recipient-username"
                      name="number"
                      value={number}
                      onChange={e => onChange(e)}
                      required
                    ></input>
                  </div>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={togglePassword}
                    className="lrgIcon cursor mr-1 textPrimary"
                  />
                  <CopyToClipboard text={number}>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="lrgIcon textPrimary"
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <div className="row mb-1">
                <div className="col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Expiry Month:
                  </label>
                  <select
                    type="text"
                    className="form-control myInput"
                    id="inputGroupSelect01"
                    name="expiryMonth"
                    value={expiryMonth}
                    onChange={e => onChange(e)}
                    required
                  >
                    <option defaultValue={""}></option>
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
                  <label htmlFor="recipient-name" className="col-form-label">
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
                    <option defaultValue={""}></option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="mb-1 col-md-6">
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
                <div className="mb-1 col-md-6">
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

CardsFormEdit.propTypes = {
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  getCards: PropTypes.func.isRequired,
  cards: PropTypes.object.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  passId: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cards: state.cards,
  text: state.text
});

export default connect(mapStateToProps, { editCard, deleteCard, getCards })(
  CardsFormEdit
);