import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faStickyNote,
  faIdCard,
  faEarthEurope
} from "@fortawesome/free-solid-svg-icons";

const VaultLinks = () => {
  return (
    <div className="m-3 shadow-sm bgCards myRounded">
      <ul className="pt-4 pb-4">
        <li className="pb-1">
          <Link to="/webAccounts">
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
  );
};

export default VaultLinks;
