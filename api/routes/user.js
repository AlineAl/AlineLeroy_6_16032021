const express = require('express');
const router = express.Router();
const userController = require('/Users/aline/code/AlineAl/AlineLeroy_6_16032021/api/controllers/user.js')

router.post('/signup', (res, req) => {
    userController.signup;
});
router.post('/login', (res, req) => {
    userController.login
});

module.exports = router;