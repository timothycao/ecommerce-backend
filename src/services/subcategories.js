const { Subcategory } = require('../models/subcategory');

const createSubcategory = async (createBody) => {
    const subcategory = await Subcategory.create(createBody);
    return subcategory;
};

const getSubcategories = async () => {
    const subcategories = await Subcategory.find();
    return subcategories;
};

const getSubcategory = async (id) => {
    const subcategory = await Subcategory.findById(id);
    return subcategory;
};

const updateSubcategory = async (id, updateBody) => {
    const subcategory = await getSubcategory(id);
    Object.assign(subcategory, updateBody);
    await subcategory.save();
    return subcategory;
};

const deleteSubcategory = async (id) => {
    const subcategory = await getSubcategory(id);
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