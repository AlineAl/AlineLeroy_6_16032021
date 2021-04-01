const express = require('express');
const router = express.Router();
const userController = require('/Users/aline/code/AlineAl/AlineLeroy_6_16032021/api/controllers/user.js')

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;