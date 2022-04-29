const mongoose = require('mongoose');

const productVariantSchema = mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

module.exports.productVariantSchema = productVariantSchema;
module.exports.ProductVariant = ProductVariant;