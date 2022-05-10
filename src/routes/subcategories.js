const express = require('express');
const router = express.Router();
const controller = require('../controllers/subcategories');

router.post('/', controller.createSubcategory);
router.get('/', controller.getSubcategories);
router.get('/:id', controller.getSubcategory);
router.put('/:id', controller.updateSubcategory);
router.delete('/:id', controller.deleteSubcategory);

module.exports = router;