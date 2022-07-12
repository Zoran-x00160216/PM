import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChartPie } from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
  // const { handleLink } = props;

  return (
    <div className="col-sm-3 mt-2 fs-6">
      <div className="col">
        <div className="m-3 mt-5 shadow-sm bgCards myRounded">
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
      </div>
    </div>
  );
};

// AdminSidebar.protoTypes = {
//   handleLink: PropTypes.string
// };

export default AdminSidebar;
