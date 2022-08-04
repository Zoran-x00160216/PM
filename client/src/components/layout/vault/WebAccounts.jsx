import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ModalConfirm from "../../modal/ModalConfirm";
import WebAccountFormAdd from "./forms/WebAccountFormAdd";
import WebAccountFormEdit from "./forms/WebAccountFormEdit";
import Sidebar from "./sidebar/Sidebar";
import Spinner from "../../spinner/Spinner";
import { connect } from "react-redux";
import { getWebAccounts } from "../../../actions/webAccounts";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/dropdown";

const WebAccounts = ({
  getWebAccounts,
  webAccounts: { loading, webAccounts },
  text: { txt },
  auth: { tier }
}) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [loginId, setLoginId] = useState();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  useEffect(() => {
    getWebAccounts(txt.txt);
  }, [getWebAccounts, txt.txt]);

  const checkPermission = () => {
    if (webAccounts.length >= 7 && tier === "basic") {
      setOpenModal(true);
    } else {
      setOpenModalAdd(true);
    }
  };
  // console.log(webAccounts.length, tier, id);

  const openPayment = () => {
    setOpenModal(false);
    navigate("/stripeContainer");
  };

  const setIdAndOpenModalEdit = id => {
    setLoginId(id);
    setOpenModalEdit(true);
  };
  console.log(loading);
  const accounts =
    Array.isArray(webAccounts) &&
    webAccounts.map(webAccount => {
      return (
        <div
          key={webAccount._id}
          className="d-flex justify-content-between border-bottom mb-3"
        >
          <div>
            <p className="margin0 fs-6">
              Name:
              <span
                onClick={() => setIdAndOpenModalEdit(webAccount._id)}
                className="textSecondary"
              >
                {webAccount.name}
              </span>
            </p>
            <p className="margin0 fs-6">Username: {webAccount.username}</p>
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
              className="dropdown-menu noBorder shadow-sm  myRounded"
              aria-labelledby="dropdownMenuButton1"
            >
              {webAccount.username === "" ? null : (
                <li>
                  <CopyToClipboard text={webAccount.username}>
                    <p className="dropdown-item margin0 myDropdownTxtColor">
                      Copy Username
                    </p>
                  </CopyToClipboard>
                </li>
              )}
              <li>
                <CopyToClipboard text={webAccount.password}>
                  <p className="dropdown-item margin0 myDropdownTxtColor">
                    Copy Password
                  </p>
                </CopyToClipboard>
              </li>
              {webAccount.uri === "" ? null : (
                <li>
                  <CopyToClipboard text={webAccount.uri}>
                    <p className="dropdown-item margin0 myDropdownTxtColor">
                      Copy URL
                    </p>
                  </CopyToClipboard>
                </li>
              )}
              <li
                onClick={() => setIdAndOpenModalEdit(webAccount._id)}
                className="mb-2 dropdown-item fs-6 margin0"
              >
                Edit
              </li>
            </ul>
          </div>
        </div>
      );
    });
  return loading && webAccounts === null ? (
    <Spinner />
  ) : (
    <>
      {openModalAdd && <WebAccountFormAdd setOpenModalAdd={setOpenModalAdd} />}
      {openModalEdit && (
        <WebAccountFormEdit
          setOpenModalEdit={setOpenModalEdit}
          loginId={loginId}
        />
      )}
      <div className="container myVh">
        <div className="row">
          <Sidebar />
          <div className="col-sm-6 mt-3">
            <div className="m-2 p-3 shadow-sm mb-5 bgCards myRounded">
              <div className="col">
                <div className="p-2 hstack gap-5 border-bottom mb-4">
                  <div className="me-auto vw-90">
                    <h5>Web Accounts</h5>
                  </div>
                  <div className="cursor" onClick={() => checkPermission()}>
                    <span className="mr-2">Add</span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="lrgIcon textPrimary"
                    />
                  </div>
                  {openModal && (
                    <ModalConfirm
                      setModal={setOpenModal}
                      setBtnText={"contiune"}
                      setColor={"primary"}
                      setText={
                        "You reached maximum number of login entries, to continue get premium account"
                      }
                      edit={openPayment}
                    />
                  )}
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
    </>
  );
};

WebAccounts.propTypes = {
  getWebAccounts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  webAccounts: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  webAccounts: state.webAccounts,
  text: state.text
});

export default connect(mapStateToProps, { getWebAccounts })(WebAccounts);
