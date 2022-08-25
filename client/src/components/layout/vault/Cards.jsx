import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "./sidebar/Sidebar";
import CardsFormAdd from "./forms/CardsFormAdd";
import CardsFormEdit from "./forms/CardsFormEdit";
import Spinner from "../../spinner/Spinner";
import { connect } from "react-redux";
import { getCards } from "../../../actions/cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPlus,
  faMagnifyingGlass,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/dropdown";

const Cards = ({ getCards, cards: { loading, cards }, text: { txt } }) => {
  const [passId, setPassId] = useState();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    getCards(txt.txt);
  }, [getCards, txt.txt]);

  const handleInput = e => {
    e.preventDefault();
    setSearchVal(e.target.value);
  };

  const handleClearBtn = () => {
    setSearchVal("");
  };

  const filteredCards = cards.filter(card => {
    return card.name.includes(searchVal);
  });

  const setIdAndOpenModalEdit = id => {
    setPassId(id);
    setOpenModalEdit(true);
  };

  // const accountsArray = webAccounts.webAccounts;
  const accounts =
    Array.isArray(cards) &&
    filteredCards.map(card => {
      return (
        <div
          key={card._id}
          className="d-flex justify-content-between border-bottom mb-3"
        >
          <div>
            <p
              className="margin0 cursor"
              onClick={() => setIdAndOpenModalEdit(card._id)}
            >
              Name:
              <span className="textSecondary">{card.name}</span>
            </p>
          </div>
          <div className="dropdown">
            <FontAwesomeIcon
              icon={faEllipsis}
              className="lrgIcon cursor textSecondary"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></FontAwesomeIcon>

            <ul
              className="dropdown-menu noBorder shadow-sm myRounded"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <CopyToClipboard text={card.number}>
                  <span className="dropdown-item">Copy Number</span>
                </CopyToClipboard>
              </li>
              <li>
                <CopyToClipboard
                  text={`${card.expiryMonth}/${card.expiryYear}`}
                >
                  <span className="dropdown-item">Copy Expiry Date</span>
                </CopyToClipboard>
              </li>

              <li
                onClick={() => setIdAndOpenModalEdit(card._id)}
                className="mb-2 dropdown-item"
              >
                Edit
              </li>
            </ul>
          </div>
        </div>
      );
    });
  return loading && cards.length === 0 ? (
    <Spinner />
  ) : (
    <>
      {openModalAdd && <CardsFormAdd setOpenModalAdd={setOpenModalAdd} />}
      {openModalEdit && (
        <CardsFormEdit setOpenModalEdit={setOpenModalEdit} passId={passId} />
      )}
      <div className="myContainer">
        <div className="row">
          <Sidebar />
          <div className="col-md-8 mt-3">
            <div className="p-3 shadow-sm mb-5 bgCards myRounded">
              <div className="me-auto vw-90">
                <p>Credit Cards</p>
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
                      placeholder="Search Cards"
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

Cards.propTypes = {
  getCards: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cards: state.cards,
  text: state.text
});

export default connect(mapStateToProps, { getCards })(Cards);
