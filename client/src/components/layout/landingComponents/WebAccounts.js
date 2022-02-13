import React from "react";

export const WebAccounts = () => {
  return (
    <div className="col-sm-8 mt-3">
      <div className="m-2 p-3 shadow-sm mb-5 bgLightBlue myRounded">
        <div className="col">
          <div className="p-2">
            <h5>Your Web Accounts</h5>
          </div>
          <div>
            <ul className="mt-3 p-1">
              <li className="hstack gap-5 border-bottom mb-4">
                <div
                  className="me-auto vw-100 cursor"
                  data-bs-toggle="modal"
                  data-bs-target="#showAccountsModal"
                  data-bs-whatever="@getbootstrap"
                >
                  <p>Name: OnePlus</p>
                  <p className="small-text">zrailic@gmail.com</p>
                </div>
                <div>
                  <i className="fa fa-plus"></i>
                </div>
              </li>
              <li className="hstack border-bottom mb-4">
                <div
                  className="me-auto vw-100 cursor"
                  data-bs-toggle="modal"
                  data-bs-target="#showAccountsModal"
                  data-bs-whatever="@getbootstrap"
                >
                  <p>Name: Apple</p>
                  <p className="small-text">zrailic@gmail.com</p>
                </div>
                <div className="ms-auto">
                  <i className="fa fa-plus"></i>
                </div>
              </li>
              <li className="hstack border-bottom mb-4">
                <div
                  className="me-auto vw-100 cursor"
                  data-bs-toggle="modal"
                  data-bs-target="#showAccountsModal"
                  data-bs-whatever="@getbootstrap"
                >
                  <p>Name: Cisco</p>
                  <p className="small-text">zrailic@gmail.com</p>
                </div>
                <div className="ms-auto">
                  <i className="fa fa-plus"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebAccounts;
