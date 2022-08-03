import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import SepaDebit from "./SepaDebit";
import "./Stripe.css";

const PUBLIC_KEY =
  "pk_test_51LJ1WIHnQqvtKtNqT64q951fFiHCVA1pzBh2Y9JX44meC7ZQ4mWayFtMIfOXbTyJObDXabBhwJgcS1Ln626ubADQ00q2Utd32z";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  const navigate = useNavigate();
  const [openPayment, setOpenPayment] = useState({
    card: true,
    sepaDebit: false
  });

  const { card, sepaDebit } = openPayment;
  return (
    <>
      <div className="stripeContainer">
        <div className=" stripeForm bgCards shadow p-4 myRounded">
          <div id="payment-form" className="">
            <div className="row">
              <button
                className="col-md-2 shadow bgGrey
                  p-2 text-light"
                onClick={() => navigate("/webAccounts")}
              >
                Close
              </button>
              <button
                className="col-md-5 shadow  primary p-2 text-light"
                onClick={() => setOpenPayment({ card: true, sepaDebit: false })}
              >
                Card payment
              </button>
              <button
                className="col-md-5 shadow secondary p-2 text-light"
                onClick={() => setOpenPayment({ card: false, sepaDebit: true })}
              >
                Sepa debit payment
              </button>
            </div>

            <Elements stripe={stripeTestPromise}>
              {card && <Card />}
              {sepaDebit && <SepaDebit />}
            </Elements>
          </div>
        </div>
      </div>
    </>
  );
};

export default StripeContainer;
