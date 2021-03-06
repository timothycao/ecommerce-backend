const mongoose = require('mongoose');
const { ProductVariant } = require('./productVariant');
const { User } = require('./user');

const cartSchema = mongoose.Schema({
    items: [
        {
            _id: false,
            productVariantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ProductVariant',
                required: [true, 'Product Variant ID is required'],
                validate: {
                    validator: async id => !!await ProductVariant.findById(id),
                    message: 'Product Variant ID does not exist'
                }
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required'],
                min: [1, 'Quantity cannot be less than 1']
            }
        }
    ],
    total: {
        type: Number,
        required: [true, 'Total is required'],
        min: [0, 'Total cannot be less than 0']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        validate: {
            validator: async id => !!await User.findById(id),
            message: 'User ID does not exist'
        }
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports.cartSchema = cartSchema;
module.exports.Cart = Cart;