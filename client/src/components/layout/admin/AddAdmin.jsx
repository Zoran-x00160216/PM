import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddAdminForm from "../vault/forms/AddAdminForm";

const AddAdmin = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);

  return (
    <>
      {openModalAdd && <AddAdminForm setOpenModalAdd={setOpenModalAdd} />}
      <div className="m-3 mt-5 shadow-sm bgCards myRounded">
        <ul className="pt-4 pb-4">
          <li className="pb-3">
            <FontAwesomeIcon
              icon={faPlus}
              className="smIcon mr-4 textPrimary cursor"
              onClick={() => setOpenModalAdd(true)}
            />
            Add Admin User
          </li>
        </ul>
      </div>
    </>
  );
};

export default AddAdmin;
