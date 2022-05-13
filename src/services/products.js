const { Product } = require('../models/product');

const createProduct = async (createBody) => {
    const product = await Product.create(createBody);
    return product;
};

const getProducts = async (query) => {
    const products = await Product.find(query);
    return products;
};

const getProduct = async (id) => {
    const product = await Product.findById(id);
    return product;
};

const updateProduct = async (product, updateBody) => {
    Object.assign(product, updateBody);
    await product.save();
    return product;
};

const deleteProduct = async (product) => {
    await product.remove();
    return product;
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};