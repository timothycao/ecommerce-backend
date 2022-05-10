const service = require('../services/subcategories');

const createSubcategory = async (req, res) => {
    const subcategory = await service.createSubcategory(req.body);
    res.send(subcategory);
};

const getSubcategories = async (req, res) => {
    const subcategories = await service.getSubcategories();
    res.send(subcategories);
};

const getSubcategory = async (req, res) => {
    const subcategory = await service.getSubcategory(req.params.id);
    res.send(subcategory);
};

const updateSubcategory = async (req, res) => {
    const subcategory = await service.updateSubcategory(req.params.id, req.body);
    res.send(subcategory);
};

const deleteSubcategory = async (req, res) => {
    const subcategory = await service.deleteSubcategory(req.params.id);
    res.send(subcategory);
};

module.exports = {
    createSubcategory,
    getSubcategories,
    getSubcategory,
    updateSubcategory,
    deleteSubcategory
};