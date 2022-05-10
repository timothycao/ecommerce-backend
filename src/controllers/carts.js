const service = require('../services/carts');

const createCart = async (req, res) => {
    const cart = await service.createCart(req.body);
    res.send(cart);
};

const getCarts = async (req, res) => {
    const carts = await service.getCarts();
    res.send(carts);
};

const getCart = async (req, res) => {
    const cart = await service.getCart(req.params.id);
    res.send(cart);
};

const updateCart = async (req, res) => {
    const cart = await service.updateCart(req.params.id, req.body);
    res.send(cart);
};

const deleteCart = async (req, res) => {
    const cart = await service.deleteCart(req.params.id);
    res.send(cart);
};

module.exports = {
    createCart,
    getCarts,
    getCart,
    updateCart,
    deleteCart
};