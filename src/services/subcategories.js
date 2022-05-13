const { Subcategory } = require('../models/subcategory');

const createSubcategory = async (createBody) => {
    const subcategory = await Subcategory.create(createBody);
    return subcategory;
};

const getSubcategories = async (query) => {
    const subcategories = await Subcategory.find(query);
    return subcategories;
};

const getSubcategory = async (id) => {
    const subcategory = await Subcategory.findById(id);
    return subcategory;
};

const updateSubcategory = async (subcategory, updateBody) => {
    Object.assign(subcategory, updateBody);
    await subcategory.save();
    return subcategory;
};

const deleteSubcategory = async (subcategory) => {
    await subcategory.remove();
    return subcategory;
};

module.exports = {
    createSubcategory,
    getSubcategories,
    getSubcategory,
    updateSubcategory,
    deleteSubcategory
};