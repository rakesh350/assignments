// Middleware for handling auth
const jwt = require('jsonwebtoken'); 
const { JWT_SECRET } = require('../config');
const { Admin } = require('../db');

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const authHeader = req.headers.authorization;
    const word = authHeader.split(' ');
    const jwt_token = word[1];
    try { 
        const decodedJwt = jwt.verify(jwt_token, JWT_SECRET);
        console.log(decodedJwt);
        if (decodedJwt.username) {
            const validUser = await Admin.findOne({ username: decodedJwt.username });
            if(!validUser){
                return res.status(403).json({ message : "Invalid User"});
            } else{
                req.userData = decodedJwt;
                next();
            }
        }
        else res.status(403).json({ message: "Invalid token" });
    } catch (error) {
        res.json({ message: 'Missing or invalid authentication' })
    }
    next();
}
module.exports = adminMiddleware;