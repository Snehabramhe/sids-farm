const express = require('express');
const {
    getAllProducts,
    createNewProduct,
    getProductById,
    updateProductById,
    deleteProductById
} = require('../controller/product.controller');
const {body} = require('express-validator');
const {formValidationMiddleware} = require('../middlewares/formValidation.middleware');

const productRouter = express.Router();

/**
 * @usage : Get all products from DB
 * @url : http://127.0.0.1:9000/api/products/
 * @method : GET
 * @params : NA
 */
productRouter.get('/', async (request, response) => {
    return await getAllProducts(request, response);
});

/**
 * @usage : Get a product by id
 * @url : http://127.0.0.1:9000/api/products/:productId
 * @method : GET
 * @params : NA
 */
productRouter.get('/:productId', async (request, response) => {
    return await getProductById(request, response);
});

/**
 * @usage : Create New Product
 * @url : http://127.0.0.1:9000/api/products/
 * @method : POST
 * @params : productName, price, imageUrl, energy, protein, fat, nutritionalInfo
 */
productRouter.post('/', [
    body('productName').trim().notEmpty().withMessage('Product name is required, Its must be String'),
    body('price').trim().notEmpty().withMessage('Price is required'),
    body('imageUrl').trim().notEmpty().withMessage('Image Url is required'),
    body('energy').trim().notEmpty().withMessage('Energy is required'),
    body('protein').trim().notEmpty().withMessage('Protein is required'),
    body('fat').trim().notEmpty().withMessage('Fat is required'),
    body('nutritionalInfo').trim().notEmpty().withMessage('Nutritional Info is required'),
], formValidationMiddleware, async (request, response) => {
    return await createNewProduct(request, response);
});

/**
 * @usage : Update Product by id
 * @url : http://127.0.0.1:9000/api/products/:productId
 * @method : PUT
 * @params : productName, price, imageUrl, energy, protein, fat, nutritionalInfo
 */
productRouter.put('/:productId', [
    body('productName').trim().notEmpty().withMessage('Product name is required, Its must be String'),
    body('price').trim().notEmpty().withMessage('Price is required'),
    body('imageUrl').trim().notEmpty().withMessage('Image Url is required'),
    body('energy').trim().notEmpty().withMessage('Energy is required'),
    body('protein').trim().notEmpty().withMessage('Protein is required'),
    body('fat').trim().notEmpty().withMessage('Fat is required'),
    body('nutritionalInfo').trim().notEmpty().withMessage('Nutritional Info is required'),
], formValidationMiddleware, async (request, response) => {
    return await updateProductById(request, response);
});

/**
 * @usage : Delete product by id
 * @url : http://127.0.0.1:9000/api/products/:productId
 * @method : DELETE
 * @params : NA
 */
productRouter.delete('/:productId', async (request, response) => {
    return await deleteProductById(request, response);
});


module.exports = {
    productRouter
};