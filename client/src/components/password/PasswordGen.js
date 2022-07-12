import React from "react";
import Display from "./display/Display";
import "../modal/Modal.css";

const PasswordGen = ({ setModal, setPassInput }) => {
  return (
    <div className="modalBackground bgCards">
      <div className="modalContainer">
        <div className="modal-header">
          <h4 className="modal-title" id="exampleModalLabel">
            Generate Password
          </h4>
        </div>
        <div className="modal-body">
          <Display setPassInput={setPassInput} setModal={setModal} />
        </div>
      </div>
    </div>
  );
};

export default PasswordGen;
