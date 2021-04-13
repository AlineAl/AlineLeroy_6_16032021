const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
const emailValid = require('../middleware/valid-email.js');
const passwordValid = require('../middleware/valid-password.js');

router.post('/signup', emailValid, passwordValid, userController.signup);
router.post('/login', userController.login);

module.exports = router;