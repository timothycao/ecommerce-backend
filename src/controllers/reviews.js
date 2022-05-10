const pick = require('../utils/pick');
const service = require('../services/reviews');

const createReview = async (req, res) => {
    const review = await service.createReview(req.body);
    res.send(review);
};

const getReviews = async (req, res) => {
    const query = pick(req.query, 'rating', 'comment', 'userId', 'productVariantId');
    const reviews = await service.getReviews(query);
    res.send(reviews);
};

const getReview = async (req, res) => {
    const review = await service.getReview(req.params.id);
    res.send(review);
};

const updateReview = async (req, res) => {
    const review = await service.updateReview(req.params.id, req.body);
    res.send(review);
};

const deleteReview = async (req, res) => {
    const review = await service.deleteReview(req.params.id);
    res.send(review);
};

module.exports = {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview
};