const { Cart } = require('../models/cart');

const createCart = async (createBody) => {
    const cart = await Cart.create(createBody);
    return cart;
};

const getCarts = async () => {
    const carts = await Cart.find();
    return carts;
};

const getCart = async (id) => {
    const cart = await Cart.findById(id);
    return cart;
};

const updateCart = async (id, updateBody) => {
    const cart = await getCart(id);
    Object.assign(cart, updateBody);
    await cart.save();
    return cart;
};

const deleteCart = async (id) => {
    const cart = await getCart(id);
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