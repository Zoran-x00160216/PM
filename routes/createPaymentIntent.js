const express = require("express");
const router = express.Router();
const PremiumPrice = require("../model/PremiumPrice");
const dotenv = require("dotenv");
dotenv.config({path: "./vars/.env"})

const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY
);


router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post("/", async (req, res) => {
  const { paymentMethodType, currency, paymentMethodOptions } = req.body;
  
  const priceSubscription = await PremiumPrice.findOne({price_id: 1});
  const convertTo = priceSubscription.price * 100 
  // Each payment method type has support for different currencies. In order to
  // support many payment method types and several currencies, this server
  // endpoint accepts both the payment method type and the currency as
  // parameters.
  //
  // Some example payment method types include `card`, `ideal`, and `alipay`.
  const params = {
    payment_method_types: [paymentMethodType],
    amount: convertTo,
    description: "Premium account subscription",
    currency: "EUR",
  };

  // If this is for an ACSS payment, we add payment_method_options to create
  // the Mandate.
  if (paymentMethodType === "acss_debit") {
    params.payment_method_options = {
      acss_debit: {
        mandate_options: {
          payment_schedule: "sporadic",
          transaction_type: "personal",
        },
      },
    };
  } else if (paymentMethodType === "konbini") {
    /**
     * Default value of the payment_method_options
     */
    params.payment_method_options = {
      konbini: {
        product_description: "Tシャツ",
        expires_after_days: 3,
      },
    };
  } else if (paymentMethodType === "customer_balance") {
    params.payment_method_data = {
      type: "customer_balance",
    };
    params.confirm = true;
    params.customer =
      req.body.customerId ||
      (await stripe.customers.create().then((data) => data.id));
  }

  /**
   * If API given this data, we can overwride it
   */
  if (paymentMethodOptions) {
    params.payment_method_options = paymentMethodOptions;
  }

  // Create a PaymentIntent with the amount, currency, and a payment method type.
  //
  // See the documentation [0] for the full list of supported parameters.
  //
  // [0] https://stripe.com/docs/api/payment_intents/create
  try {
    const paymentIntent = await stripe.paymentIntents.create(params);

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
      nextAction: paymentIntent.next_action,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});



module.exports = router;
