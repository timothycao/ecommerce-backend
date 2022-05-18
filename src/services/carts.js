const { Cart } = require('../models/cart');
const service = require('../services/productVariants');

const createCart = async (createBody) => {
    try {
        const cart = await Cart.create(createBody);
        return cart;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
};

const getCarts = async (query) => {
    const carts = await Cart.find(query);
    if (!carts.length) throw { code: 404, message: 'No carts found' };
    return carts;
};

const getCart = async (id) => {
    const cart = await Cart.findById(id);
    if (!cart) throw { code: 404, message: 'No cart found with the given ID' };
    return cart;
};

const getCartByUserId = async (userId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw { code: 404, message: 'No cart found with the given user ID' };
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

    try {
        Object.assign(cart, { items, total });
        await cart.save();
        return cart;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
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