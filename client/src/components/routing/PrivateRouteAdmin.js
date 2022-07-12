import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRouteAdmin = ({ auth: { isAuthenticated, loading, tier } }) => {
  // console.log(loading, isAuthenticated, tier);
  return tier !== "admin" && !isAuthenticated ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

PrivateRouteAdmin.propTypes = {
  auth: PropTypes.object.isRequired
  // component: PropTypes.elementType.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRouteAdmin);
