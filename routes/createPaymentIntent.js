const express = require("express");
const router = express.Router();
const { resolve } = require("path");
// Replace if using a different env file or config
// const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY
  //   {
  //   apiVersion: "2020-08-27",
  //   appInfo: {
  //     // For sample support and debugging, not required for production:
  //     name: "stripe-samples/accept-a-payment/custom-payment-flow",
  //     version: "0.0.2",
  //     url: "https://github.com/stripe-samples",
  //   },
  // }
);

// router.get('/', (req, res) => {
//   const path = resolve(process.env.STATIC_DIR + '/index.html');
//   res.sendFile(path);
// });

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post("/", async (req, res) => {
  const { paymentMethodType, currency, paymentMethodOptions } = req.body;

  // Each payment method type has support for different currencies. In order to
  // support many payment method types and several currencies, this server
  // endpoint accepts both the payment method type and the currency as
  // parameters.
  //
  // Some example payment method types include `card`, `ideal`, and `alipay`.
  const params = {
    payment_method_types: [paymentMethodType],
    amount: 499,
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

// router.post('/webhook', async (req, res) => {
//   let data, eventType;

//   // Check if webhook signing is configured.
//   if (process.env.STRIPE_WEBHOOK_SECRET) {
//     // Retrieve the event by verifying the signature using the raw body and secret.
//     let event;
//     let signature = req.headers['stripe-signature'];
//     try {
//       event = stripe.webhooks.constructEvent(
//         req.rawBody,
//         signature,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.log(`⚠️  Webhook signature verification failed.`);
//       return res.sendStatus(400);
//     }
//     data = event.data;
//     eventType = event.type;
//   } else {
//     // Webhook signing is recommended, but if the secret is not configured in `config.js`,
//     // we can retrieve the event data directly from the request body.
//     data = req.body.data;
//     eventType = req.body.type;
//   }

//   if (eventType === 'payment_intent.succeeded') {
//     // Funds have been captured
//     // Fulfill any orders, e-mail receipts, etc
//     // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
//     console.log('💰 Payment captured!');
//   } else if (eventType === 'payment_intent.payment_failed') {
//     console.log('❌ Payment failed.');
//   }
//   res.sendStatus(200);
// })

module.exports = router;
