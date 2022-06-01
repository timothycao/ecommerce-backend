const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    const token = req.header('X-Auth-Token');
    if (!token) throw { code: 401, message: 'Token is required for access' };
    try {
        const payload = jwt.verify(token, config.get('jwt_private_key'));
        req.user = payload;
        next();
    } catch (error) {
        throw { code: 401, message: 'Token is invalid' };
    }
};

module.exports = auth;