const mongoose = require('mongoose');
const { Product } = require('./product');

const productVariantSchema = mongoose.Schema({
    color: {
        type: String,
        required: [true, 'Color is required']
    },
    size: {
        type: String,
        required: [true, 'Size is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be less than 0']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: [0, 'Stock cannot be less than 0']
    },
    images: [
        {
            type: String,
            required: [true, 'Images are required']
        }
    ],
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product ID is required'],
        validate: {
            validator: async id => !!await Product.findById(id),
            message: 'Product ID does not exist'
        }
    }
});

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

module.exports.productVariantSchema = productVariantSchema;
module.exports.ProductVariant = ProductVariant;