const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const gravatar = require('gravatar');

const {UserTable} = require('../database/schema/user.schema');

/**
 * @usage : Register a User
 * @url : http://127.0.0.1:9000/api/users/register
 * @method : POST
 * @params : username, email, password
 */
const registerUser = async (request, response) => {
    try {
        // read the form data
        const {username, email, password} = request.body;

        // check if email is existing in DB
        const userObj = await UserTable.findOne({email: email});
        if (userObj) {
            return response.status(400).json({msg: 'User already exists'});
        }

        // encrypt the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // get Image Url
        const imageUrl = gravatar.url(email, {s: '200', r: 'pg', d: '404'});
        // insert into db
        const dbResponse = await new UserTable({
            username: username,
            email: email,
            password: hashedPassword,
            imageUrl: imageUrl,
        }).save();

        if (!dbResponse) {
            return response.status(400).json({msg: 'Unable to register a user'});
        }

        return response.status(201).json({
            msg: "Registered successfully",
        })

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Something went wrong"});
    }
}

/**
 * @usage : Login a User
 * @url : http://127.0.0.1:9000/api/users/login
 * @method : POST
 * @params : email, password
 */
const loginUser = async (request, response) => {
    try {
        // read form data
        const {email, password} = request.body;

        // check if email is existing
        const userObj = await UserTable.findOne({email: email});
        if (!userObj) {
            return response.status(400).json({msg: 'Invalid email or password'});
        }

        // check the password match
        const isMatch = await bcryptjs.compare(password, userObj.password);
        if (!isMatch) {
            return response.status(400).json({msg: 'Invalid email or password'});
        }

        // create the token
        const payload = {
            _id: userObj._id,
            username: userObj.username
        }
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = await jsonWebToken.sign(payload, jwtSecretKey, {expiresIn: '1d', algorithm: 'HS256'});
        if (!token) {
            return response.status(400).json({msg: 'Unable to create a token'});
        }

        // send response
        return response.status(200).json({
            msg: "Login successfully",
            token: token,
            user: userObj,
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Something went wrong"});
    }
}

/**
 * @usage : Get User Info
 * @url : http://127.0.0.1:9000/api/users/me
 * @method : GET
 * @params : NA
 */
const getUserInfo = async (request, response) => {
    const {_id} = request.headers['user'];
    const mongoUserId = new mongoose.mongo.ObjectId(_id);
    const userObj = await UserTable.findById(mongoUserId);
    if (!userObj) {
        return response.status(400).json({msg: 'Unable to get user info'});
    }
    return response.status(200).json(userObj);
}

module.exports = {
    registerUser,
    loginUser,
    getUserInfo,
}