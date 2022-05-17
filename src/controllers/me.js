const usersService = require('../services/users');
const cartsService = require('../services/carts');
const ordersService = require('../services/orders');
const productVariantsService = require('../services/productVariants');

const getUser = async (req, res) => {
    const user = await usersService.getUser(req.user._id);
    res.send(user);
};

const updateUser = async (req, res) => {
    const { _id, __v, admin, ...updateBody } = req.body;
    const user = await usersService.getUser(req.user._id);
    const updatedUser = await usersService.updateUser(user, updateBody);
    res.send(updatedUser);
};

const getCart = async (req, res) => {
    const cart = await cartsService.getCartByUserId(req.user._id);
    res.send(cart);
};

const updateCart = async (req, res) => {
    const { _id, __v, userId, total, ...updateBody } = req.body
    const cart = await cartsService.getCartByUserId(req.user._id);
    const updatedCart = await cartsService.updateCart(cart, updateBody);
    res.send(updatedCart);
};

const addToCart = async (req, res) => {
    const cart = await cartsService.getCartByUserId(req.user._id);
    const updatedCart = await cartsService.addToCart(cart, req.body);
    res.send(updatedCart);
};

const emptyCart = async (req, res) => {
    const cart = await cartsService.getCartByUserId(req.user._id);
    const updatedCart = await cartsService.emptyCart(cart);
    res.send(updatedCart);
};

const placeOrder = async (req, res) => {
    // get user cart
    const cart = await cartsService.getCartByUserId(req.user._id);
    const { items, total, userId } = cart;
    // empty cart
    await cartsService.emptyCart(cart);
    // create order
    const order = await ordersService.createOrder({ items, total, userId });
    // decrement stock
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        await productVariantsService.updateProductVariantStock(item.productVariantId, -item.quantity);
    };
    // respond with created order
    res.send(order);
};

const getOrders = async (req, res) => {
    const orders = await ordersService.getOrders({ userId: req.user._id });
    res.send(orders);
};

module.exports = {
    getUser,
    updateUser,
    getCart,
    updateCart,
    addToCart,
    emptyCart,
    placeOrder,
    getOrders
};