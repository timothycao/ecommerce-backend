const pick = require('../utils/pick');
const service = require('../services/products');

const createProduct = async (req, res) => {
    const product = await service.createProduct(req.body);
    res.send(product);
};

const getProducts = async (req, res) => {
    const query = pick(req.query, 'name', 'description', 'categoryId', 'subcategoryId');
    const products = await service.getProducts(query);
    res.send(products);
};

const getProduct = async (req, res) => {
    const product = await service.getProduct(req.params.id);
    res.send(product);
};

const updateProduct = async (req, res) => {
    const product = await service.getProduct(req.params.id);
    const updatedProduct = await service.updateProduct(product, req.body);
    res.send(updatedProduct);
};

const deleteProduct = async (req, res) => {
    const product = await service.getProduct(req.params.id);
    const deletedProduct = await service.deleteProduct(product);
    res.send(deletedProduct);
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};