import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Vault from "../layout/Vault";

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
  return !isAuthenticated && !loading ? <Navigate to="/login" /> : <Outlet />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  // component: PropTypes.elementType.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
