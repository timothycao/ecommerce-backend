const service = require('../services/categories');

const createCategory = async (req, res) => {
    const category = await service.createCategory(req.body);
    res.send(category);
};

const getCategories = async (req, res) => {
    const categories = await service.getCategories();
    res.send(categories);
};

const getCategory = async (req, res) => {
    const category = await service.getCategory(req.params.id);
    res.send(category);
};

const updateCategory = async (req, res) => {
    const category = await service.updateCategory(req.params.id, req.body);
    res.send(category);
};

const deleteCategory = async (req, res) => {
    const category = await service.deleteCategory(req.params.id);
    res.send(category);
};

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
};