const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        validate: {
            validator: async name => !await Category.findOne({ name }),
            message: 'Name already exists'
        }
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports.categorySchema = categorySchema;
module.exports.Category = Category;