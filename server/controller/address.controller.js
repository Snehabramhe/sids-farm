const mongoose = require("mongoose");
const {UserTable} = require("../database/schema/user.schema");
const {AddressTable} = require("../database/schema/address.schema");

/**
 * @usage : Add New Address
 * @url : http://localhost:9000/api/addresses/
 * @method : POST
 * @params : name, email, mobile, flat, buildingName, landmark, area, city, state, country, zipcode, userObj
 * @access : private
 */
const createAddress = async (request, response) => {
    try {
         const {mobile, flat, buildingName, landmark, area, city, state, country, zipcode} = request.body;
        const {_id} = request.headers['user'];
        const mongoUserId = new mongoose.mongo.ObjectId(_id);
        const userObj = await UserTable.findById(mongoUserId);
        if (!userObj) {
            return response.status(400).json({msg: 'Unable to get user info'});
        }

        // check if the user have address already
        const addressResponse = await AddressTable.findOne({userObj: new mongoose.mongo.ObjectId(userObj._id)});
        if(addressResponse) {
            await AddressTable.findByIdAndDelete(new mongoose.mongo.ObjectId(addressResponse._id));
        }

        const address = new AddressTable({
            name : userObj.username,
            email : userObj.email,
            mobile : mobile,
            flat : flat,
            buildingName : buildingName,
            landmark : landmark,
            area : area,
            city : city,
            state : state,
            country : country,
            zipcode : zipcode,
            userObj : userObj._id
        });

        const dbResponse = await address.save();
        if(!dbResponse){
            return response.status(400).json({msg : 'Unable to create an address'});
        }
        return response.status(201).json({msg : 'Address is Created!', address : dbResponse});
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({msg : 'Something went wrong'});
    }
}

/**
 * @usage : Update Address
 * @url : http://localhost:9000/api/addresses/:addressId
 * @method : PUT
 * @params : name, email, mobile, flat, buildingName, landmark, area, city, state, country, zipcode, userObj
 * @access : private
 */
const updateAddress = async (request, response) => {
    try {
        const {addressId} = request.params;
        if(!addressId){
            return response.status(404).json({msg: 'addressId missing!'});
        }
        const mongoAddressId = new mongoose.mongo.ObjectId(addressId);

        // check if the address is existing in db
        const dbResponse = await AddressTable.findById(mongoAddressId);
        if(!dbResponse) {
            return response.status(404).json({message: 'No Address found! for the Id'});
        }

            const {mobile, flat, buildingName, landmark, area, city, state, country, zipcode} = request.body;
            const {_id} = request.headers['user'];
            const mongoUserId = new mongoose.mongo.ObjectId(_id);
            const userObj = await UserTable.findById(mongoUserId);
            if (!userObj) {
                return response.status(400).json({msg: 'Unable to get user info'});
            }
            const updateResponse = await AddressTable.findByIdAndUpdate(mongoAddressId, {
                $set : {
                    name : userObj.name,
                    email : userObj.email,
                    mobile : mobile,
                    flat : flat,
                    buildingName : buildingName,
                    landmark : landmark,
                    area : area,
                    city : city,
                    state : state,
                    country : country,
                    zipcode : zipcode,
                    userObj : userObj._id
                }
            }, {new : true})
            if(!updateResponse){
                return response.status(400).json({msg : 'Unable to Update an address'});
            }
            return response.status(200).json({msg : 'Address is Updated!', address : updateResponse});
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({msg : 'Something went wrong'});
    }
}

/**
 * @usage : Delete Address
 * @url : http://localhost:9000/api/addresses/:addressId
 * @method : DELETE
 * @params : NA
 * @access : private
 */
const deleteAddress = async (request, response) => {
    try {
        const {addressId} = request.params;
        if(!addressId){
            return response.status(404).json({msg: 'addressId missing!'});
        }
        const mongoAddressId = new mongoose.mongo.ObjectId(addressId);

        // check if the address is existing in db
        const dbResponse = await AddressTable.findById(mongoAddressId);
        if(!dbResponse) {
            return response.status(404).json({message: 'No Address found! for the Id'});
        }
        const {_id} = request.headers['user'];
        const mongoUserId = new mongoose.mongo.ObjectId(_id);
        const userObj = await UserTable.findById(mongoUserId);
        if (!userObj) {
            return response.status(400).json({msg: 'Unable to get user info'});
        }

        const deleteResponse = await AddressTable.findByIdAndDelete(mongoAddressId);
        if(!deleteResponse){
            return response.status(400).json({msg :"Unable to Delete the address"})
        }
        return response.status(200).json({msg : 'Address is Deleted!'});
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({msg : 'Something went wrong'});
    }
}


/**
 * @usage : Get an Address
 * @url : http://localhost:9000/api/addresses/me
 * @method : GET
 * @params : NA
 * @access : private
 */
const getAddress = async (request, response) => {
    try {
        const {_id} = request.headers['user'];
        const mongoUserId = new mongoose.mongo.ObjectId(_id);
        const userObj = await UserTable.findById(mongoUserId);
        if (!userObj) {
            return response.status(400).json({msg: 'Unable to get user info'});
        }

        const dbResponse = await AddressTable.findOne({userObj: userObj._id});
        if(!dbResponse){
            return response.status(400).json({msg :"Unable to Get the address"})
        }
        return response.status(200).json(dbResponse);
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({msg : 'Something went wrong'});
    }
}

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress,
    getAddress
};
