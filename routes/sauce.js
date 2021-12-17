const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config');
const validateInput = require('../middleware/ValidateInput');

router.post('/',auth, multer, validateInput, sauceCtrl.createSauce);
router.get('/',auth, sauceCtrl.getAllSauces);
router.get('/:id',auth, sauceCtrl.getOneSauce);
router.put('/:id',auth, multer, validateInput, sauceCtrl.modifySauce);
router.delete('/:id',auth, sauceCtrl.deleteSauce);
router.post('/:id/like',auth, sauceCtrl.likeSauce);

module.exports = router;

