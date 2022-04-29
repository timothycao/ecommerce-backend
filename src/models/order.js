const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
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
    status: {
        type: String,
        enum: [
            'Processing',
            'Shipped',
            'Delivered'
        ],
        default: 'Processing',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports.orderSchema = orderSchema;
module.exports.Order = Order;