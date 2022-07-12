import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AdminSidebar from "./AdminSidebar";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../../../actions/admin";
import { formatDate, getDateDiff } from "../../../utility/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../modal//Modal.css";
import ModalConfirm from "../../modal/ModalConfirm";

const Users = ({
  getUsers,
  users: { users, editUsers },
  auth: { isAuthenticated, tier },
  deleteUser
}) => {
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated && tier === "admin") {
      getUsers();
    }
  }, [getUsers, isAuthenticated, tier]);

  const editUser = id => {
    deleteUser(id);
    getUsers();
    setOpenModal(false);
    // if submit was successful navigate back to vault
    if (editUsers.deletedCount === 1) {
      navigate("/admin/users");
    }
  };

  const accounts =
    Array.isArray(users) &&
    users.map(user => {
      const created = formatDate(user.date);
      const lastLogDate = formatDate(user.lastLogin);
      const today = new Date();
      const lastLog = new Date(user.lastLogin);
      const daysSinceLastLogin = getDateDiff(lastLog, today);

      return (
        <div
          key={user._id}
          className="d-flex justify-content-between border-bottom mb-3"
        >
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
            <FontAwesomeIcon
              icon={faTrash}
              className="lrgIcon cursor textRed"
              onClick={() => {
                setOpenModal(true);
              }}
            />
            {openModal && (
              <ModalConfirm
                setModal={setOpenModal}
                setText={"Are you sure you want to delete user"}
                editUser={() => {
                  editUser(user._id);
                }}
              />
            )}
          </div>
        </div>
      );
    });
  return (
    <Fragment>
      <div className="container myVh">
        <div className="row">
          <AdminSidebar handleLink={"users"} />
          <div className="col-sm-6 mt-3">
            <div className="m-2 p-3 shadow-sm mb-5  bgCards myRounded">
              <div className="col">
                <div className="p-2 hstack gap-5 border-bottom mb-4">
                  <div className="me-auto vw-90">
                    <h5>Users</h5>
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
  users: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth
});

export default connect(mapStateToProps, { getUsers, deleteUser })(Users);
