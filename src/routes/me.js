const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/me');

router.get('/', auth, controller.getUser);
router.put('/', auth, controller.updateUser);

module.exports = router;