const asyncHandler = require('../utils/async');
const usersService = require('../services/users');
const cartsService = require('../services/carts');
const ordersService = require('../services/orders');
const productVariantsService = require('../services/productVariants');
const reviewsService = require('../services/reviews');

const getUser = asyncHandler(async (req, res) => {
    const user = await usersService.getUser(req.user._id);
    res.send(user);
});

const updateUser = asyncHandler(async (req, res) => {
    const { _id, __v, admin, ...updateBody } = req.body;
    const user = await usersService.getUser(req.user._id);
    const updatedUser = await usersService.updateUser(user, updateBody);
    res.send(updatedUser);
});

const getCart = asyncHandler(async (req, res) => {
    const cart = await cartsService.getCartByUserId(req.user._id);
    res.send(cart);
});

const updateCart = asyncHandler(async (req, res) => {
    const { _id, __v, userId, total, ...updateBody } = req.body
    const cart = await cartsService.getCartByUserId(req.user._id);
    const updatedCart = await cartsService.updateCart(cart, updateBody);
    res.send(updatedCart);
});

const addToCart = asyncHandler(async (req, res) => {
    const cart = await cartsService.getCartByUserId(req.user._id);
    const updatedCart = await cartsService.addToCart(cart, req.body);
    res.send(updatedCart);
});

const emptyCart = asyncHandler(async (req, res) => {
    const cart = await cartsService.getCartByUserId(req.user._id);
    const updatedCart = await cartsService.emptyCart(cart);
    res.send(updatedCart);
});

const placeOrder = asyncHandler(async (req, res) => {
    // get user cart
    const cart = await cartsService.getCartByUserId(req.user._id);
    const { items, total, userId } = cart;
    if (items.length === 0) throw { code: 403, message: 'You have no items in your cart for purchase'};
    // decrement stock
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        await productVariantsService.updateProductVariantStock(item.productVariantId, -item.quantity);
    };
    // create order
    const order = await ordersService.createOrder({ items, total, userId });
    // empty cart
    await cartsService.emptyCart(cart);
    // respond with created order
    res.send(order);
});

const getOrders = asyncHandler(async (req, res) => {
    const orders = await ordersService.getOrders({ userId: req.user._id });
    res.send(orders);
});

const createReview = asyncHandler(async (req, res) => {
    const { rating, comment, productVariantId } = req.body;
    // check if product variant has been purchased
    const orders = await ordersService.getOrders({ userId: req.user._id });
    let purchased = false;
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        for (let j = 0; j < order.items.length; j++) {
            const item = order.items[j];
            if (item.productVariantId.valueOf() === productVariantId) purchased = true;
        }
    };
    if (!purchased) throw { code: 403, message: 'You have not purchased this product variant' };
    // check if review already exists
    const reviews = await reviewsService.getReviews({ userId: req.user._id });
    let reviewed = false;
    for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];
        if (review.productVariantId.valueOf() === productVariantId) reviewed = true;
    };
    if (reviewed) throw { code: 403, message: 'You have already made a review for this product variant' };
    // create review
    const review = await reviewsService.createReview({ rating, comment, userId: req.user._id, productVariantId });
    // respond with created review
    res.send(review);
});

const getReviews = asyncHandler(async (req, res) => {
    const reviews = await reviewsService.getReviews({ userId: req.user._id });
    res.send(reviews);
});

const updateReview = asyncHandler(async (req, res) => {
    // check if review belongs to user
    const review = await reviewsService.getReview(req.params.id);
    if (req.user._id !== review.userId.valueOf()) throw { code: 401, message: 'You are not authorized to update this review' };
    // update review
    const { _id, __v, userId, productVariantId, ...updateBody } = req.body;
    const updatedReview = await reviewsService.updateReview(review, updateBody);
    // respond with updated review
    res.send(updatedReview);
});

const deleteReview = asyncHandler(async (req, res) => {
    // check if review belongs to user
    const review = await reviewsService.getReview(req.params.id);
    if (req.user._id !== review.userId.valueOf()) throw { code: 401, message: 'You are not authorized to delete this review' };
    // delete review
    const deletedReview = await reviewsService.deleteReview(review);
    // respond with deleted review
    res.send(deletedReview);
});

module.exports = {
    getUser,
    updateUser,
    getCart,
    updateCart,
    addToCart,
    emptyCart,
    placeOrder,
    getOrders,
    createReview,
    getReviews,
    updateReview,
    deleteReview
};