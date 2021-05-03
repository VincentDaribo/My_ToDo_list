const db = require('../config/db');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const accessTokenSecret = process.env.JWT_SECRET
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.json({message:'token is not valid'}).status(403);
            }
            req.user = user;
            next();
        });
    } else {
        return res.json({message:'no token, authorization denied'}).status(401);
    }
};

module.exports = authenticateJWT