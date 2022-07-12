import React from "react";
import Sidebar from "./landingComponents/Sidebar";
import WebAccounts from "./landingComponents/WebAccounts";
import "bootstrap-icons/font/bootstrap-icons.css";

const Landing = () => {
  return (
    <main className="bg-light">
      <div className="container myVh">
        <div className="row">
          <Sidebar />
          <WebAccounts />
        </div>
      </div>
    </main>
  );
};

export default Landing;
