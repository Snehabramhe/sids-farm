const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    flat: {type: String, required: true},
    buildingName: {type: String, required: true},
    landmark: {type: String, required: true},
    area: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    zipcode: {type: String, required: true},
    userObj: {type: mongoose.Types.ObjectId, required: true, ref: 'users'},
});

const AddressTable = mongoose.model('addresses', addressSchema);
module.exports = {
    AddressTable,
}