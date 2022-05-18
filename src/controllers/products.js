const pick = require('../utils/pick');
const asyncHandler = require('../utils/async');
const service = require('../services/products');

const createProduct = asyncHandler(async (req, res) => {
    const product = await service.createProduct(req.body);
    res.send(product);
});

const getProducts = asyncHandler(async (req, res) => {
    const query = pick(req.query, 'name', 'description', 'categoryId', 'subcategoryId');
    const products = await service.getProducts(query);
    res.send(products);
});

const getProduct = asyncHandler(async (req, res) => {
    const product = await service.getProduct(req.params.id);
    res.send(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await service.getProduct(req.params.id);
    const updatedProduct = await service.updateProduct(product, req.body);
    res.send(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await service.getProduct(req.params.id);
    const deletedProduct = await service.deleteProduct(product);
    res.send(deletedProduct);
});

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};