import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getWebAccounts } from "../../../actions/webAccounts";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/dropdown";
// import { Dropdown } from "bootstrap";
// import "bootstrap/js/dist/dropdown";

const WebAccounts = ({
  getWebAccounts,
  webAccounts: { loading, webAccounts },
  text: { txt }
}) => {
  useEffect(() => {
    getWebAccounts(txt.txt);
  }, [getWebAccounts, txt.txt]);

  const accounts =
    Array.isArray(webAccounts) &&
    webAccounts.map(webAccount => {
      const linkWithParam = `/webAccount/edit/${webAccount._id}`;

      return (
        <div
          key={webAccount._id}
          className="d-flex justify-content-between border-bottom mb-3"
        >
          <div>
            <p className="margin0 fs-6">
              Name:
              <Link to={linkWithParam}>
                <span className="textSecondary"> {webAccount.name}</span>
              </Link>
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
              className="dropdown-menu noBorder shadow-sm myRounded"
              aria-labelledby="dropdownMenuButton1"
            >
              {webAccount.username === "" ? null : (
                <li>
                  <CopyToClipboard text={webAccount.username}>
                    <p className="dropdown-item fs-6 margin0">Copy Username</p>
                  </CopyToClipboard>
                </li>
              )}
              <li>
                <CopyToClipboard text={webAccount.password}>
                  <p className="dropdown-item fs-6 margin0">Copy Password</p>
                </CopyToClipboard>
              </li>
              {webAccount.uri === "" ? null : (
                <li>
                  <CopyToClipboard text={webAccount.uri}>
                    <p className="dropdown-item fs-6 margin0">Copy URL</p>
                  </CopyToClipboard>
                </li>
              )}
              <li>
                <Link
                  to={linkWithParam}
                  key={webAccount._id}
                  className="mb-2 dropdown-item fs-6 margin0"
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
      <div className="col-sm-6 mt-3">
        <div className="m-2 p-3 shadow-sm mb-5 bgCards myRounded">
          <div className="col">
            <div className="p-2 hstack gap-5 border-bottom mb-4">
              <div className="me-auto vw-90">
                <h5>Web Accounts</h5>
              </div>
              <Link to="/webAccount/add" className="cursor">
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
    </Fragment>
  );
};

WebAccounts.propTypes = {
  getWebAccounts: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
  webAccounts: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // auth: state.auth,
  webAccounts: state.webAccounts,
  text: state.text
});

export default connect(mapStateToProps, { getWebAccounts })(WebAccounts);
