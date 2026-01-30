const jsonwebtoken = require('jsonwebtoken');


const tokenVerifierMiddleware = async (request, response, next) => {
    try {
        // get the token from request header
        const token = request.headers['x-access-token'];
        if (!token) {
            return response.status(401).json({msg: 'No Token Found'});
        }
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        jsonwebtoken.verify(token, jwtSecretKey, (err, decoded) => {
            if (err) {
                return response.status(400).json({msg: 'Unable to verify token'});
            }
            // add the decoded token / payload to request header
            request.headers['user'] = decoded;
            next();
        });
    } catch (error) {

    }
};

module.exports = {
    tokenVerifierMiddleware
}