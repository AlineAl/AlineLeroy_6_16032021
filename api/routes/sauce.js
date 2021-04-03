const express = require('express');
const router = express.Router();

const sauceController = require('../controllers/sauce.js');
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');

router.get('/', auth, sauceController.getAllSauce);
router.get('/:id', auth, sauceController.getOneSauce);
router.post('/', auth, multer, sauceController.createSauce);
router.put('/:id', auth, multer, sauceController.modifySauce);
router.delete('/:id', auth, sauceController.deleteSauce);

module.exports = router;
