import React from "react";
import Display from "./display/Display";
import "../layout/vault/forms/FormModal.css"

const PasswordGen = ({ setModal, setPassInput }) => {
  return (
    <>
    <main className="modalBackgroundForm">
      <div className="modalContainerForm bgCards">
        <div className="modal-header">
          <h5 className="modal-title">
            Generate Password
          </h5>
        </div>
        <div className="modal-body">
          <Display setPassInput={setPassInput} setModal={setModal} />
        </div>
    </div>
    </main>
    </>
  );
};

export default PasswordGen;
