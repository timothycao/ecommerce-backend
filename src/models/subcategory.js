const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports.subcategorySchema = subcategorySchema;
module.exports.Subcategory = Subcategory;