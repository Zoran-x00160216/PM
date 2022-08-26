import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CategoryFavoritesLinks from "./CategoryFavoritesLinks";
import { getPremiumPrice } from "../../../../actions/admin";
import VaultLinks from "./VaultLinks";
import Hibp from "./hibs/Hibp";

const Sidebar = ({ auth: { tier }, getPremiumPrice }) => {
  const [currentPrice, setCurrentPrice] = useState();

  useEffect(() => {
    const pp = getPremiumPrice();
    Promise.all([pp]).then((values) => {
      setCurrentPrice(values[0].price);
    });
  }, [currentPrice, getPremiumPrice]);

  return (
    <div className="col-md-4 fs-6">
      <div className="col">
        <VaultLinks />
        <CategoryFavoritesLinks />
        <Hibp />
        {tier === "basic" && (
          <div>
            <div className="m-3 mt-5 p-5 cardShadow bgCards myRounded  font-weight-bold">
              <b>
                <p>Get Premium account</p>
                <p> only {currentPrice} eur</p>
              </b>
              <Link to="/stripeContainer">
                <button
                  type="submit"
                  className="mt-2 shadow myBtn longBtn primary"
                >
                  Continue
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Sidebar.protoType = {
  auth: PropTypes.object.isRequired,
  getPremiumPrice: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getPremiumPrice })(Sidebar);
