import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const ModalConfirm = ({ setModal, setText, edit, setColor, setBtnText }) => {
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
            className="btn m-3 btn-outline-success shadow myBtn bgGrey"
            onClick={() => {
              setModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            className={`btn m-1 btn-outline-success shadow myBtn ${setColor}`}
            onClick={() => {
              edit();
            }}
          >
            {setBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};
ModalConfirm.propTypes = {
  setModal: PropTypes.func.isRequired,
  setText: PropTypes.string.isRequired,
  setBtnText: PropTypes.string.isRequired,
  setColor: PropTypes.string.isRequired
};

export default ModalConfirm;
