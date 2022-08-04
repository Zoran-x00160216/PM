import React from "react";
import PropTypes from "prop-types";
import Sidebar from "../sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/dropdown";
import FavWebAccounts from "./FavWebAccounts";
import FavIdentity from "./FavIdentity";
import FavCards from "./FavCards";
import FavNotes from "./FavNotes";

const Favorites = props => {
  return (
    <>
      <div className="container myVh">
        <div className="row">
          <Sidebar />
          <FavWebAccounts />
          <FavIdentity />
          <FavCards />
          <FavNotes />
        </div>
      </div>
    </>
  );
};

Favorites.propTypes = {};

export default Favorites;
