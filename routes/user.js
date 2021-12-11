const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const inputSignup= require('../middleware/inputSignup')

router.post('/signup',inputSignup, userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;