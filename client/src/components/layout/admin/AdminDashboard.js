import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AdminSidebar from "../admin/AdminSidebar";
import PieChartComponent from "./PieChartComponent";
import { connect } from "react-redux";
import {
  getAllEntries,
  getUsersCount,
  getPremiumAllEntries,
  getBasicAllEntries
} from "../../../actions/admin";

const AdminDashboard = ({
  getAllEntries,
  getUsersCount,
  getPremiumAllEntries,
  getBasicAllEntries
}) => {
  const [allEntries, setAllEntries] = useState();
  const [allUsers, setAllUsers] = useState();
  const [allEntriesPremium, setAllEntriesPremium] = useState();
  const [allEntriesBasic, setAllEntriesBasic] = useState();

  // call a functions to get db summary per category, users and access priviledge
  useEffect(() => {
    try {
      const allEntries = getAllEntries();
      Promise.all([allEntries]).then(values => {
        const e = JSON.parse(values);
        setAllEntries(e);
      });

      const userSum = getUsersCount();
      Promise.all([userSum]).then(values => {
        const u = JSON.parse(values);
        setAllUsers(u);
      });

      const premiumAllEntries = getPremiumAllEntries();
      Promise.all([premiumAllEntries]).then(values => {
        const p = JSON.parse(values);
        setAllEntriesPremium(p);
      });

      const basicAllEntries = getBasicAllEntries();
      Promise.all([basicAllEntries]).then(values => {
        const b = JSON.parse(values);
        setAllEntriesBasic(b);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(allEntriesBasic, allEntriesPremium);

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <AdminSidebar handleLink={"adminDashboard"} />

          <div className="col-sm-9 mt-1">
            <div className="row">
              <PieChartComponent
                setText={"Basic vs Premium"}
                data={allUsers}
                colors={["#05c5ff", "#20c997"]}
              />
              <PieChartComponent
                setText={"Sum of all entries per category"}
                data={allEntries}
                colors={["#05c5ff", "#20c997", "#e66969", "#ff7f50"]}
              />
              <PieChartComponent
                setText={"Basic - all entries per category"}
                data={allEntriesBasic}
                colors={["#05c5ff", "#20c997", "#e66969", "#ff7f50"]}
              />
              <PieChartComponent
                setText={"Premium - all entries per category"}
                data={allEntriesPremium}
                colors={["#05c5ff", "#20c997", "#e66969", "#ff7f50"]}
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getAllEntries,
  getUsersCount,
  getPremiumAllEntries,
  getBasicAllEntries
})(AdminDashboard);
