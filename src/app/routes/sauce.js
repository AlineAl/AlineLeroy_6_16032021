const express = require('express');
const router = express.Router();
const sauceController = require('/Users/aline/code/AlineAl/AlineLeroy_6_16032021/src/app/routes/sauce.js');

router.get('/', (res, req) => {
  sauceController.getAllSauces
});
router.get('/:id', (res, req) => {
  sauceController.getOneSauce
});
router.post('/', (res, req) => {
  sauceController.createSauce
});
router.put('/:id', (res, req) => {
  sauceController.modifySauce
});
router.delete('/:id', (res, req) => {
  sauceController.deleteSauce
});

module.exports = router;
