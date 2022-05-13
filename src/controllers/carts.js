const pick = require('../utils/pick');
const service = require('../services/carts');

const createCart = async (req, res) => {
    const cart = await service.createCart(req.body);
    res.send(cart);
};

const getCarts = async (req, res) => {
    const query = pick(req.query, 'products', 'total', 'userId');
    const carts = await service.getCarts(query);
    res.send(carts);
};

const getCart = async (req, res) => {
    const cart = await service.getCart(req.params.id);
    res.send(cart);
};

const updateCart = async (req, res) => {
    const cart = await service.getCart(req.params.id);
    const updatedCart = await service.updateCart(cart, req.body);
    res.send(updatedCart);
};

const deleteCart = async (req, res) => {
    const cart = await service.getCart(req.params.id);
    const deletedCart = await service.deleteCart(cart);
    res.send(deletedCart);
};

module.exports = {
    createCart,
    getCarts,
    getCart,
    updateCart,
    deleteCart
};