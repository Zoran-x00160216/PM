import React, { useState } from "react";
import { IbanElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUserTier } from "../../actions/auth";
import ReadMoreReadLess from "./ReadMoreReadLess";
import { setAlert } from "../../actions/alert";

const SepaDebitForm = ({ updateUserTier, setAlert }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setAlert("Stripe.js has not yet loaded.");
      return;
    }

    const { error: backendError, clientSecret } = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/createPaymentIntent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          paymentMethodType: "sepa_debit",
          currency: "eur"
        })
      }
    ).then(r => r.json());

    if (backendError) {
      setAlert(backendError.message);
      return;
    }

    setAlert("Processing your payment...", "mySuccess");

    const {
      error: stripeError,
      paymentIntent
    } = await stripe.confirmSepaDebitPayment(clientSecret, {
      payment_method: {
        sepa_debit: elements.getElement(IbanElement),
        billing_details: {
          name,
          email
        }
      }
    });

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      setAlert(stripeError.message, "myDanger");
      return;
    }

    // Initially the test PaymentIntent will be in the `processing` state.
    // We'll refetch the payment intent client-side after 5 seconds to show
    // that it successfully transitions to the `succeeded` state.
    //
    // In practice, you should use webhook notifications for fulfillment.
    if (paymentIntent.status === "processing") {
      // addMessage(
      //   `Payment processing: ${paymentIntent.id} check webhook events for fulfillment.`
      // );
      // addMessage("Refetching payment intent in 5s.");
      setTimeout(async () => {
        const { paymentIntent } = await stripe.retrievePaymentIntent(
          clientSecret
        );
        setAlert(`Payment ${paymentIntent.status}`, "mySuccess");
      }, 3000);
      console.log(paymentIntent.status);
      if (paymentIntent.status === "succeeded") {
        updateUserTier("premium");
        setTimeout(() => navigate("/webAccounts"), 2500);
      }
    } else {
      setAlert(`Payment ${paymentIntent.status}`, "mySuccess");
      console.log(paymentIntent.status);
      if (paymentIntent.status === "succeeded") {
        updateUserTier("premium");
        setTimeout(() => navigate("/webAccounts"), 2500);
      }
    }
    console.log(paymentIntent.status);
    if (paymentIntent.status === "succeeded") {
      updateUserTier("premium");
      setTimeout(() => navigate("/webAccounts"), 2500);
    }
  };

  return (
    <>
      <div>
        {/* <h1>SEPA Direct Debit</h1> */}

        {/* <p>
        <h4>
          Try a{" "}
          <a href="https://stripe.com/docs/testing#sepa-direct-debit">
            test IBAN account number
          </a>
          :
        </h4>
        <div>
          <code>DE89370400440532013000</code>
        </div>
        <div>
          <code>IE29AIBK93115212345678</code>
        </div>
      </p> */}

        <form className="myShadow bgCards" onSubmit={handleSubmit}>
          <label htmlFor="iban-element" className="m-3">
            Bank Account / IBAN
          </label>
          <IbanElement
            id="iban-element"
            className="form-control myRounded vw-90 mb-3 myP-2"
            options={{ supportedCountries: ["SEPA"] }}
          />

          <input
            id="name"
            value={name}
            placeholder="name"
            className="form-control myRounded vw-90 mb-3 small-text "
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            id="email"
            type="email"
            value={email}
            placeholder="email"
            className="form-control myRounded vw-90 mb-3 small-text "
            onChange={e => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="shadow myBtn longBtn secondary">
            Pay
          </button>

          <div id="error-message" role="alert"></div>
        </form>
        <ReadMoreReadLess>
          By providing your payment information and confirming this payment, you
          authorise (A) PM and Stripe, our payment service provider and/or PPRO,
          its local service provider, to send instructions to your bank to debit
          your account and (B) your bank to debit your account in accordance
          with those instructions. As part of your rights, you are entitled to a
          refund from your bank under the terms and conditions of your agreement
          with your bank. A refund must be claimed within 8 weeks starting from
          the date on which your account was debited. Your rights are explained
          in a statement that you can obtain from your bank. You agree to
          receive notifications for future debits up to 2 days before they
          occur.
        </ReadMoreReadLess>
      </div>
    </>
  );
};

SepaDebitForm.propTypes = {
  updateUserTier: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { updateUserTier, setAlert })(
  SepaDebitForm
);
