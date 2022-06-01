const mongoose = require('mongoose');
const { Category } = require('./category');
const { Subcategory } = require('./subcategory');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        
        validate: {
            validator: async function (name) {
                const user = await this.constructor.findOne({ name });
                if (user) {
                    if (this.id === user.id) return true;
                    return false;
                }
                return true;
            },
            message: 'Name already exists'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category ID is required'],
        validate: {
            validator: async id => !!await Category.findById(id),
            message: 'Category ID does not exist'
        }
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: [true, 'Subcategory ID is required'],
        validate: {
            validator: async id => !!await Subcategory.findById(id),
            message: 'Subcategory ID does not exist'
        }
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports.productSchema = productSchema;
module.exports.Product = Product;