const { Product } = require('../models/product');

const createProduct = async (createBody) => {
    try {
        const product = await Product.create(createBody);
        return product;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
};

const getProducts = async (query) => {
    const products = await Product.find(query);
    if (!products.length) throw { code: 404, message: 'No products found' };
    return products;
};

const getProduct = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw { code: 404, message: 'No product found with the given ID' };
    return product;
};

const updateProduct = async (product, updateBody) => {
    try {        
        Object.assign(product, updateBody);
        await product.save();
        return product;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
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