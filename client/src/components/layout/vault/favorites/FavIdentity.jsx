import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IdentityFormEdit from "../forms/IdentityFormEdit";
import { connect } from "react-redux";
import { getIdentity } from "../../../../actions/identity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "bootstrap/dist/css/bootstrap.min.css";

const FavIdentity = ({ getIdentity, identity: { identity } }) => {
  const [passId, setPassId] = useState();
  const [openModalEdit, setOpenModalEdit] = useState(false);

  useEffect(() => {
    getIdentity();
  }, [getIdentity]);

  const setIdAndOpenModalEdit = id => {
    setPassId(id);
    setOpenModalEdit(true);
  };

  const accounts =
    Array.isArray(identity) &&
    identity.map(i => {
      return (
        <div
          key={i._id}
          className="d-flex justify-content-between border-bottom mb-3"
        >
          <div>
            <p className="margin0 fs-6">
              Name:
              <span
                onClick={() => setIdAndOpenModalEdit(i._id)}
                className="textSecondary"
              >
                {" "}
                {i.name}
              </span>
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
              <li
                onClick={() => setIdAndOpenModalEdit(i._id)}
                className="mb-2 dropdown-item fs-6 margin0"
              >
                Edit
              </li>
            </ul>
          </div>
        </div>
      );
    });
  console.log(accounts);
  return accounts.length === 0 ? null : (
    <>
      {openModalEdit && (
        <IdentityFormEdit setOpenModalEdit={setOpenModalEdit} passId={passId} />
      )}
      <div className="p-2 hstack gap-5 border-bottom mb-4">
        <div className="me-auto vw-90">
          <small>Identity</small>
        </div>
      </div>
      <div>
        <ul className="mt-3 p-1">
          <>{accounts}</>
        </ul>
      </div>
    </>
  );
};

FavIdentity.propTypes = {
  getIdentity: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  identity: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  identity: state.identity,
  text: state.text
});

export default connect(mapStateToProps, { getIdentity })(FavIdentity);
