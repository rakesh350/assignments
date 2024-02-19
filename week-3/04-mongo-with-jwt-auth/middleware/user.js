const jwt = require('jsonwebtoken');
const { User } = require('../db');
const { JWT_SECRET } = require('../config');

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const authToken = req.headers.authorization;
    const authWord = authToken.split(' ');    
    const jwtToken = authWord[1];
    console.log(` Token : ${jwtToken} - ${JWT_SECRET}`);
    try {
        const decodedVal = jwt.verify(jwtToken, JWT_SECRET);
        console.log(decodedVal);
        if(!decodedVal.username) {
            return res.status(403).send({message: "Invalid token"});
        }
        // Check if User exists
        const userExist = await User.findOne({ username: decodedVal.username});
        if(userExist) {
            req.user = userExist;
            next();
        }
    } catch (error) {
        res.status(403).json({ message: `Invalid token : ${error}`});
    }

}

module.exports = userMiddleware;