import React, { useState, useRef } from "react";
import "./Display.css";
import { Container } from "../container/Container";
import Button from "../container/button/Button";
import Tooltip from "../container/tooltip/Tooltip";
import {
  generatePassword,
  copyToClipBoard
} from "../../../utility/passwordGenerator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

const Display = ({ setPassInput, setModal }) => {
  const [password, setPassword] = useState("");
  const [rangeValue, setRange] = useState();
  const [passwordProps, setPasswordProps] = useState();
  const [tooltip, setTooltip] = useState(false);
  const [type, setType] = useState("password");
  const passwordRef = useRef(null);
  let pwdDescription = "";

  const generateNewPassword = ({ setPassInput }) => {
    const pwd =
      rangeValue > 3
        ? generatePassword(passwordProps, rangeValue)
        : generatePassword(passwordProps, 3);
    setPassword(pwd);
  };

  const copyClipBoard = e => {
    e.preventDefault();
    copyToClipBoard(passwordRef.current);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 2000);
  };

  const onSelectTag = e => {
    setType(e.target.value);
  };

  const setBackgroundColor = password => {
    if (password && password.length >= 14 && password.length <= 20) {
      pwdDescription = "Strong password";
      return "#05c5ff";
    } else if (password && password.length > 20) {
      pwdDescription = "Super strong password";
      return "#20c997";
    } else {
      pwdDescription = "Bad password";
      return "#cb473e";
    }
  };

  return (
    <>
      <div className="row">
        <div
          className="col-9 password-display-container"
          style={{ backgroundColor: setBackgroundColor(password) }}
        >
          <div style={{ width: "100%" }}>
            <div className="password-display">
              <input
                ref={passwordRef}
                type="text"
                value={password}
                className="password-display-input"
                readOnly
              />
            </div>

            <div className="password-description">
              {password && password.length > 14 ? (
                <>
                  <i className="fas fa-check-circle"></i> {pwdDescription}
                </>
              ) : (
                <>
                  <i className="fas fa-exclamation-circle"></i> {pwdDescription}
                </>
              )}
            </div>
          </div>

          <div className="password-display-icons">
            <Button
              className="copy-btn"
              iconClass="far fa-copy"
              handleClick={copyClipBoard}
            />
            <Button
              className="generate-btn"
              // iconClass="fas fa-sync-alt"
              handleClick={() => generateNewPassword()}
            >
              <FontAwesomeIcon
                icon={faArrowRotateLeft}
                className="lrgIcon cursor mr-1"
              />
            </Button>

            <Tooltip
              message="Copied"
              position="left"
              displayTooltip={tooltip}
            />
          </div>
        </div>
      </div>

      <Container
        type={type}
        setPassword={setPassword}
        setRange={setRange}
        setPasswordProps={setPasswordProps}
        passwordRef={passwordRef}
        setPassInput={setPassInput}
        setModal={setModal}
      />
    </>
  );
};

// const selectTagStyle = {
//   backgroundColor: "inherit",
//   color: "#506175",
//   width: "80%",
//   height: "auto",
//   marginLeft: "-4px"
// };

export default Display;
