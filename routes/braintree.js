const braintree = require("braintree");
const express = require('express');
const router = express.Router();
require('dotenv').config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

// gateway.clientToken.generate({
//     customerId: aCustomerId
//   }).then(response => {
//     // pass clientToken to your front-end
//     const clientToken = response.clientToken
//   });

router.get("/client_token", (req, res) => {
    gateway.clientToken.generate({}).then(response => {
      res.send(response.clientToken);
    });
  });
router.get("/checkout", (req, res) => {
    res.render('braintree');
});
router.post("/checkout", (req, res) => {
    const nonceFromTheClient = req.body.payment_method_nonce;
    // Use payment method nonce here

    gateway.transaction.sale({
        amount: "10.00",
        paymentMethodNonce: nonceFromTheClient,
        deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }).then(result => { });
  });


module.exports = router