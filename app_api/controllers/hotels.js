var mongoose = require('mongoose');
var Loc = mongoose.model('hotels');

module.exports.hotelsCreate = function(req, res) {
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1,
        }, {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2,
        }]
    }, function(err, hotel) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, hotel);
        }
    });
};


module.exports.hotelsListByDistance = function(req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical: true,
        maxDistance: theEarth.getRadsFromDistance(20),
        num: 10
    };
    if (!lng || !lat) {
        sendJsonResponse(res, 404, {
            "message": "lng and lat query parameters are required"
        });
        return;
    }
    Loc.geoNear(point, geoOptions, function(err, results, stats) {
        var hotels = [];
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            results.forEach(function(doc) {
                hotels.push({
                    distance: theEarth.getDistanceFromRads(doc.dis),
                    name: doc.obj.name,
                    address: doc.obj.address,
                    rating: doc.obj.rating,
                    facilities: doc.obj.facilities,
                    _id: doc.obj._id
                });
            });
            sendJsonResponse(res, 200, hotels);
        }
    });
};

module.exports.hotelsReadOne = function(req, res) {
    if (req.params && req.params.hotelid) {
        Loc
            .findById(req.params.hotelid)
            .exec(function(err, hotel) {
                if (!hotel) {
                    sendJsonResponse(res, 404, {
                        "message": "hotelid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, hotel);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No hotelid in request"
        });
    }
};
module.exports.hotelsUpdateOne = function(req, res) {
    if (!req.params.hotelid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, hotelid is required"
        });
        return;
    }
    Loc
        .findById(req.params.hotelid)
        .select('-reviews -rating')
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
                hotel.name = req.body.name;
                hotel.address = req.body.address;
                hotel.facilities = req.body.facilities.split(",");
                hotel.coords = [parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ];
                hotel.openingTimes = [{
                    days: req.body.days1,
                    opening: req.body.opening1,
                    closing: req.body.closing1,
                    closed: req.body.closed1,
                }, {
                    days: req.body.days2,
                    opening: req.body.opening2,
                    closing: req.body.closing2,
                    closed: req.body.closed2,
                }];
                hotel.save(function(err, hotel) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, hotel);
                    }
                });
            }
        );
};
module.exports.hotelsDeleteOne = function(req, res) {
    var hotelid = req.params.hotelid;
    if (hotelid) {
        Loc
            .findByIdAndRemove(hotelid)
            .exec(
                function(err, hotel) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No hotelid"
        });
    }
};

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var theEarth = (function() {
    var earthRadius = 6371; // rayon de la terre en km
    var getDistanceFromRads = function(rads) {
        return parseFloat(rads * earthRadius);
    };
    var getRadsFromDistance = function(distance) {
        return parseFloat(distance / earthRadius);
    };
    return {
        getDistanceFromRads: getDistanceFromRads,
        getRadsFromDistance: getRadsFromDistance
    };
})();


var requestOptions = {
    url: "http://yourapi.com/api/path",
    method: "GET",
    json: {},
    qs: {
        offset: 20
    }
};
request(requestOptions, function(err, response, body) {
    if (err) {
        console.log(err);
    } else if (response.statusCode === 200) {
        console.log(body);
    } else {
        console.log(response.statusCode);
    }
});