import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUserTier } from "../../actions/auth";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { sendEmaiConformationPayment } from "../../actions/sendEmail";
import { setAlert } from "../../actions/alert";

const CardForm = ({
  updateUserTier,
  setAlert,
  sendEmaiConformationPayment,
  auth: { user }
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setAlert("Stripe.js has not yet loaded.", "mySuccess");
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
          paymentMethodType: "card",
          currency: "eur"
        })
      }
    ).then(r => r.json());

    if (backendError) {
      setAlert(backendError.message, "myDanger");
      return;
    }

    setAlert("Processing your payment...", "mySuccess");

    const {
      error: stripeError,
      paymentIntent
    } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: fullname
        }
      }
    });

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      setAlert(stripeError.message, "myDanger");
      return;
    }
    if (paymentIntent.status === "succeeded") {
      updateUserTier("premium");
      sendEmaiConformationPayment(user.email);
      // setAlert("Congratulations, you upgraded to premium account", "mySuccess");
      setTimeout(() => navigate("/webAccounts"), 2500);
    }
    // Show a success message to your customere
    // payment_intent.succeeded event that handles any business critical
    // post-payment actions.
    setAlert(`Payment ${paymentIntent.status}`, "mySuccess");
    // addPaymentStatus(paymentIntent.status);
  };

  const onChange = e => {
    e.preventDefault();
    setFullname(e.target.value);
  };

  return (
    <>
      <div>
        {/* <h1 className="mb-3">Card</h1> */}

        {/* <p>
          <h4>
            Try a{" "}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noopener noreferrer"
            >
              test card
            </a>
            :
          </h4>
          <div>
            <code>4242424242424242</code> (Visa)
          </div>
          <div>
            <code>5555555555554444</code> (Mastercard)
          </div>
          <div>
            <code>4000002500003155</code> (Requires{" "}
            <a
              href="https://www.youtube.com/watch?v=2kc-FjU2-mY"
              target="_blank"
              rel="noopener noreferrer"
            >
              3DSecure
            </a>
            )
          </div>
        </p> */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="card" className="m-3">
            Card
          </label>
          <CardElement
            id="card"
            className="form-control myRounded vw-90 myP-2 mb-3"
          />
          <input
            type="text"
            name="fullname"
            placeholder="name"
            value={fullname}
            onChange={e => onChange(e)}
            className="form-control myRounded vw-90 myP-2 small-text"
          />

          <button type="submit" className="mt-4 shadow myBtn longBtn primary">
            Pay
          </button>
        </form>
      </div>
    </>
  );
};
CardForm.propTypes = {
  updateUserTier: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  sendEmaiConformationPayment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  updateUserTier,
  setAlert,
  sendEmaiConformationPayment
})(CardForm);
