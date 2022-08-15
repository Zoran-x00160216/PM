import React from "react";
import "./Spinner.css";

function Spinner() {
  return (
    <>
      <div className="spinnerContainer">
        <div className="spinner-border textSecondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow textSecondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default Spinner;
