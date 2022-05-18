const pick = require('../utils/pick');
const asyncHandler = require('../utils/async');
const service = require('../services/reviews');

const createReview = asyncHandler(async (req, res) => {
    const review = await service.createReview(req.body);
    res.send(review);
});

const getReviews = asyncHandler(async (req, res) => {
    const query = pick(req.query, 'rating', 'comment', 'userId', 'productVariantId');
    const reviews = await service.getReviews(query);
    res.send(reviews);
});

const getReview = asyncHandler(async (req, res) => {
    const review = await service.getReview(req.params.id);
    res.send(review);
});

const updateReview = asyncHandler(async (req, res) => {
    const review = await service.getReview(req.params.id);
    const updatedReview = await service.updateReview(review, req.body);
    res.send(updatedReview);
});

const deleteReview = asyncHandler(async (req, res) => {
    const review = await service.getReview(req.params.id);
    const deletedReview = await service.deleteReview(review);
    res.send(deletedReview);
});

module.exports = {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview
};