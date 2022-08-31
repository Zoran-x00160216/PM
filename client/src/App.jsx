// React Components
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import history from "./history";
// Routes
import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateRouteAdmin from "./components/routing/PrivateRouteAdmin";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/layout/Auth/Login";
import Help from "./components/layout/Help";
import Register from "./components/layout/Auth/Register";
import WebAccounts from "./components/layout/vault/WebAccounts";
import Identity from "./components/layout/vault/Identity";
import Notes from "./components/layout/vault/Notes";
import Cards from "./components/layout/vault/Cards";
import Favorites from "./components/layout/vault/favorites/Favorites";
import Category from "./components/layout/vault/categories/Category";
import AlertComponent from "./components/layout/AlertComponent";
import AdminDashboard from "./components/layout/admin/AdminDashboard";
import Settings from "./components/layout/Settings";
import Users from "./components/layout/admin/Users";
import StripeContainer from "./components/stripePayment/StripeContainer";
// actions
import { loadUser, logout } from "./actions/auth";
// utils
import setAuthToken from "./utility/setAuthToken";
import jwtDecode from "jwt-decode";

// Redux
import { Provider } from "react-redux";
import store from "./store";
// Css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "../src/components/layout/vault/forms/FormModal.css";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}
setInterval(() => {
  if (localStorage.token) {
    const token = localStorage.getItem("token");
    const decodedJwt = jwtDecode(token);
    if (decodedJwt.exp * 1000 - 10000 <= Date.now()) {
      store.dispatch(logout());
    }
  }
}, 10000);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    window.onload = () => store.dispatch(logout());
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <Navbar />
          <AlertComponent />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/help" element={<Help />} />
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/stripeContainer"
              element={<StripeContainer />}
            />
            <Route exact path="/register" element={<Register />} />
            <Route element={<PrivateRouteAdmin />}>
              <Route path="/adminDashboard" element={<AdminDashboard />} />
            </Route>
            <Route element={<PrivateRouteAdmin />}>
              <Route path="/admin/users" element={<Users />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/webAccounts" element={<WebAccounts />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/identity" element={<Identity />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/cards" element={<Cards />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/notes" element={<Notes />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/favorites" element={<Favorites />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/category/:id" element={<Category />} />
            </Route>
          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
