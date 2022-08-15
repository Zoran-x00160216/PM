import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import CatWebAccounts from "./CatWebAccounts";
import CatIdentity from "./CatIdentity";
import CatCards from "./CatCards";
import CatNotes from "./CatNotes";
import WebAccountFormAdd from "../forms/WebAccountFormAdd";
import CardsFormAdd from "../forms/CardsFormAdd";
import IdentityFormAdd from "../forms/IdentityFormAdd";
import NotesFormAdd from "../forms/NotesFormAdd";
import ModalConfirm from "../../../modal/ModalConfirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Categories = ({ webAccounts: { webAccounts }, auth: { tier } }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [catId, setCatId] = useState("nista");
  const [openModal, setOpenModal] = useState(false);
  const [openWebAccountAdd, setOpenWebAccountAdd] = useState(false);
  const [openIdentityAdd, setOpenIdentityAdd] = useState(false);
  const [openCardAdd, setOpenCardAdd] = useState(false);
  const [openNoteAdd, setOpenNoteAdd] = useState(false);

  useEffect(() => {
    setCatId(params.id);
  }, [params]);

  const checkPermission = () => {
    if (webAccounts.length >= 7 && tier === "basic") {
      setOpenModal(true);
    } else {
      setOpenWebAccountAdd(true);
    }
  };

  const openPayment = () => {
    setOpenModal(false);
    navigate("/stripeContainer");
  };

  return (
    <>
      {openWebAccountAdd && (
        <WebAccountFormAdd setOpenModalAdd={setOpenWebAccountAdd} />
      )}
      {openIdentityAdd && (
        <IdentityFormAdd setOpenModalAdd={setOpenIdentityAdd} />
      )}

      {openCardAdd && <CardsFormAdd setOpenModalAdd={setOpenCardAdd} />}
      {openNoteAdd && <NotesFormAdd setOpenModalAdd={setOpenNoteAdd} />}
      {openModal && (
        <ModalConfirm
          setModal={setOpenModal}
          setBtnText={"contiune"}
          setColor={"primary"}
          setText={
            "You reached maximum number of login entries, to continue get premium account"
          }
          edit={openPayment}
        />
      )}
      <div className="container myVh">
        <div className="row">
          <Sidebar />
          <div className="col-sm-6 mt-3">
            <div className="m-2 p-3 shadow-sm mb-2 small-text bgCards myRounded">
              <div className="mb-2">
                <span>Add </span>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="textPrimary smIcon"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                />

                <ul
                  className="dropdown-menu noBorder shadow-sm  myRounded"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li
                    className="dropdown-item margin0 cursor myDropdownTxtColor"
                    onClick={() => checkPermission()}
                  >
                    Web Account
                  </li>
                  <li
                    className="dropdown-item margin0 cursor myDropdownTxtColor"
                    onClick={() => setOpenIdentityAdd(true)}
                  >
                    Identity
                  </li>
                  <li
                    className="dropdown-item margin0 cursor myDropdownTxtColor"
                    onClick={() => setOpenCardAdd(true)}
                  >
                    Card
                  </li>
                  <li
                    className="dropdown-item margin0 cursor myDropdownTxtColor"
                    onClick={() => setOpenNoteAdd(true)}
                  >
                    Note
                  </li>
                </ul>
              </div>
              <CatWebAccounts c={catId} />
              <CatIdentity c={catId} />
              <CatCards c={catId} />
              <CatNotes c={catId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Categories.propTypes = {
  auth: PropTypes.object.isRequired,
  webAccounts: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  webAccounts: state.webAccounts,
  text: state.text
});

export default connect(mapStateToProps)(Categories);
