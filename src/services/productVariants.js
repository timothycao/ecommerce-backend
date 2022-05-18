const { ProductVariant } = require('../models/productVariant');

const createProductVariant = async (createBody) => {
    try {
        const productVariant = await ProductVariant.create(createBody);
        return productVariant;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
};

const getProductVariants = async (query) => {
    const productVariants = await ProductVariant.find(query);
    if (!productVariants.length) throw { code: 404, message: 'No product variants found' };
    return productVariants;
};

const getProductVariant = async (id) => {
    const productVariant = await ProductVariant.findById(id);
    if (!productVariant) throw { code: 404, message: 'No product variant found with the given ID' };
    return productVariant;
};

const updateProductVariant = async (productVariant, updateBody) => {
    try {
        Object.assign(productVariant, updateBody);
        await productVariant.save();
        return productVariant;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
};

const updateProductVariantStock = async (id, number) => {
    try {        
        return ProductVariant.findByIdAndUpdate(
            id,
            { $inc: { stock: number } },
            { new: true }
        );
    } catch (error) {
        throw { code: 400, message: error.message };
    }
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