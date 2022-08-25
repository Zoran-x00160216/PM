import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AdminSidebar from "./AdminSidebar";
import ModalConfirm from "../../modal/ModalConfirm";
import { connect } from "react-redux";
import { getUsers, deleteUser, sendEmailWarning } from "../../../actions/admin";
import { formatDate, getDateDiff } from "../../../utility/formatDate";
import Spinner from "../../spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const Users = ({
  getUsers,
  users: { users },
  auth: { isAuthenticated, tier },
  deleteUser,
  sendEmailWarning
}) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEmail, setOpenModalEmail] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  // const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated && tier === "admin") {
      getUsers();
    }
  }, [getUsers, isAuthenticated, tier]);

  const editUser = id => {
    deleteUser(id);
    setTimeout(() => getUsers(), 200);
    setOpenModalDelete(false);
  };

  const senEmail = email => {
    console.log(email);
    sendEmailWarning(email);
    setOpenModalEmail(false);
  };

  const handleInput = e => {
    e.preventDefault();
    setSearchVal(e.target.value);
  };

  const handleClearBtn = () => {
    setSearchVal("");
  };

  const filteredAccounts = users.filter(user => {
    return user.email.includes(searchVal);
  });

  const accounts =
    Array.isArray(users) &&
    filteredAccounts.map(user => {
      const created = formatDate(user.date);
      const lastLogDate = formatDate(user.lastLogin);
      const today = new Date();
      const lastLog = new Date(user.lastLogin);
      const daysSinceLastLogin = getDateDiff(lastLog, today);

      return (
        <div key={user._id} className="mb-3 border-bottom">
          <div>
            <p className="margin0 fs-6">
              User:
              <span> {user.email}</span>
            </p>
            <p className="margin0 fs-6">
              Tier:
              <span> {user.tier}</span>
            </p>
            <div className="margin0 fs-6">
              <span className="small">
                {" "}
                Created: {created}
                <br></br>Last Login: {lastLogDate}
              </span>
              {daysSinceLastLogin > 10 ? (
                <p className="text-danger">
                  {daysSinceLastLogin} days since last login
                </p>
              ) : (
                <p className="text-success">
                  {daysSinceLastLogin} days since last login
                </p>
              )}
            </div>
          </div>
          <div>
            <ul className="p-2 d-flex justify-content-between">
              <li className="d-flex justify-content-between mr-1">
                <button
                  type="button"
                  className="btn m-1 btn-outline-success shadow myBtn myDanger searchWidth"
                  onClick={() => {
                    setOpenModalDelete(true);
                  }}
                >
                  Delete User
                </button>
                {openModalDelete && (
                  <ModalConfirm
                    setModal={setOpenModalDelete}
                    setBtnText={"yes"}
                    setColor={"myDanger"}
                    setText={"Are you sure you want to delete user"}
                    edit={() => {
                      editUser(user._id);
                    }}
                  />
                )}
              </li>
              <li>
                <button
                  type="button"
                  className="btn m-1 btn-outline-success shadow myBtn bgGrey searchWidth"
                  onClick={() => {
                    setOpenModalEmail(true);
                  }}
                >
                  Send a warning email
                </button>
                {openModalEmail && (
                  <ModalConfirm
                    setModal={setOpenModalEmail}
                    setBtnText={"yes"}
                    setColor={"mySuccess"}
                    setText={
                      "Send a warning email, if the user hasn't been login for more than 1 year "
                    }
                    edit={() => {
                      senEmail(user.email);
                    }}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      );
    });
  return !users.length ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="myContainer fs-6 mt-5">
        <div className="row">
          <AdminSidebar handleLink={"users"} />
          <div className="col-md-8">
            <div className="m-2 p-3 shadow-sm mb-5 bgCards myRounded">
              <div className="col">
                <div className="p-2 hstack gap-5 border-bottom mb-4">
                  <div className="me-auto d-flex justify-content-between w-100">
                    <h5>Users</h5>
                    <div className="input-wrap shadow-sm">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="smIcon textPrimary"
                      ></FontAwesomeIcon>
                      <input
                        onChange={handleInput}
                        value={searchVal}
                        type="text"
                        name="data-search"
                        id="data-search"
                        placeholder="Search Accounts"
                      />

                      <FontAwesomeIcon
                        icon={faXmark}
                        className="smIcon textPrimary cursor"
                        onClick={handleClearBtn}
                      ></FontAwesomeIcon>
                    </div>
                  </div>
                </div>
                <div>
                  <ul className="mt-3 p-1">
                    <>{accounts}</>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  sendEmailWarning: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getUsers,
  deleteUser,
  sendEmailWarning
})(Users);
