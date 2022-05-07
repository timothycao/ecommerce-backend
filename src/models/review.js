const mongoose = require('mongoose');
const { User } = require('./user');
const { ProductVariant } = require('./productVariant');

const reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating cannot be less than 1'],
        max: [5, 'Rating cannot be more than 5']
    },
    comment: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        validate: {
            validator: async id => !!await User.findById(id),
            message: 'User ID does not exist'
        }
    },
    productVariantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant',
        required: [true, 'Product Variant ID is required'],
        validate: {
            validator: async id => !!await ProductVariant.findById(id),
            message: 'Product Variant ID does not exist'
        }
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports.reviewSchema = reviewSchema;
module.exports.Review = Review;