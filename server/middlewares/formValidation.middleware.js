const {validationResult} = require("express-validator");

const formValidationMiddleware = (request, response, next) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
        return response.status(400).json({msg: populateMsg(result.array())})
    }
    next(); // must forward to next function
};

const populateMsg = (array) => {
    let textMsg = "";
    for (let elem of array) {
        textMsg += `${elem.msg} \n `;
    }
    return textMsg;
};


module.exports = {
    formValidationMiddleware
};