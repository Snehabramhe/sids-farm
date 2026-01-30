const mongoose = require("mongoose");
const {ORDER_STATUS} = require("../../constants/constants");

const orderSchema = new mongoose.Schema({
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
    paymentOption: {type: String, required: true},
    orderBy: {type: mongoose.Types.ObjectId, required: true, ref: 'users'},
    orderStatus: {type: String, default: ORDER_STATUS.ORDER_PLACED}
}, {timestamps: true});

const OrderTable = mongoose.model('orders', orderSchema);
module.exports = {
    OrderTable
}