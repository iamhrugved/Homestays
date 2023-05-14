var custController = require('../contollers/custController');

var express = require('express');
var router = express.Router();

router.post('/signupCustomer', custController.signupCustomer);
router.post('/loginCustomer', custController.loginCustomer);
module.exports = router;