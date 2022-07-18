import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const ModalConfirm = ({ setModal, setText, edit }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer bgCards">
        {/* <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModal(false);
            }}
          >
            X
          </button>
        </div> */}
        <div>
          <p>{setText}</p>
        </div>
        <div className="footer">
          <button
            className="btn m-3 btn-outline-success shadow myBtn secondary"
            onClick={() => {
              setModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            className="btn m-1 btn-outline-success shadow myBtn myDanger secondary"
            onClick={() => {
              edit();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
ModalConfirm.propTypes = {
  setModal: PropTypes.func.isRequired,
  setText: PropTypes.string.isRequired
};

export default ModalConfirm;
