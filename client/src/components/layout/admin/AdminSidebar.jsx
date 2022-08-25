import React from "react";
import AddAdmin from "./AddAdmin";
import SetPremiumPrice from "./SetPremiumPrice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChartPie } from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
  return (
    <div className="col-md-4">
      <div className="col">
        <div className="m-3 shadow-sm bgCards myRounded">
          <ul className="pt-4 pb-4">
            <li className="pb-3">
              <Link to="/admin/users">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="lrgIcon textPrimary mr-1 fa-beat"
                />
                Users
              </Link>
            </li>
            <li>
              <Link to="/adminDashboard">
                <FontAwesomeIcon
                  icon={faChartPie}
                  className="lrgIcon textPrimary mr-1 fa-beat"
                />
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <AddAdmin />
        <SetPremiumPrice />
      </div>
    </div>
  );
};

export default AdminSidebar;
