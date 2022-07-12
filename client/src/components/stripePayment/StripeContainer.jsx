import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";
import "./stripe.css";

const PUBLIC_KEY =
  "pk_test_51LJ1WIHnQqvtKtNqT64q951fFiHCVA1pzBh2Y9JX44meC7ZQ4mWayFtMIfOXbTyJObDXabBhwJgcS1Ln626ubADQ00q2Utd32z";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
