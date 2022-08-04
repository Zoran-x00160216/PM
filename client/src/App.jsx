// React Components
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Routes
import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateRouteAdmin from "./components/routing/PrivateRouteAdmin";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/layout/Auth/Login";
import Register from "./components/layout/Auth/Register";
import WebAccounts from "./components/layout/vault/WebAccounts";
import Identity from "./components/layout/vault/Identity";
import Notes from "./components/layout/vault/Notes";
import Cards from "./components/layout/vault/Cards";
import Favorites from "./components/layout/vault/favorites/Favorites";
import AlertComponent from "./components/layout/AlertComponent";
import AdminDashboard from "./components/layout/admin/AdminDashboard";
import Users from "./components/layout/admin/Users";
import { loadUser, logout } from "./actions/auth";
import setAuthToken from "./utility/setAuthToken";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// Css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StripeContainer from "./components/stripePayment/StripeContainer";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    // window.onload = () => store.dispatch(logout());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <AlertComponent />
          <Routes>
            <Route exact path="/" element={<Home />} />
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
          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
