const mongoose = require('mongoose');

const {ProductsTable} = require('../database/schema/product.schema');


/**
 * @usage : Get all products from DB
 * @url : http://127.0.0.1:9000/api/products/
 * @method : GET
 * @params : NA
 */
const getAllProducts = async (request, response) => {
     const dbResponse = await ProductsTable.find({}).sort({ createdAt: -1 });
     if(!dbResponse) {
         return response.status(404).json({message: 'No products found!'});
     }
    return response.status(200).json(dbResponse);
}

/**
 * @usage : Get a product by id
 * @url : http://127.0.0.1:9000/api/products/:productId
 * @method : GET
 * @params : NA
 */
const getProductById = async (request, response) => {
    const productId = request.params.productId;
    if(!productId){
        return response.status(404).json({message: 'ProductId missing!'});
    }
    const mongoProductId = new mongoose.mongo.ObjectId(productId);

    const dbResponse = await ProductsTable.findById(mongoProductId);
    if(!dbResponse) {
        return response.status(404).json({message: 'No product found! for the Id'});
    }
    return response.status(200).json(dbResponse);
}

/**
 * @usage : Create New Product
 * @url : http://127.0.0.1:9000/api/products/
 * @method : POST
 * @params : productName, price, imageUrl, energy, protein, fat, nutritionalInfo
 */
const createNewProduct = async (request, response) => {
    // insert into database
    const dbResponse = await new ProductsTable({
        productName : request.body.productName,
        price : request.body.price,
        imageUrl : request.body.imageUrl,
        energy : request.body.energy,
        protein : request.body.protein,
        fat : request.body.fat,
        nutritionalInfo : request.body.nutritionalInfo,
    }).save();

    if(!dbResponse){
        return response.status(500).json({msg : 'Unable to insert into DB'});
    }

    return response.status(201).json({
        msg : 'Product Creation is Successful',
        product : dbResponse
    });
}

/**
 * @usage : Update Product by id
 * @url : http://127.0.0.1:9000/api/products/:productId
 * @method : POST
 * @params : productName, price, imageUrl, energy, protein, fat, nutritionalInfo
 */
const updateProductById = async (request, response) => {
    const productId = request.params.productId;

    // check if the product id is there or not
    if(!productId){
        return response.status(404).json({message: 'ProductId missing!'});
    }
    const mongoProductId = new mongoose.mongo.ObjectId(productId);

    // check if the product is existing in db with the product id
    const dbResponse = await ProductsTable.findById(mongoProductId);
    if(!dbResponse) {
        return response.status(404).json({message: 'No product found! for the Id'});
    }

    // update product to DB
    const updateResponse = await ProductsTable.findByIdAndUpdate(mongoProductId, {
        $set: {
            productName : request.body.productName,
            price : request.body.price,
            imageUrl : request.body.imageUrl,
            energy : request.body.energy,
            protein : request.body.protein,
            fat : request.body.fat,
            nutritionalInfo : request.body.nutritionalInfo,
        }
    }, {new : true});

    if(!updateResponse){
        return response.status(500).json({msg : 'Unable to Update to DB'});
    }

    // for success update to db
    return response.status(200).json({
        msg : 'Product Update is Successful',
        product : updateResponse
    });
}

/**
 * @usage : Delete product by id
 * @url : http://127.0.0.1:9000/api/products/:productId
 * @method : DELETE
 * @params : NA
 */
const deleteProductById = async (request, response) => {
    const productId = request.params.productId;
    if(!productId){
        return response.status(404).json({message: 'ProductId missing! in the Url'});
    }
    const mongoProductId = new mongoose.mongo.ObjectId(productId);

    const dbResponse = await ProductsTable.findById(mongoProductId);
    if(!dbResponse) {
        return response.status(404).json({message: 'No product found! for the Id to delete'});
    }

    // delete
    let deleteResponse = await ProductsTable.findByIdAndDelete(mongoProductId);
    if(!deleteResponse){
        return response.status(500).json({message: 'Unable to delete the product!'});
    }
    return response.status(200).json(deleteResponse);
}

module.exports = {
    getAllProducts,
    createNewProduct,
    getProductById,
    updateProductById,
    deleteProductById
}