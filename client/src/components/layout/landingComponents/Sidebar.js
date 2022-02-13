import React from "react";

const Sidebar = () => {
  return (
    <div className="col-sm-4 mt-2">
      <div className="col">
        <div className="m-3 shadow-sm bg-body myRounded">
          <ul className="pt-4 pb-4">
            <li>
              <a href="./">
                <i className="bi bi-collection textPrimary lrgIcon p-2"></i>
                Web Accounts
              </a>
            </li>
            <li>
              <a href="./">
                <i className="bi bi-person-fill textPrimary lrgIcon p-2"></i>
                Personal Details
              </a>
            </li>
            <li>
              <a href="./">
                <i className="bi bi-credit-card-2-front-fill textPrimary lrgIcon p-2"></i>
                Cards
              </a>
            </li>
            <li>
              <a href="./">
                <i className="bi bi-sticky-fill textPrimary lrgIcon p-2"></i>
                Notes
              </a>
            </li>
          </ul>
        </div>
        <div className="m-3 mt-5 shadow-sm bg-body myRounded">
          <ul className="pt-4 pb-4">
            <li>
              <a href="./">
                <i className="bi bi-star-fill textYellow lrgIcon p-2"></i>
                Favorites
              </a>
            </li>
            <li>
              <a href="./">
                <i className="bi bi-plus-circle textSecondary lrgIcon p-2"></i>
                Folders
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
