const pick = require('../utils/pick');
const service = require('../services/productVariants');

const createProductVariant = async (req, res) => {
    const productVariant = await service.createProductVariant(req.body);
    res.send(productVariant);
};

const getProductVariants = async (req, res) => {
    const query = pick(req.query, 'color', 'size', 'price', 'stock', 'images', 'productId');
    const productVariants = await service.getProductVariants(query);
    res.send(productVariants);
};

const getProductVariant = async (req, res) => {
    const productVariant = await service.getProductVariant(req.params.id);
    res.send(productVariant);
};

const updateProductVariant = async (req, res) => {
    const productVariant = await service.getProductVariant(req.params.id);
    const updatedProductVariant = await service.updateProductVariant(productVariant, req.body);
    res.send(updatedProductVariant);
};

const deleteProductVariant = async (req, res) => {
    const productVariant = await service.getProductVariant(req.params.id);
    const deletedProductVariant = await service.deleteProductVariant(productVariant);
    res.send(deletedProductVariant);
};

module.exports = {
    createProductVariant,
    getProductVariants,
    getProductVariant,
    updateProductVariant,
    deleteProductVariant
};