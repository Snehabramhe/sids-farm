const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName : {type: String, required: true, unique: true},
    price : {type: Number, required: true},
    imageUrl : {type: String, required: true},
    energy: {type: Number, required: true},
    protein: {type: Number, required: true},
    fat : {type: Number, required: true},
    nutritionalInfo : {type: String, required: true},
}, {timestamps: true});

const ProductsTable = mongoose.model('products', productSchema);
module.exports = {
    ProductsTable
};
