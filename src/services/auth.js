const config = require('config');
const jwt = require('jsonwebtoken');
const service = require('./users');

const generateToken = async (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        admin: user.admin
    };
    const secret = config.get('jwt_private_key');
    const token = jwt.sign(payload, secret);
    return token;
};

const register = async (createBody) => {
    const user = await service.createUser(createBody);
    return user;
};

const login = async (email, password) => {
    const user = await service.getUserByEmail(email);
    if (!await user.checkPassword(password)) return;
    return user;
};

const logout = async () => {};

module.exports = {
    generateToken,
    register,
    login,
    logout
};