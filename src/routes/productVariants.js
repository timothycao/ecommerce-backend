const express = require('express');
const router = express.Router();
const controller = require('../controllers/productVariants');

router.post('/', controller.createProductVariant);
router.get('/', controller.getProductVariants);
router.get('/:id', controller.getProductVariant);
router.put('/:id', controller.updateProductVariant);
router.delete('/:id', controller.deleteProductVariant);

module.exports = router;