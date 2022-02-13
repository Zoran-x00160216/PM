import React from "react";

WebAccountModal1 = () => {
  return (
    <div>
      <div
        className="modal fade"
        id="showAccountsModal"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content myRounded">
            <div className="modal-header">
              <h5
                className="modal-title textPrimary"
                id="exampleModalToggleLabel"
              >
                Your Account
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 border-bottom">
                <label for="recipient-name" className="col-form-label">
                  Name:
                </label>
                <p>Amazon</p>
              </div>
              <div className="mb-3 border-bottom">
                <label for="recipient-name" className="col-form-label">
                  Username:
                </label>
                <p>zrailic@gmail.com</p>
              </div>
              <div className="mb-3 border-bottom">
                <label for="recipient-name" className="col-form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control myInput bg-white"
                  id="recipient-name"
                  value="234343kjhkhhkh"
                  disabled
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline-success shadow myBtn primary"
                data-bs-target="#showAccountsModal2"
                data-bs-toggle="modal"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebAccountModal1;
