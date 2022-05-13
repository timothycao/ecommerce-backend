const { Cart } = require('../models/cart');

const createCart = async (createBody) => {
    const cart = await Cart.create(createBody);
    return cart;
};

const getCarts = async (query) => {
    const carts = await Cart.find(query);
    return carts;
};

const getCart = async (id) => {
    const cart = await Cart.findById(id);
    return cart;
};

const updateCart = async (cart, updateBody) => {
    Object.assign(cart, updateBody);
    await cart.save();
    return cart;
};

const deleteCart = async (cart) => {
    await cart.remove();
    return cart;
};

module.exports = {
    createCart,
    getCarts,
    getCart,
    updateCart,
    deleteCart
};