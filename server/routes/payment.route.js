const express = require('express');
const {tokenVerifierMiddleware} = require("../middlewares/tokenVerifier.middleware");
const {makePayment} = require("../controller/payment.controller");

const paymentRouter = express.Router();

/**
 * @usage : http://localhost:9000/api/payments/make-payment
 * @method: POST
 * @usage : To accept payment
 * @param: amount, currency
 */
paymentRouter.post('/make-payment', tokenVerifierMiddleware, makePayment);

module.exports = {
    paymentRouter
}