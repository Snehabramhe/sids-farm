const {OrderTable} = require('../database/schema/order.schema');
const mongoose = require("mongoose");
const {UserTable} = require("../database/schema/user.schema");
const {CartTable} = require("../database/schema/cart.schema");

/**
 * @usage : place an order
 * @url : http://localhost:9000/api/orders/place
 * @method : POST
 * @params: products, tax, total, paymentOption
 * @access : private
 */
const placeOrder = async (request, response) => {
    try {
        const  {products, tax, total, paymentOption} = request.body;
        const {_id} = request.headers['user'];
        const mongoUserId = new mongoose.mongo.ObjectId(_id);
        const userObj = await UserTable.findById(mongoUserId);
        if (!userObj) {
            return response.status(400).json({msg: 'Unable to get user info'});
        }

        const newOrder = new OrderTable({
            products : products,
            tax : tax,
            total : total,
            paymentOption : paymentOption,
            orderBy : new mongoose.mongo.ObjectId(userObj._id)
        });

        const orderResponse = await newOrder.save();

        // clear the cart
        if(orderResponse){
            const cartResponse = await CartTable.findOneAndDelete({userObj : new mongoose.mongo.ObjectId(userObj._id)});
        }

        const theOrder = await OrderTable.findById(new mongoose.mongo.ObjectId(orderResponse._id)).populate('orderBy').exec();
        if(!theOrder){
            return response.status(400).json({msg : 'Unable to place an order'});
        }
        return response.status(201).json({msg: 'Order is placed successfully!', order : theOrder});
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({msg : 'Something went wrong'});
    }
}

/**
 * @usage : update Order Status
 * @url : http://localhost:9000/api/orders/:orderId
 * @method : PUT
 * @params: orderStatus
 * @access : private
 */
const updateOrderStatus = async (request, response) => {
    try {
        const {orderStatus} = request.body;
        const {orderId} = request.params;
        const {_id} = request.headers['user'];
        const mongoUserId = new mongoose.mongo.ObjectId(_id);
        const userObj = await UserTable.findById(mongoUserId);
        if (!userObj) {
            return response.status(400).json({msg: 'Unable to get user info'});
        }
        // get order info
        const orderResponse = await OrderTable.findById(new mongoose.mongo.ObjectId(orderId));
        if(!orderResponse){
            return response.status(400).json({msg: 'Unable to get Order info'});
        }

        // update the status
        const updateResponse = await OrderTable.findByIdAndUpdate({_id : new mongoose.mongo.ObjectId(orderResponse._id)}, {
            $set : {
                orderStatus : orderStatus
            }
        }, {new : true}).populate('orderBy').exec();

        if(!updateResponse){
            return response.status(400).json({msg: 'Unable to Update Order info'});
        }

        return response.status(200).json({msg : "Order status is updated!", order : updateResponse});

    }
    catch (error) {
        console.log(error);
        return response.status(500).json({msg : 'Something went wrong'});
    }
}

/**
 * @usage : get My Orders
 * @url : http://localhost:9000/api/orders/me
 * @method : GET
 * @params: NA
 * @access : private
 */
const getMyOrders = async (request, response) => {
    try {
        const {_id} = request.headers['user'];
        const mongoUserId = new mongoose.mongo.ObjectId(_id);
        const userObj = await UserTable.findById(mongoUserId);
        if (!userObj) {
            return response.status(400).json({msg: 'Unable to get user info'});
        }
        const orderResponse = await OrderTable.find({orderBy : new mongoose.mongo.ObjectId(userObj._id)}).populate('orderBy').sort({'createdAt' : -1}).exec();
        if(!orderResponse){
            return response.status(400).json({msg : 'Unable to get the order info'});
        }
        return response.status(200).json({orders : orderResponse});
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({msg : 'Something went wrong'});
    }
}

/**
 * @usage : get All Orders
 * @url : http://localhost:9000/api/orders/all
 * @method : GET
 * @params: NA
 * @access : private
 */
const getAllOrders = async (request, response) => {
    try {
        const {_id} = request.headers['user'];
        const mongoUserId = new mongoose.mongo.ObjectId(_id);
        const userObj = await UserTable.findById(mongoUserId);
        if (!userObj) {
            return response.status(400).json({msg: 'Unable to get user info'});
        }
        // are you an Admin
        if(!userObj.isAdmin){
            return response.status(400).json({msg: 'You are not Authorized!'});
        }

        const orderResponse = await OrderTable.find().populate('orderBy').sort({'createdAt' : -1}).exec();
        if(!orderResponse){
            return response.status(400).json({msg : 'Unable to get the order info'});
        }
        return response.status(200).json({orders : orderResponse});
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({msg : 'Something went wrong'});
    }
}


module.exports = {
    placeOrder,
    updateOrderStatus,
    getMyOrders,
    getAllOrders
}