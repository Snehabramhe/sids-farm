const mongoose = require('mongoose');
const {UserTable} = require("../database/schema/user.schema");
const {CartTable} = require("../database/schema/cart.schema");

/**
 * @usage : Create a Cart
 * @url : http://localhost:9000/api/carts/create
 * @method : POST
 * @params : products[] , tax, total
 * @access : private
 */
const createCart = async (request, response) => {
    try {
        const {products, tax, total} = request.body;
        const {_id} = request.headers['user'];
        const mongoUserId = new mongoose.mongo.ObjectId(_id);
        const userObj = await UserTable.findById(mongoUserId);
        if (!userObj) {
            return response.status(400).json({msg: 'Unable to get user info'});
        }

        // check if the user is having the cart already, make isLatest to false
        const cartResponse = await CartTable.findOne({userObj : userObj._id}, null, null);
        if(cartResponse){
            await CartTable.findByIdAndDelete(new mongoose.mongo.ObjectId(cartResponse._id));
        }

        // Create Cart
        const theCart = new CartTable({
            products : products,
            tax : tax,
            total : total,
            userObj : userObj._id
        });

        const dbResponse = await theCart.save();
        if(!dbResponse){
            return response.status(400).json({msg : 'Unable to create a cart'});
        }

        // fetch cart Details
        const cartDetailedResponse = await CartTable.findById(new mongoose.mongo.ObjectId(dbResponse._id)).populate('userObj').exec();

        return response.status(201).json({msg : 'Cart Creation is Success', cart : cartDetailedResponse})
    }
    catch (e) {
        console.log(e);
        return response.status(500).json({msg : 'Something went wrong'});
    }
}

/**
 * @usage : Get Cart Info
 * @url : http://localhost:9000/api/carts/info
 * @method : GET
 * @params : NA
 * @access : private
 */
const getCartInfo = async (request, response) => {
    try {
        const {_id} = request.headers['user'];
        const mongoUserId = new mongoose.mongo.ObjectId(_id);
        const userObj = await UserTable.findById(mongoUserId);
        if (!userObj) {
            return response.status(400).json({msg: 'Unable to get user info'});
        }

        // fetch cart Details
        const cartDetailedResponse = await CartTable.findOne({userObj : userObj._id}).populate('userObj').exec();
        if(!cartDetailedResponse){
            return response.status(200).json({ cart : {}})
        }
        return response.status(200).json({ cart : cartDetailedResponse})

    }
    catch (e) {
        console.log(e);
        return response.status(500).json({msg : 'Something went wrong'});
    }
}

module.exports = {
    createCart,
    getCartInfo
}