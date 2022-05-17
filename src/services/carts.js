const { Cart } = require('../models/cart');
const service = require('../services/productVariants');

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

const getCartByUserId = async (userId) => {
    const cart = await Cart.findOne({ userId });
    return cart;
};

const updateCart = async (cart, updateBody) => {
    let { items, total } = updateBody;

    if (!total) {
        total = 0;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const productVariant = await service.getProductVariant(item.productVariantId);
            total += productVariant.price * item.quantity;
        }
    }

    Object.assign(cart, { items, total });
    await cart.save();
    return cart;
};

const addToCart = async (cart, itemObj) => {
    const items = [...cart.items];
    let itemExists = false;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.productVariantId.valueOf() === itemObj.productVariantId) {
            item.quantity += itemObj.quantity;
            itemExists = true;
        }
    };

    if (!itemExists) items.push(itemObj);
    return await updateCart(cart, { items });
};

const emptyCart = async (cart) => {
    return await updateCart(cart, { items: [] });
};

const deleteCart = async (cart) => {
    await cart.remove();
    return cart;
};

module.exports = {
    createCart,
    getCarts,
    getCart,
    getCartByUserId,
    updateCart,
    addToCart,
    emptyCart,
    deleteCart
};