const express = require('express');
const router = express.Router();
const sauceController = require('/Users/aline/code/AlineAl/AlineLeroy_6_16032021/src/app/routes/sauce.js');

router.post('/', (res, req) => {
  sauceController.createSauce
});
router.put('/:id', (res, req) => {
  sauceController.modifySauce
});
router.delete('/:id', (res, req) => {
  sauceController.deleteSauce
});
router.get('/:id', (res, req) => {
  sauceController.getOneSauce
});
router.get('/', (res, req) => {
  sauceController.getAllSauce
});

module.exports = router;
