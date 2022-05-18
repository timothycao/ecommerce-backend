const pick = require('../utils/pick');
const asyncHandler = require('../utils/async');
const service = require('../services/carts');

const createCart = asyncHandler(async (req, res) => {
    const cart = await service.createCart(req.body);
    res.send(cart);
});

const getCarts = asyncHandler(async (req, res) => {
    const query = pick(req.query, 'items', 'total', 'userId');
    const carts = await service.getCarts(query);
    res.send(carts);
});

const getCart = asyncHandler(async (req, res) => {
    const cart = await service.getCart(req.params.id);
    res.send(cart);
});

const updateCart = asyncHandler(async (req, res) => {
    const cart = await service.getCart(req.params.id);
    const updatedCart = await service.updateCart(cart, req.body);
    res.send(updatedCart);
});

const deleteCart = asyncHandler(async (req, res) => {
    const cart = await service.getCart(req.params.id);
    const deletedCart = await service.deleteCart(cart);
    res.send(deletedCart);
});

module.exports = {
    createCart,
    getCarts,
    getCart,
    updateCart,
    deleteCart
};