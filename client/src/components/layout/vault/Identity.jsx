import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IdentityFormAdd from "./forms/IdentityFormAdd";
import IdentityFormEdit from "./forms/IdentityFormEdit";
import Sidebar from "./sidebar/Sidebar";
import Spinner from "../../spinner/Spinner";
import { connect } from "react-redux";
import { getIdentity } from "../../../actions/identity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPlus,
  faMagnifyingGlass,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/dropdown";

const Identity = ({ getIdentity, identity: { loading, identity } }) => {
  const [passId, setPassId] = useState();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    getIdentity();
  }, [getIdentity]);

  const setIdAndOpenModalEdit = id => {
    setPassId(id);
    setOpenModalEdit(true);
  };
  const handleInput = e => {
    e.preventDefault();
    setSearchVal(e.target.value);
  };

  const handleClearBtn = () => {
    setSearchVal("");
  };

  const filteredIdentity = identity.filter(i => {
    return i.name.includes(searchVal);
  });

  const accounts =
    Array.isArray(identity) &&
    filteredIdentity.map(i => {
      return (
        <div
          key={i._id}
          className="d-flex justify-content-between border-bottom mb-3"
        >
          <div>
            <p
              className="margin0 cursor"
              onClick={() => setIdAndOpenModalEdit(i._id)}
            >
              Name:
              <span className="textSecondary"> {i.name}</span>
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

  return loading && identity.length === 0 ? (
    <Spinner />
  ) : (
    <>
      {openModalAdd && <IdentityFormAdd setOpenModalAdd={setOpenModalAdd} />}
      {openModalEdit && (
        <IdentityFormEdit setOpenModalEdit={setOpenModalEdit} passId={passId} />
      )}
      <div className="myContainer">
        <div className="row">
          <Sidebar />
          <div className="col-md-8 mt-3">
            <div className="p-3 shadow-sm mb-5 bgCards myRounded">
              <div className="me-auto vw-90">
                <p>Identity</p>
              </div>
              <div className="col">
                <div className="p-2 hstack gap-5 border-bottom mb-4">
                  <div
                    onClick={() => setOpenModalAdd(true)}
                    className="cursor me-auto vw-60"
                  >
                    <small className="mr-2">Add</small>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="smIcon textPrimary"
                    />
                  </div>
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
                      placeholder="Search Identities"
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
    </>
  );
};

Identity.propTypes = {
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

export default connect(mapStateToProps, { getIdentity })(Identity);
