import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { getIdentity } from "../../../actions/identity";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/dropdown";

const Identity = ({ getIdentity, identity: { loading, identity } }) => {
  useEffect(() => {
    getIdentity();
  }, [getIdentity]);

  const accounts =
    Array.isArray(identity) &&
    identity.map((i) => {
      const linkWithParam = `/identity/edit/${i._id}`;

      return (
        <div
          key={i._id}
          className="d-flex justify-content-between border-bottom mb-3"
        >
          <div>
            <p className="margin0 fs-6">
              Name:
              <Link to={linkWithParam}>
                <span className="textSecondary"> {i.name}</span>
              </Link>
            </p>
            <p className="margin0 fs-6">Email: {i.email}</p>
          </div>
          <div className="dropdown">
            <FontAwesomeIcon
              icon={faEllipsis}
              className="lrgIcon cursor textSecondary"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></FontAwesomeIcon>

            <ul
              className="dropdown-menu noBorder shadow-sm myRounded"
              aria-labelledby="dropdownMenuButton1"
            >
              {i.email === "" ? null : (
                <li>
                  <CopyToClipboard text={i.email}>
                    <span className="dropdown-item">Copy Email</span>
                  </CopyToClipboard>
                </li>
              )}
              {i.PPS === "" ? null : (
                <li>
                  <CopyToClipboard text={i.PPS}>
                    <span className="dropdown-item">Copy PPS Num</span>
                  </CopyToClipboard>
                </li>
              )}
              {i.passportNum === "" ? null : (
                <li>
                  <CopyToClipboard text={i.passportNum}>
                    <span className="dropdown-item">Copy Passport Num</span>
                  </CopyToClipboard>
                </li>
              )}
              {i.drivingLicense === "" ? null : (
                <li>
                  <CopyToClipboard text={i.drivingLicense}>
                    <s className="dropdown-item">Copy Driving License Num</s>
                  </CopyToClipboard>
                </li>
              )}
              {i.addressStreet === "" ? null : (
                <li>
                  <CopyToClipboard
                    text={`${i.addressStreet}, ${i.country}, ${i.city}, ${i.postalCode}`}
                  >
                    <s className="dropdown-item">Copy Address</s>
                  </CopyToClipboard>
                </li>
              )}
              {i.phoneMobile === "" ? null : (
                <li>
                  <CopyToClipboard text={i.phoneMobile}>
                    <s className="dropdown-item">Copy Mobile Phone Num</s>
                  </CopyToClipboard>
                </li>
              )}
              {i.phoneHome === "" ? null : (
                <li>
                  <CopyToClipboard text={i.phoneHome}>
                    <s className="dropdown-item">Copy Home Phone Num</s>
                  </CopyToClipboard>
                </li>
              )}
              <li>
                <Link
                  to={linkWithParam}
                  key={i._id}
                  className="mb-2 dropdown-item"
                >
                  Edit
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    });

  return (
    <Fragment>
      <div className="container myVh">
        <div className="row">
          <Sidebar />
          <div className="col-sm-6 mt-3">
            <div className="m-2 p-3 shadow-sm mb-5 bg-body myRounded">
              <div className="col">
                <div className="p-2 hstack gap-5 border-bottom mb-4">
                  <div className="me-auto vw-90">
                    <h5>Identity</h5>
                  </div>
                  <Link to="/identity/add" className="cursor">
                    Add
                    <i className="bi bi-plus-circle textSecondary lrgIcon p-2"></i>
                  </Link>
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

Identity.propTypes = {
  getIdentity: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  identity: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  identity: state.identity,
});

export default connect(mapStateToProps, { getIdentity })(Identity);
