import React, { useState } from "react";
import { useEffect } from "react";
import { hibp } from "../../../../actions/hibp";
import HibpModal from "./HibpModal";

const Hibp = () => {
  const [em, setEmail] = useState({ email: "" });
  const [openModalHibp, setOpenModalHibp] = useState(false);
  const [responseHibp, setResponseHibp] = useState();

  const { email } = em;

  useEffect(() => {
    responseHibp !== undefined && setOpenModalHibp(true);
  }, [responseHibp]);

  const onChange = e => {
    e.preventDefault();
    setEmail({ [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const allEntries = hibp(email);
    Promise.all([allEntries]).then(values => {
      setResponseHibp(values);
    });
    setEmail({ email: "" });
  };

  return (
    <>
      {openModalHibp && (
        <HibpModal
          setOpenModalHibp={setOpenModalHibp}
          responseHibp={responseHibp}
        />
      )}
      <div className="m-3 p-3 shadow-sm  myRounded primary">
        <p className="pt-2 fw-bold text-light">
          Check if your email is in a data breach
        </p>
        <form onSubmit={e => onSubmit(e)}>
          <div className="modal-body  fs-6">
            <div className="mb-3">
              <label
                htmlFor="recipient-name"
                className="col-form-label small-text text-light"
              >
                Enter your email:
              </label>
              <div className="d-flex mb-3">
                <input
                  type="text"
                  className="form-control myInput"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                  required
                ></input>
              </div>
            </div>

            <button
              type="submit"
              name="update"
              className="btn-outline-success myBtn bgCards text-dark"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Hibp;
