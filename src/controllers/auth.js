const authService = require('../services/auth');
const cartsService = require('../services/carts');

const register = async (req, res) => {
    const user = await authService.register(req.body);
    const token = await authService.generateToken(user);
    const cart = await cartsService.createCart({ userId: user._id, total: 0 });
    res.header('X-Auth-Token', token).send(user);
};

const login = async (req, res) => {
    const user = await authService.login(req.body.email, req.body.password);
    const token = await authService.generateToken(user);
    res.header('X-Auth-Token', token).send(user);
};

const logout = async (req, res) => {};

module.exports = {
    register,
    login,
    logout
};