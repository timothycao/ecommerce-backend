const { Category } = require('../models/category');

const createCategory = async (createBody) => {
    const category = await Category.create(createBody);
    return category;
};

const getCategories = async (query) => {
    const categories = await Category.find(query);
    return categories;
};

const getCategory = async (id) => {
    const category = await Category.findById(id);
    return category;
};

const updateCategory = async (id, updateBody) => {
    const category = await getCategory(id);
    Object.assign(category, updateBody);
    await category.save();
    return category;
};

const deleteCategory = async (id) => {
    const category = await getCategory(id);
    await category.remove();
    return category;
};

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
};