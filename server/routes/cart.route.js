const express = require('express');
const {formValidationMiddleware} = require("../middlewares/formValidation.middleware");
const {tokenVerifierMiddleware} = require("../middlewares/tokenVerifier.middleware");
const {createCart, getCartInfo} = require("../controller/cart.controller");
const {body} = require('express-validator');

const cartRouter = express.Router();

/**
 * @usage : Create a Cart
 * @url : http://localhost:9000/api/carts/create
 * @method : POST
 * @params : products[] , tax, total
 * @access : private
 */
cartRouter.post('/create', [
    body('products').notEmpty().withMessage('Products should not be empty'),
    body('tax').notEmpty().withMessage('Tax should not be empty'),
    body('total').notEmpty().withMessage('Total should not be empty'),
], formValidationMiddleware, tokenVerifierMiddleware, createCart)


/**
 * @usage : Get Cart Info
 * @url : http://localhost:9000/api/carts/info
 * @method : GET
 * @params : NA
 * @access : private
 */
cartRouter.get('/info',  tokenVerifierMiddleware, getCartInfo)


module.exports = {
    cartRouter
}