const mongoose = require('mongoose');
const { Category } = require('./category');

const subcategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category ID is required'],
        validate: {
            validator: async id => !!await Category.findById(id),
            message: 'Category ID does not exist'
        }
    }
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports.subcategorySchema = subcategorySchema;
module.exports.Subcategory = Subcategory;