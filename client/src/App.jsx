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
import Vault from "./components/layout/Vault";
import WebAccountFormAdd from "./components/layout/forms/WebAccountFormAdd";
import WebAccountFormEdit from "./components/layout/forms/WebAccountFormEdit";
import Identity from "./components/layout/subComponets/Identity";
import IdentityFormAdd from "./components/layout/forms/IdentityFormAdd";
import IdentityFormEdit from "./components/layout/forms/IdentityFormEdit";
import Notes from "./components/layout/subComponets/Notes";
import NotesFormAdd from "./components/layout/forms/NotesFormAdd";
import NotesFormEdit from "./components/layout/forms/NotesFormEdit";
import Cards from "./components/layout/subComponets/Cards";
import CardsFormAdd from "./components/layout/forms/CardsFormAdd";
import CardsFormEdit from "./components/layout/forms/CardsFormEdit";
import AlertComponent from "./components/layout/AlertComponent";
import AdminDashboard from "./components/layout/admin/AdminDashboard";
import Users from "./components/layout/admin/Users";
import { loadUser, logout } from "./actions/auth";
import { getNotes } from "./actions/notes";
import { getWebAccounts } from "./actions/webAccounts";
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
    window.onload = () => store.dispatch(getWebAccounts(), getNotes());
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
              <Route path="/vault" element={<Vault />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/webAccount/add" element={<WebAccountFormAdd />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route
                path="/webAccount/edit/:id"
                element={<WebAccountFormEdit />}
              />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/identity" element={<Identity />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/identity/add" element={<IdentityFormAdd />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/identity/edit/:id" element={<IdentityFormEdit />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/cards" element={<Cards />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/cards/add" element={<CardsFormAdd />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/cards/edit/:id" element={<CardsFormEdit />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/notes" element={<Notes />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/notes/add" element={<NotesFormAdd />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/notes/edit/:id" element={<NotesFormEdit />} />
            </Route>
          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
