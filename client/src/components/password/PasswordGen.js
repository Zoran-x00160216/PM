import React from "react";
// import PropTypes from "prop-types";
import Display from "./display/Display";
import "../../components/layout/admin/Modal.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/js/src/modal";

const PasswordGen = ({ setModal, setPassInput }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modal-header">
          <h4 className="modal-title" id="exampleModalLabel">
            Generate Password
          </h4>
        </div>
        <div className="modal-body">
          <Display setPassInput={setPassInput} setModal={setModal} />
        </div>
        {/* <div className="modal-footer">
          <button
            type="button"
            className="btn m-1 btn-outline-success shadow myBtn secondary"
            data-bs-dismiss="modal"
            onClick={() => {
              setModal(false);
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn m-1 btn-outline-success shadow myBtn primary"
          >
            Save
          </button>
        </div> */}
      </div>
    </div>
  );
};

// PasswordGen.protoType = {
//   setModal: PropTypes.func.isRequired,
//   setPassInput: PropTypes.func.isRequired
// };

export default PasswordGen;
