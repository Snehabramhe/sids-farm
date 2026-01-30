const express = require('express');
const {body} = require('express-validator');
const {formValidationMiddleware} = require("../middlewares/formValidation.middleware");
const {createAddress, updateAddress, deleteAddress, getAddress} = require("../controller/address.controller");
const {tokenVerifierMiddleware} = require("../middlewares/tokenVerifier.middleware");

const addressRouter = express.Router();

/**
 * @usage : Add New Address
 * @url : http://localhost:9000/api/addresses/
 * @method : POST
 * @params : mobile, flat, buildingName, landmark, area, city, state, country, zipcode
 * @access : private
 */
addressRouter.post('/', [
    body('mobile').notEmpty().withMessage('Mobile is required'),
    body('flat').notEmpty().withMessage('Flat is required'),
    body('buildingName').notEmpty().withMessage('Building Name is required'),
    body('landmark').notEmpty().withMessage('Landmark is required'),
    body('area').notEmpty().withMessage('Area is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('zipcode').notEmpty().withMessage('ZipCode is required'),
], formValidationMiddleware, tokenVerifierMiddleware, createAddress)



/**
 * @usage : Update Address
 * @url : http://localhost:9000/api/addresses/:addressId
 * @method : PUT
 * @params : mobile, flat, buildingName, landmark, area, city, state, country, zipcode
 * @access : private
 */
addressRouter.put('/:addressId', [
    body('mobile').notEmpty().withMessage('Mobile is required'),
    body('flat').notEmpty().withMessage('Flat is required'),
    body('buildingName').notEmpty().withMessage('Building Name is required'),
    body('landmark').notEmpty().withMessage('Landmark is required'),
    body('area').notEmpty().withMessage('Area is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('zipcode').notEmpty().withMessage('ZipCode is required'),
], formValidationMiddleware,tokenVerifierMiddleware, updateAddress)

/**
 * @usage : Delete an Address
 * @url : http://localhost:9000/api/addresses/:addressId
 * @method : DELETE
 * @params : NA
 * @access : private
 */
addressRouter.delete('/:addressId',  tokenVerifierMiddleware, deleteAddress)

/**
 * @usage : Get an Address
 * @url : http://localhost:9000/api/addresses/me
 * @method : GET
 * @params : NA
 * @access : private
 */
addressRouter.get('/me',  tokenVerifierMiddleware, getAddress)

module.exports = {
    addressRouter,
}