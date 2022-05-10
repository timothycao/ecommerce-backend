const { Review } = require('../models/review');

const createReview = async (createBody) => {
    const review = await Review.create(createBody);
    return review;
};

const getReviews = async (query) => {
    const reviews = await Review.find(query);
    return reviews;
};

const getReview = async (id) => {
    const review = await Review.findById(id);
    return review;
};

const updateReview = async (id, updateBody) => {
    const review = await getReview(id);
    Object.assign(review, updateBody);
    await review.save();
    return review;
};

const deleteReview = async (id) => {
    const review = await getReview(id);
    await review.remove();
    return review;
};

module.exports = {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview
};