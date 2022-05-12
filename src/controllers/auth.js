const service = require('../services/auth');

const register = async (req, res) => {
    const user = await service.register(req.body);
    const token = await service.generateToken(user);
    res.header('X-Auth-Token', token).send(user);
};

const login = async (req, res) => {
    const user = await service.login(req.body.email, req.body.password);
    const token = await service.generateToken(user);
    res.header('X-Auth-Token', token).send(user);
};

const logout = async (req, res) => {};

module.exports = {
    register,
    login,
    logout
};