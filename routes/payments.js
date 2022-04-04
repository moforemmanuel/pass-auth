const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51KkG8dHIYtoXDLu2ZhdjpjzAb2jp0M1Pm1ZDE5MXpJu3mcgsCrGAJkDlTPo5l9eLLmjuyY8LqBX9fwWcVMM3XpzY0082WPwuQZ');

const ensureAuthenticated = require('../config/auth').ensureAuthenticated;

const calculateOrderAmount = items => {
    return 1400;
};

router.get('/checkout', ensureAuthenticated, (req, res) => {
    res.render('checkout');
})

router.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    //create payment intent with the order and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        },
        // payment_method_types: [
        //     // 'bancontact',
        //     'card',
        //     'eps',
        //     'giropay',
        //     'ideal',
        //     'p24',
        //     'sepa_debit',
        //     'sofort',
        //   ],
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

module.exports = router