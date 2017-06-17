var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels');
var ctrlReviews = require('../controllers/reviews');

// hotels
router.get('/hotels', ctrlHotels.hotelsListByDistance);
router.post('/hotels', ctrlHotels.hotelsCreate);
router.get('/hotels/:hotelid', ctrlHotels.hotelsReadOne);
router.put('/hotels/:hotelid', ctrlHotels.hotelsUpdateOne);
router.delete('/hotels/:hotelid', ctrlHotels.hotelsDeleteOne);

// reviews
router.post('/hotels/:hotelid/reviews', ctrlReviews.reviewsCreate);
router.get('/hotels/:hotelid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/hotels/:hotelid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/hotels/:hotelid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;