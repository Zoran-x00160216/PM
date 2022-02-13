import React from "react";

const WebAccountModal2 = () => {
  return (
    <div
      className="modal fade"
      id="showAccountsModal2"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content myRounded">
          <div className="modal-header">
            <h5
              className="modal-title textPrimary"
              id="exampleModalToggleLabel2"
            >
              Edit
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form>
            <div className="modal-body">
              <div className="mb-3 border-bottom">
                <label for="recipient-name" className="col-form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control myInput"
                  id="recipient-name"
                ></input>
              </div>
              <div className="mb-3 border-bottom">
                <label for="recipient-name" className="col-form-label">
                  Username:
                </label>
                <input
                  type="text"
                  className="form-control myInput"
                  id="recipient-name"
                ></input>
              </div>
              <div className="mb-3 border-bottom">
                <label for="recipient-name" className="col-form-label">
                  Password:<i className="bi bi-arrow-counterclockwise"></i>
                </label>
                <input
                  type="password"
                  className="form-control myInput"
                  id="recipient-name"
                ></input>
              </div>
              <div className="mb-3 border-bottom">
                <label for="recipient-name" className="col-form-label">
                  URI:
                </label>
                <input
                  type="text"
                  className="form-control myInput"
                  id="recipient-name"
                ></input>
              </div>
              <div className="mb-3 border-bottom">
                <label for="recipient-name" className="col-form-label">
                  Folder:
                </label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                  ></input>
                </div>
              </div>
              <div className="mb-3 border-bottom">
                <label for="recipient-name" className="col-form-label">
                  Favorites:
                </label>
                <input
                  type="text"
                  className="form-control myInput"
                  id="recipient-name"
                ></input>
              </div>
              <div className="mb-3">
                <label for="message-text" className="col-form-label">
                  Note:
                </label>
                <textarea className="form-control" id="message-text"></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-success shadow myBtn secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-outline-success  shadow myBtn primary"
              >
                Save
              </button>
              <button
                type="submit"
                className="btn btn-outline-success  shadow myDanger myBtn"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WebAccountModal2;
