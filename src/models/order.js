const mongoose = require('mongoose');
const { ProductVariant } = require('./productVariant');
const { User } = require('./user');

const orderSchema = mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ProductVariant',
                required: [true, 'Product Variant ID is required'],
                validate: {
                    validator: async id => !!await ProductVariant.findById(id),
                    message: 'Product Variant ID does not exist'
                }
            },
            count: {
                type: Number,
                required: [true, 'Count is required'],
                min: [0, 'Count cannot be less than 0']
            }
        }
    ],
    total: {
        type: Number,
        required: [true, 'Total is required'],
        min: [0, 'Total cannot be less than 0']
    },
    status: {
        type: String,
        enum: {
            values: ['Processing', 'Shipped', 'Delivered'],
            message: 'Status not valid'
        },
        default: 'Processing',
        required: [true, 'Status is required']
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

const Order = mongoose.model('Order', orderSchema);

module.exports.orderSchema = orderSchema;
module.exports.Order = Order;