const { Subcategory } = require('../models/subcategory');

const createSubcategory = async (createBody) => {
    try {        
        const subcategory = await Subcategory.create(createBody);
        return subcategory;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
};

const getSubcategories = async (query) => {
    const subcategories = await Subcategory.find(query);
    if (!subcategories.length) throw { code: 404, message: 'No subcategories found' };
    return subcategories;
};

const getSubcategory = async (id) => {
    const subcategory = await Subcategory.findById(id);
    if (!subcategory) throw { code: 404, message: 'No subcategory found with the given ID' };
    return subcategory;
};

const updateSubcategory = async (subcategory, updateBody) => {
    try {        
        Object.assign(subcategory, updateBody);
        await subcategory.save();
        return subcategory;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
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