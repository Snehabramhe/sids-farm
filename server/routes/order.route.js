const express = require('express')
const {placeOrder, updateOrderStatus, getMyOrders, getAllOrders} = require("../controller/order.controller");
const {tokenVerifierMiddleware} = require("../middlewares/tokenVerifier.middleware");
const {formValidationMiddleware} = require("../middlewares/formValidation.middleware");
const {body} = require('express-validator');

const orderRouter = express.Router();

/**
 * @usage : place an order
 * @url : http://localhost:9000/api/orders/place
 * @method : POST
 * @params: products, tax, total, paymentOption
 * @access : private
 */
orderRouter.post("/place", tokenVerifierMiddleware, placeOrder);

/**
 * @usage : update Order Status
 * @url : http://localhost:9000/api/orders/:orderId
 * @method : PUT
 * @params: orderStatus
 * @access : private
 */
orderRouter.put("/:orderId", [
    body('orderStatus').notEmpty().withMessage('Order Status is Required'),
], formValidationMiddleware, tokenVerifierMiddleware, updateOrderStatus);

/**
 * @usage : get My Orders
 * @url : http://localhost:9000/api/orders/me
 * @method : GET
 * @params: NA
 * @access : private
 */
orderRouter.get("/me", tokenVerifierMiddleware, getMyOrders);

/**
 * @usage : get All Orders
 * @url : http://localhost:9000/api/orders/all
 * @method : GET
 * @params: NA
 * @access : private
 */
orderRouter.get("/all", tokenVerifierMiddleware,getAllOrders);

module.exports = {
    orderRouter
}