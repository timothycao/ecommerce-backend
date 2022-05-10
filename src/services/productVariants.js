const { ProductVariant } = require('../models/productVariant');

const createProductVariant = async (createBody) => {
    const productVariant = await ProductVariant.create(createBody);
    return productVariant;
};

const getProductVariants = async (query) => {
    const productVariants = await ProductVariant.find(query);
    return productVariants;
};

const getProductVariant = async (id) => {
    const productVariant = await ProductVariant.findById(id);
    return productVariant;
};

const updateProductVariant = async (id, updateBody) => {
    const productVariant = await getProductVariant(id);
    Object.assign(productVariant, updateBody);
    await productVariant.save();
    return productVariant;
};

const deleteProductVariant = async (id) => {
    const productVariant = await getProductVariant(id);
    await productVariant.remove();
    return productVariant;
};

module.exports = {
    createProductVariant,
    getProductVariants,
    getProductVariant,
    updateProductVariant,
    deleteProductVariant
};