import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "./Stripe.css";

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUB_KEY;
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  const navigate = useNavigate();
  const [openPayment, setOpenPayment] = useState({
    card: true
  });

  const { card } = openPayment;
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
                className="col-md-10 shadow  primary p-2 text-light"
                onClick={() => setOpenPayment({ card: true })}
              >
                Card payment
              </button>
            </div>

            <Elements stripe={stripeTestPromise}>{card && <Card />}</Elements>
          </div>
        </div>
      </div>
    </>
  );
};

export default StripeContainer;
