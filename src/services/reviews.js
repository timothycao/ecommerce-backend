const { Review } = require('../models/review');

const createReview = async (createBody) => {
    try {
        const review = await Review.create(createBody);
        return review;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
};

const getReviews = async (query) => {
    const reviews = await Review.find(query);
    if (!reviews.length) throw { code: 404, message: 'No reviews found' };
    return reviews;
};

const getReview = async (id) => {
    const review = await Review.findById(id);
    if (!review) throw { code: 404, message: 'No review found with the given ID' };
    return review;
};

const updateReview = async (review, updateBody) => {
    try {
        Object.assign(review, updateBody);
        await review.save();
        return review;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
};

const deleteReview = async (review) => {
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