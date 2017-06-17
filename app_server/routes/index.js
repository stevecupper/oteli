var express = require('express');
var router = express.Router();
var ctrlHotels = require('../controllers/hotels');
var ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', ctrlHotels.homelist);
router.get('/hotel', ctrlHotels.hotelInfo);
router.get('/hotel/review/new', ctrlHotels.addReview);
/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
