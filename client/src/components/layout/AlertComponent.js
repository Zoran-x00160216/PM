import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AlertComponent = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div
      key={alert.id}
      className={`alert ${alert.alertType} shadow-sm myRounded`}
      role="alert"
    >
      <p className="alert-link ">{alert.msg}</p>
    </div>
  ));

AlertComponent.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertComponent);
