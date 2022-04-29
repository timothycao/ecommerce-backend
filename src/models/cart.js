const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ProductVariant',
                required: true
            },
            count: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports.cartSchema = cartSchema;
module.exports.Cart = Cart;