import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import WebAccountFormEdit from "../forms/WebAccountFormEdit";
import { connect } from "react-redux";
import { getWebAccounts } from "../../../../actions/webAccounts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/js/src/dropdown";

const FavWebAccounts = ({
  getWebAccounts,
  webAccounts: { webAccounts },
  text: { txt }
}) => {
  const [loginId, setLoginId] = useState();
  const [openModalEdit, setOpenModalEdit] = useState(false);

  useEffect(() => {
    getWebAccounts(txt.txt);
  }, [getWebAccounts, txt.txt]);

  const setIdAndOpenModalEdit = id => {
    setLoginId(id);
    setOpenModalEdit(true);
  };
  const accounts = webAccounts.map(webAccount => {
    return webAccount.favorite === false ? null : (
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
            className="lrgIcon cursor textSecondary dropdown-toggle"
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
  return accounts.length === 3 ? null : (
    <>
      {openModalEdit && (
        <WebAccountFormEdit
          setOpenModalEdit={setOpenModalEdit}
          loginId={loginId}
        />
      )}

      <div>
        <ul className="mt-3 p-1">
          <>{accounts}</>
        </ul>
      </div>
    </>
  );
};

FavWebAccounts.propTypes = {
  getWebAccounts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  webAccounts: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  webAccounts: state.webAccounts,
  text: state.text
});

export default connect(mapStateToProps, { getWebAccounts })(FavWebAccounts);
