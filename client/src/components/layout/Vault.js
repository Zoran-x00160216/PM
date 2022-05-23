import React from "react";
import Sidebar from "./subComponets/Sidebar";
import WebAccounts from "./subComponets/WebAccounts";
import "bootstrap-icons/font/bootstrap-icons.css";

const Vault = () => {
  // const [visible, setVisible] = useState({
  //   webAccounts: true,
  //   identity: false,
  //   cards: false,
  //   notes: false,
  // });
  // const { webAccounts, identity, cards, notes} = visible;
  return (
    <main>
      <div className="container myVh">
        <div className="row">
          <Sidebar />
          <WebAccounts />
        </div>
      </div>
    </main>
  );
};

export default Vault;
