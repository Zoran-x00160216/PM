import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CardsFormEdit from "../forms/CardsFormEdit";
import { connect } from "react-redux";
import { getCards } from "../../../../actions/cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/dropdown";

const FavCards = ({ getCards, cards: { cards }, text: { txt } }) => {
  const [passId, setPassId] = useState();
  const [openModalEdit, setOpenModalEdit] = useState(false);

  useEffect(() => {
    getCards(txt.txt);
  }, [getCards, txt.txt]);

  const setIdAndOpenModalEdit = id => {
    setPassId(id);
    setOpenModalEdit(true);
  };

  // const accountsArray = webAccounts.webAccounts;
  const accounts =
    Array.isArray(cards) &&
    cards.map(card => {
      return (
        <div
          key={card._id}
          className="d-flex justify-content-between border-bottom mb-3"
        >
          <div>
            <p className="margin0 fs-6">
              Name:
              <span
                onClick={() => setIdAndOpenModalEdit(card._id)}
                className="textSecondary"
              >
                {card.name}
              </span>
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
  return accounts === null ? null : (
    <>
      {openModalEdit && (
        <CardsFormEdit setOpenModalEdit={setOpenModalEdit} passId={passId} />
      )}
      <div className="p-2 hstack gap-5 border-bottom mb-4">
        <div className="me-auto vw-90">
          <small>Cards</small>
        </div>
      </div>
      <div>
        <ul className="mt-3 p-1">
          <>{accounts}</>
        </ul>
      </div>
    </>
  );
};

FavCards.propTypes = {
  getCards: PropTypes.func.isRequired,
  cards: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cards: state.cards,
  text: state.text
});

export default connect(mapStateToProps, { getCards })(FavCards);
