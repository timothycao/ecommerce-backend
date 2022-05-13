const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const controller = require('../controllers/users');

router.post('/', auth, admin, controller.createUser);
router.get('/', auth, admin, controller.getUsers);
router.get('/:id', auth, admin, controller.getUser);
router.put('/:id', auth, admin, controller.updateUser);
router.delete('/:id', auth, admin, controller.deleteUser);

module.exports = router;