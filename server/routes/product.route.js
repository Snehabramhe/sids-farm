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

// Shared validation rules for create/update.
const productValidationRules = [
    body('productName').trim().notEmpty().withMessage('Product name is required, Its must be String'),
    body('price').trim().notEmpty().withMessage('Price is required'),
    body('imageUrl').trim().notEmpty().withMessage('Image Url is required'),
    body('energy').trim().notEmpty().withMessage('Energy is required'),
    body('protein').trim().notEmpty().withMessage('Protein is required'),
    body('fat').trim().notEmpty().withMessage('Fat is required'),
    body('nutritionalInfo').trim().notEmpty().withMessage('Nutritional Info is required'),
];

/**
 * @usage : Get all products (optionally paginated via ?page=&limit=)
 * @url : http://127.0.0.1:9000/api/products/
 * @method : GET
 */
productRouter.get('/', getAllProducts);

/**
 * @usage : Get a product by id
 * @url : http://127.0.0.1:9000/api/products/:productId
 * @method : GET
 */
productRouter.get('/:productId', getProductById);

/**
 * @usage : Create New Product
 * @url : http://127.0.0.1:9000/api/products/
 * @method : POST
 */
productRouter.post('/', productValidationRules, formValidationMiddleware, createNewProduct);

/**
 * @usage : Update Product by id
 * @url : http://127.0.0.1:9000/api/products/:productId
 * @method : PUT
 */
productRouter.put('/:productId', productValidationRules, formValidationMiddleware, updateProductById);

/**
 * @usage : Delete product by id
 * @url : http://127.0.0.1:9000/api/products/:productId
 * @method : DELETE
 */
productRouter.delete('/:productId', deleteProductById);


module.exports = {
    productRouter
};