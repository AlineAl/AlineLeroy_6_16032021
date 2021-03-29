const express = require('express');
const router = express.Router();

const sauceController = require('/Users/aline/code/AlineAl/AlineLeroy_6_16032021/api/routes/sauce.js');
const auth = require('/Users/aline/code/AlineAl/AlineLeroy_6_16032021/api/middleware/auth.js');
const multer = require('/Users/aline/code/AlineAl/AlineLeroy_6_16032021/api/middleware/multer-config.js');

router.get('/', auth, multer, (res, req) => {
  sauceController.getAllSauces
});
router.get('/:id', auth, (res, req) => {
  sauceController.getOneSauce
});
router.post('/', auth, (res, req) => {
  sauceController.createSauce
});
router.put('/:id', auth, (res, req) => {
  sauceController.modifySauce
});
router.delete('/:id', auth, (res, req) => {
  sauceController.deleteSauce
});

module.exports = router;
