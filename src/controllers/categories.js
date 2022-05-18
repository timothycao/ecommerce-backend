const pick = require('../utils/pick');
const asyncHandler = require('../utils/async');
const service = require('../services/categories');

const createCategory = asyncHandler(async (req, res) => {
    const category = await service.createCategory(req.body);
    res.send(category);
});

const getCategories = asyncHandler(async (req, res) => {
    const query = pick(req.query, 'name');
    const categories = await service.getCategories(query);
    res.send(categories);
});

const getCategory = asyncHandler(async (req, res) => {
    const category = await service.getCategory(req.params.id);
    res.send(category);
});

const updateCategory = asyncHandler(async (req, res) => {
    const category = await service.getCategory(req.params.id);
    const updatedCategory = await service.updateCategory(category, req.body);
    res.send(updatedCategory);
});

const deleteCategory = asyncHandler(async (req, res) => {
    const category = await service.getCategory(req.params.id);
    const deletedCategory = await service.deleteCategory(category);
    res.send(deletedCategory);
});

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
};