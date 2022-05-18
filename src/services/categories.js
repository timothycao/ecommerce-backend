const { Category } = require('../models/category');

const createCategory = async (createBody) => {
    try {
        const category = await Category.create(createBody);
        return category;    
    } catch (error) {
        throw { code: 400, message: error.message };
    }
};

const getCategories = async (query) => {
    const categories = await Category.find(query);
    if (!categories.length) throw { code: 404, message: 'No categories found' };
    return categories;
};

const getCategory = async (id) => {    
    const category = await Category.findById(id);
    if (!category) throw { code: 404, message: 'No category found with the given ID' };
    return category;
};

const updateCategory = async (category, updateBody) => {
    try {
        Object.assign(category, updateBody);
        await category.save();
        return category;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
};

const deleteCategory = async (category) => {
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