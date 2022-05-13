const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const controller = require('../controllers/productVariants');

router.post('/', auth, admin, controller.createProductVariant);
router.get('/', controller.getProductVariants);
router.get('/:id', controller.getProductVariant);
router.put('/:id', auth, admin, controller.updateProductVariant);
router.delete('/:id', auth, admin, controller.deleteProductVariant);

module.exports = router;