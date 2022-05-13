const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const controller = require('../controllers/subcategories');

router.post('/', auth, admin, controller.createSubcategory);
router.get('/', controller.getSubcategories);
router.get('/:id', controller.getSubcategory);
router.put('/:id', auth, admin, controller.updateSubcategory);
router.delete('/:id', auth, admin, controller.deleteSubcategory);

module.exports = router;