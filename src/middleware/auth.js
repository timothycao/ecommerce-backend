const jwt = require('jsonwebtoken');
const config = require('config');

const auth = async (req, res, next) => {
    const token = req.header('X-Auth-Token');
    if (!token) return res.status(401).send('Token is required for access');
    try {
        const payload = await jwt.verify(token, config.get('jwt_private_key'));
        req.user = payload;
        next();
    } catch (error) {
        res.status(400).send('Token is invalid');
    }
};

module.exports = auth;