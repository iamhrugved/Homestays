var employeeController = require('../contollers/employeeController');
var express = require('express');

var router = express.Router();

router.post('/signupEmployee', employeeController.signupEmployee);
router.post('/loginEmployee', employeeController.loginEmployee);
router.post('/addPlace', employeeController.addPlace);
router.get('/hotels', employeeController.getAllHotels);
router.get("/bookings/:id", employeeController.getAllBookings);

module.exports = router;