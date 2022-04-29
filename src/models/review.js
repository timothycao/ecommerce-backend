const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productVariantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant',
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports.reviewSchema = reviewSchema;
module.exports.Review = Review;