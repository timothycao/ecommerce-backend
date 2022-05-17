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

const updateProductVariant = async (productVariant, updateBody) => {
    Object.assign(productVariant, updateBody);
    await productVariant.save();
    return productVariant;
};

const updateProductVariantStock = async (id, number) => {
    return ProductVariant.findByIdAndUpdate(
        id,
        { $inc: { stock: number } },
        { new: true }
    );
};

const deleteProductVariant = async (productVariant) => {
    await productVariant.remove();
    return productVariant;
};

module.exports = {
    createProductVariant,
    getProductVariants,
    getProductVariant,
    updateProductVariant,
    updateProductVariantStock,
    deleteProductVariant
};