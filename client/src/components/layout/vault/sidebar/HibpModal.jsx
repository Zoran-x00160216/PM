import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../../../spinner/Spinner";

const HibpModal = ({ setOpenModalHibp, responseHibp }) => {
  const [dataBreaches, setDataBreaches] = useState([]);
  console.log("Boom", responseHibp);

  useEffect(() => {
    setDataBreaches(responseHibp);
  }, [responseHibp]);

  let num = 1;
  const resHibp =
    Array.isArray(dataBreaches[0]) &&
    dataBreaches[0].map(item => {
      num = num + 1;
      console.log(item.Name, num);
      return (
        <div key={num}>
          <ul>
            <li>
              Name: <span className="fw-bold"> {item.Name}</span>
            </li>
            <li>
              Domain: <span className="fw-bold"> {item.Domain}</span>
            </li>
            <li>
              Breach Date: <span className="fw-bold"> {item.BreachDate}</span>
            </li>
            <li>
              Data compromised:{" "}
              <span className="fw-bold">{item.DataClasses}</span>
            </li>
          </ul>
        </div>
      );
    });

  return dataBreaches.length === null ? (
    <Spinner />
  ) : (
    <>
      <main className="modalBackgroundForm">
        <div className="modalContainerForm bgCards">
          <div className="modal-header">
            <p className="fw-bold">
              We found your account in some data breaches
            </p>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                setOpenModalHibp(false);
              }}
            ></button>
          </div>
          <div className="modal-body formScroll fs-6">
            <div>{resHibp}</div>
          </div>
        </div>
      </main>
    </>
  );
};

HibpModal.propTypes = {
  responseHibp: PropTypes.array,
  setOpenModalHibp: PropTypes.func.isRequired
};

export default HibpModal;
