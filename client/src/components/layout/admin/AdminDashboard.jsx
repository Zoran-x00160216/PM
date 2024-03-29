import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AdminSidebar from "./AdminSidebar";
import PieChartComponent from "./PieChartComponent";
import Spinner from "../../spinner/Spinner";
import { connect } from "react-redux";
import {
  getAllEntries,
  getUsersCount,
  getPremiumAllEntries,
  getBasicAllEntries,
} from "../../../actions/admin";

const AdminDashboard = ({
  getAllEntries,
  getUsersCount,
  getPremiumAllEntries,
  getBasicAllEntries,
}) => {
  const [allEntries, setAllEntries] = useState();
  const [allUsers, setAllUsers] = useState();
  const [allEntriesPremium, setAllEntriesPremium] = useState(null);
  const [allEntriesBasic, setAllEntriesBasic] = useState(null);

  // call a functions to get db summary per category, users and access priviledge
  useEffect(() => {
    try {
      const allEntries = getAllEntries();
      Promise.all([allEntries]).then((values) => {
        const e = JSON.parse(values);
        setAllEntries(e);
      });

      const userSum = getUsersCount();
      Promise.all([userSum]).then((values) => {
        const u = JSON.parse(values);
        setAllUsers(u);
      });

      const premiumAllEntries = getPremiumAllEntries();
      Promise.all([premiumAllEntries]).then((values) => {
        const p = JSON.parse(values);
        setAllEntriesPremium(p);
      });

      const basicAllEntries = getBasicAllEntries();
      Promise.all([basicAllEntries]).then((values) => {
        const b = JSON.parse(values);
        setAllEntriesBasic(b);
      });
    } catch (error) {
      console.log(error);
    }
  }, [getAllEntries, getUsersCount, getPremiumAllEntries, getBasicAllEntries]);

  return allEntriesPremium === null || getBasicAllEntries === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="myContainer mt-5">
        <div className="row">
          <AdminSidebar handleLink={"adminDashboard"} />

          <div className="col-sm-8">
            <div className="row">
              <PieChartComponent
                setText={"Basic vs Premium"}
                data={allUsers}
                colors={["#059bffd7", "#1fbb8c"]}
              />
              <PieChartComponent
                setText={"Sum of all entries per category"}
                data={allEntries}
                colors={["#059bffd7", "#1fbb8c", "#e66969", "#ff7f50"]}
              />
              <PieChartComponent
                setText={"Basic - per collection"}
                data={allEntriesBasic}
                colors={["#059bffd7", "#1fbb8c", "#e66969", "#ff7f50"]}
              />
              <PieChartComponent
                setText={"Premium - per collection"}
                data={allEntriesPremium}
                colors={["#059bffd7", "#1fbb8c", "#e66969", "#ff7f50"]}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AdminDashboard.propTypes = {
  getAllEntries: PropTypes.func.isRequired,
  getUsersCount: PropTypes.func.isRequired,
  getPremiumAllEntries: PropTypes.func.isRequired,
  getBasicAllEntries: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllEntries,
  getUsersCount,
  getPremiumAllEntries,
  getBasicAllEntries,
})(AdminDashboard);
