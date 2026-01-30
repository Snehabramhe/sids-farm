const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [
        {
            productName: {type: String, required: true},
            price: {type: Number, required: true},
            imageUrl: {type: String, required: true},
            energy: {type: Number, required: true},
            protein: {type: Number, required: true},
            fat: {type: Number, required: true},
            nutritionalInfo: {type: String, required: true},
            quantity: {type: Number, required: true},
            count: {type: Number, required: true},
        }
    ],
    tax: {type: Number, required: true},
    total: {type: Number, required: true},
    userObj: {type: mongoose.Types.ObjectId, required: true, ref: 'users'}
}, {timestamps: true});

const CartTable = mongoose.model('carts', cartSchema);

module.exports = {
    CartTable
}