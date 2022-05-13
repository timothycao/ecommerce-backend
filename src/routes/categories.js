const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const controller = require('../controllers/categories');

router.post('/', auth, admin, controller.createCategory);
router.get('/', controller.getCategories);
router.get('/:id', controller.getCategory);
router.put('/:id', auth, admin, controller.updateCategory);
router.delete('/:id', auth, admin, controller.deleteCategory);

module.exports = router;