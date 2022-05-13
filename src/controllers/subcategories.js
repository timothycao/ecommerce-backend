const pick = require('../utils/pick');
const service = require('../services/subcategories');

const createSubcategory = async (req, res) => {
    const subcategory = await service.createSubcategory(req.body);
    res.send(subcategory);
};

const getSubcategories = async (req, res) => {
    const query = pick(req.query, 'name', 'categoryId');
    const subcategories = await service.getSubcategories(query);
    res.send(subcategories);
};

const getSubcategory = async (req, res) => {
    const subcategory = await service.getSubcategory(req.params.id);
    res.send(subcategory);
};

const updateSubcategory = async (req, res) => {
    const subcategory = await service.getSubcategory(req.params.id);
    const updatedSubcategory = await service.updateSubcategory(subcategory, req.body);
    res.send(updatedSubcategory);
};

const deleteSubcategory = async (req, res) => {
    const subcategory = await service.getSubcategory(req.params.id);
    const deletedSubcategory = await service.deleteSubcategory(subcategory);
    res.send(deletedSubcategory);
};

module.exports = {
    createSubcategory,
    getSubcategories,
    getSubcategory,
    updateSubcategory,
    deleteSubcategory
};