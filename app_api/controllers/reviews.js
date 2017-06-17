var mongoose = require('mongoose');
var Loc = mongoose.model('hotels');

module.exports.reviewsCreate = function(req, res) {
    var hotelid = req.params.hotelid;
    if (hotelid) {
        Loc
            .findById(hotelid)
            .select('reviews')
            .exec(
                function(err, hotel) {
                    if (err) {
                        sendJsonResponse(res, 400, err);
                    } else {
                        doAddReview(req, res, hotel);
                    }
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, hotelid required"
        });
    }
};

module.exports.reviewsReadOne = function(req, res) {
    if (req.params && req.params.hotelid && req.params.reviewid) {
        Loc
            .findById(req.params.hotelid)
            .select('name reviews')
            .exec(function(err, hotel) {
                var response, review;
                if (!hotel) {
                    sendJsonResponse(res, 404, {
                        "message": "hotelid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                if (hotel.reviews && hotel.reviews.length > 0) {
                    review = hotel.reviews.id(req.params.reviewid);
                    if (!review) {
                        sendJsonResponse(res, 404, {
                            "message": "reviewid not found"
                        });
                    } else {
                        response = {
                            hotel: {
                                name: hotel.name,
                                id: req.params.hotelid
                            },
                            review: review
                        };
                        sendJsonResponse(res, 200, response);
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No reviews found"
                    });
                }
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, hotelid and reviewid are both required"
        });
    }
};
module.exports.reviewsUpdateOne = function(req, res) {
    if (!req.params.hotelid || !req.params.reviewid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, hotelid and reviewid are both required"
        });
        return;
    }
    Loc
        .findById(req.params.hotelid)
        .select('reviews')
        .exec(
            function(err, hotel) {
                var thisReview;
                if (!hotel) {
                    sendJsonResponse(res, 404, {
                        "message": "hotelid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                if (hotel.reviews && hotel.reviews.length > 0) {
                    thisReview = hotel.reviews.id(req.params.reviewid);
                    if (!thisReview) {
                        sendJsonResponse(res, 404, {
                            "message": "reviewid not found"
                        });
                    } else {
                        thisReview.author = req.body.author;
                        thisReview.rating = req.body.rating;
                        thisReview.reviewText = req.body.reviewText;
                        hotel.save(function(err, hotel) {
                            if (err) {
                                sendJsonResponse(res, 404, err);
                            } else {
                                updateAverageRating(hotel._id);
                                sendJsonResponse(res, 200, thisReview);
                            }
                        });
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No review to update"
                    });
                }
            }
        );
};
module.exports.reviewsDeleteOne = function(req, res) {
    if (!req.params.hotelid || !req.params.reviewid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, hotelid and reviewid are both required"
        });
        return;
    }
    Loc
        .findById(req.params.hotelid)
        .select('reviews')
        .exec(
            function(err, hotel) {
                if (!hotel) {
                    sendJsonResponse(res, 404, {
                        "message": "hotelid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                if (hotel.reviews && hotel.reviews.length > 0) {
                    if (!hotel.reviews.id(req.params.reviewid)) {
                        sendJsonResponse(res, 404, {
                            "message": "reviewid not found"
                        });
                    } else {
                        hotel.reviews.id(req.params.reviewid).remove();
                        hotel.save(function(err) {
                            if (err) {
                                sendJsonResponse(res, 404, err);
                            } else {
                                updateAverageRating(hotel._id);
                                sendJsonResponse(res, 204, null);
                            }
                        });
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No review to delete"
                    });
                }
            }
        );
};

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var doSetAverageRating = function(hotel) {
    var i, reviewCount, ratingAverage, ratingTotal;
    if (hotel.reviews && hotel.reviews.length > 0) {
        reviewCount = hotel.reviews.length;
        ratingTotal = 0;
        for (i = 0; i < reviewCount; i++) {
            ratingTotal = ratingTotal + hotel.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal / reviewCount, 10);
        hotel.rating = ratingAverage;
        hotel.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Average rating updated to", ratingAverage);
            }
        });
    }
};

var updateAverageRating = function(hotelid) {
    Loc
        .findById(hotelid)
        .select('rating reviews')
        .exec(
            function(err, hotel) {
                if (!err) {
                    doSetAverageRating(hotel);
                }
            });
};

var doAddReview = function(req, res, hotel) {
    if (!hotel) {
        sendJsonResponse(res, 404, {
            "message": "hotelid not found"
        });
    } else {
        hotel.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        hotel.save(function(err, hotel) {
            var thisReview;
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                updateAverageRating(hotel._id);
                thisReview = hotel.reviews[hotel.reviews.length - 1];
                sendJsonResponse(res, 201, thisReview);
            }
        });
    }
};