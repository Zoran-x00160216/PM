import React from "react";
import "./Spinner.css";

function Spinner() {
  return (
    <>
      <div className="spinnerContainer">
        <div className="spinner-border textSecondary" role="status"></div>
        <div className="spinner-grow textSecondary" role="status"></div>
      </div>
    </>
  );
}

export default Spinner;
