const pick = require('../utils/pick');
const asyncHandler = require('../utils/async');
const service = require('../services/subcategories');

const createSubcategory = asyncHandler(async (req, res) => {
    const subcategory = await service.createSubcategory(req.body);
    res.send(subcategory);
});

const getSubcategories = asyncHandler(async (req, res) => {
    const query = pick(req.query, 'name', 'categoryId');
    const subcategories = await service.getSubcategories(query);
    res.send(subcategories);
});

const getSubcategory = asyncHandler(async (req, res) => {
    const subcategory = await service.getSubcategory(req.params.id);
    res.send(subcategory);
});

const updateSubcategory = asyncHandler(async (req, res) => {
    const subcategory = await service.getSubcategory(req.params.id);
    const updatedSubcategory = await service.updateSubcategory(subcategory, req.body);
    res.send(updatedSubcategory);
});

const deleteSubcategory = asyncHandler(async (req, res) => {
    const subcategory = await service.getSubcategory(req.params.id);
    const deletedSubcategory = await service.deleteSubcategory(subcategory);
    res.send(deletedSubcategory);
});

module.exports = {
    createSubcategory,
    getSubcategories,
    getSubcategory,
    updateSubcategory,
    deleteSubcategory
};