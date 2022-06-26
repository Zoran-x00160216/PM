import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faStickyNote,
  faIdCard,
  faStar,
  faAngleDown,
  faEarthEurope,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="col-sm-4 mt-2 fs-6">
      <div className="col">
        <div className="m-3 shadow-sm bg-body myRounded">
          <ul className="pt-4 pb-4">
            <li className="pb-1">
              <Link to="/vault">
                <FontAwesomeIcon
                  icon={faEarthEurope}
                  className="lrgIcon textPrimary mr-1"
                />
                Web Accounts
              </Link>
            </li>
            <li className="pb-1">
              <Link to="/identity">
                <FontAwesomeIcon
                  icon={faIdCard}
                  className="lrgIcon textPrimary mr-1"
                />
                <span>Identity</span>
              </Link>
            </li>
            <li className="pb-1">
              <Link to="/cards">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className="lrgIcon textPrimary mr-1"
                />
                <span>Cards</span>
              </Link>
            </li>
            <li className="pb-1">
              <Link to="/notes">
                <FontAwesomeIcon
                  icon={faStickyNote}
                  className="lrgIcon textPrimary mr-1"
                />
                <span>Notes</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="m-3 mt-5 shadow-sm bg-body myRounded">
          <ul className="pt-4 pb-4">
            <li className="pb-1">
              <Link to="/fav">
                <FontAwesomeIcon
                  icon={faStar}
                  className="lrgIcon textYellow mr-1"
                />
                Favorites
              </Link>
            </li>
            <li>
              <a href="#!">
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className="lrgIcon textPrimary mr-1"
                />
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
