const service = require('../services/products');

const createProduct = async (req, res) => {
    const product = await service.createProduct(req.body);
    res.send(product);
};

const getProducts = async (req, res) => {
    const products = await service.getProducts();
    res.send(products);
};

const getProduct = async (req, res) => {
    const product = await service.getProduct(req.params.id);
    res.send(product);
};

const updateProduct = async (req, res) => {
    const product = await service.updateProduct(req.params.id, req.body);
    res.send(product);
};

const deleteProduct = async (req, res) => {
    const product = await service.deleteProduct(req.params.id);
    res.send(product);
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};