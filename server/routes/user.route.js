const express = require('express');
const {registerUser, loginUser, getUserInfo} = require("../controller/user.controller");
const userRouter = express.Router();
const {body} = require("express-validator");
const {formValidationMiddleware} = require("../middlewares/formValidation.middleware");
const {tokenVerifierMiddleware} = require("../middlewares/tokenVerifier.middleware");


/**
 * @usage : Register a User
 * @url : http://127.0.0.1:9000/api/users/register
 * @method : POST
 * @params : username, email, password
 */
userRouter.post("/register", [
    body('username').notEmpty().isLength({min: 5, max: 10}).withMessage('Username must be min 5 chars'),
    body('email').isEmail().withMessage('Proper email is required'),
    body('password').isStrongPassword().withMessage('Strong password is required'),
], formValidationMiddleware, registerUser);


/**
 * @usage : Login a User
 * @url : http://127.0.0.1:9000/api/users/login
 * @method : POST
 * @params : email, password
 */
userRouter.post('/login', [
    body('email').isEmail().withMessage('Proper email is required'),
    body('password').isStrongPassword().withMessage('Strong password is required'),
], formValidationMiddleware, loginUser);

/**
 * @usage : Get User Info
 * @url : http://127.0.0.1:9000/api/users/me
 * @method : GET
 * @params : NA
 */
userRouter.get('/me', tokenVerifierMiddleware, getUserInfo);

module.exports = {
    userRouter
};