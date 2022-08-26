import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPremiumPrice, getPremiumPrice } from "../../../actions/admin";

const SetPremiumPrice = ({ setPremiumPrice, getPremiumPrice }) => {
  const navigate = useNavigate();
  const [premPrice, setPremPrice] = useState({ price: "" });
  const [currentPrice, setCurrentPrice] = useState();
  const { price } = premPrice;

  useEffect(() => {
    const pp = getPremiumPrice();
    Promise.all([pp]).then((values) => {
      setCurrentPrice(values[0].price);
    });
  }, [currentPrice, getPremiumPrice]);

  const onChange = (e) => {
    e.preventDefault();
    setPremPrice({ [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setPremiumPrice(price);
    setPremPrice({ price: "" });
    const pp = getPremiumPrice();
    Promise.all([pp]).then((values) => {
      setCurrentPrice(values[0].price);
    });
    navigate("/adminDashboard");
  };

  return (
    <>
      <div className="m-3 p-3 shadow-sm  myRounded primary">
        <p className="pt-2 fw-bold text-light">
          Here you can change the price for a premium subscription, current
          price {currentPrice} eur
        </p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="modal-body  fs-6">
            <div className="mb-3">
              <label
                htmlFor="recipient-name"
                className="col-form-label small-text text-light"
              >
                Enter new price
              </label>
              <div className="d-flex mb-3">
                <input
                  type="number"
                  className="form-control myInput bgCards myRounded"
                  name="price"
                  value={price}
                  onChange={(e) => onChange(e)}
                  required
                ></input>
              </div>
            </div>

            <button
              type="submit"
              name="update"
              className="btn-outline-success myBtn bgCards text-dark"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

SetPremiumPrice.propType = {
  setPremiumPrice: PropTypes.func.isRequired,
  getPremiumPrice: PropTypes.func.isRequired,
};

export default connect(null, {
  setPremiumPrice,
  getPremiumPrice,
})(SetPremiumPrice);
