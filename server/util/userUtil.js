import mongoose from "mongoose";
import {UserTable} from "../database/schema/user.schema";

const getUserInfoUtil = async (request, response) => {
    const {_id} = request.headers['user'];
    const mongoUserId = new mongoose.mongo.ObjectId(_id);
    const userObj = await UserTable.findById(mongoUserId);
    if (!userObj) {
        return response.status(400).json({msg: 'Unable to get user info'});
    }
    return userObj;
}


module.exports = {
    getUserInfoUtil
}