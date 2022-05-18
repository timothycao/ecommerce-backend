const pick = require('../utils/pick');
const asyncHandler = require('../utils/async');
const service = require('../services/productVariants');

const createProductVariant = asyncHandler(async (req, res) => {
    const productVariant = await service.createProductVariant(req.body);
    res.send(productVariant);
});

const getProductVariants = asyncHandler(async (req, res) => {
    const query = pick(req.query, 'color', 'size', 'price', 'stock', 'images', 'productId');
    const productVariants = await service.getProductVariants(query);
    res.send(productVariants);
});

const getProductVariant = asyncHandler(async (req, res) => {
    const productVariant = await service.getProductVariant(req.params.id);
    res.send(productVariant);
});

const updateProductVariant = asyncHandler(async (req, res) => {
    const productVariant = await service.getProductVariant(req.params.id);
    const updatedProductVariant = await service.updateProductVariant(productVariant, req.body);
    res.send(updatedProductVariant);
});

const deleteProductVariant = asyncHandler(async (req, res) => {
    const productVariant = await service.getProductVariant(req.params.id);
    const deletedProductVariant = await service.deleteProductVariant(productVariant);
    res.send(deletedProductVariant);
});

module.exports = {
    createProductVariant,
    getProductVariants,
    getProductVariant,
    updateProductVariant,
    deleteProductVariant
};