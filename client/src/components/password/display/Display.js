import React, { useState, useRef } from "react";
import "./Display.css";
import { Container } from "../container/Container";
// import Button from "../container/button/Button";
// import Tooltip from "../container/tooltip/Tooltip";
import {
  generatePassword
  // copyToClipBoard
} from "../../../utility/passwordGenerator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faRotate
} from "@fortawesome/free-solid-svg-icons";

const Display = ({ setPassInput, setModal }) => {
  const [password, setPassword] = useState("");
  const [rangeValue, setRange] = useState();
  const [passwordProps, setPasswordProps] = useState();
  // const [tooltip, setTooltip] = useState(false);
  // const [type, setType] = useState("password");
  const passwordRef = useRef(null);
  let pwdDescription = "";

  const generateNewPassword = () => {
    const pwd =
      rangeValue > 3
        ? generatePassword(passwordProps, rangeValue)
        : generatePassword(passwordProps, 3);
    setPassword(pwd);
  };

  const setBackgroundColor = password => {
    if (password && password.length >= 14 && password.length <= 20) {
      pwdDescription = "Strong password";
      return "#059bffd7";
    } else if (password && password.length > 20) {
      pwdDescription = "Super strong password";
      return "#1fbb8c";
    } else {
      pwdDescription = "Bad password";
      return "#e66969";
    }
  };

  return (
    <>
      <div className="row">
        <div
          className="col-9 password-display-container text-light"
          style={{ backgroundColor: setBackgroundColor(password) }}
        >
          <div style={{ width: "90%" }}>
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
              {password && password.length > 12 ? (
                <>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="mr-1 mt-1"
                  />
                  {pwdDescription}
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="mr-1 mt-1"
                  />
                  {pwdDescription}
                </>
              )}
            </div>
          </div>

          <div className="password-display-icons">
            <FontAwesomeIcon
              icon={faRotate}
              className="lrgIcon cursor mr-1 text-light"
              onClick={generateNewPassword}
            ></FontAwesomeIcon>
          </div>
        </div>
      </div>

      <Container
        // type={type}
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

export default Display;
