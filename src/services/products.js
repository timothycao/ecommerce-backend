const { Product } = require('../models/product');

const createProduct = async (createBody) => {
    const product = await Product.create(createBody);
    return product;
};

const getProducts = async () => {
    const products = await Product.find();
    return products;
};

const getProduct = async (id) => {
    const product = await Product.findById(id);
    return product;
};

const updateProduct = async (id, updateBody) => {
    const product = await getProduct(id);
    Object.assign(product, updateBody);
    await product.save();
    return product;
};

const deleteProduct = async (id) => {
    const product = await getProduct(id);
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