const express = require('express')
const bcrypt = require('bcryptjs');

const { Spot, SpotImage, User, ReviewImage, Review, Booking, sequelize } = require('../../db/models')
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')
const router = express.Router();
const { Sequelize } = require('sequelize');

const validateSpot = [
    check("address")
        .exists({ checkFalsy: true })
        .withMessage("Street address is required."),
    check("city").exists({ checkFalsy: true }).withMessage("City is required."),
    check("state").exists({ checkFalsy: true }).withMessage("State is required."),
    check("country")
        .exists({ checkFalsy: true })
        .withMessage("Country is required."),
    check("lat")
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Latitude is not valid."),
    check("lng")
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Longitude is not valid."),
    check("name")
        .exists({ checkFalsy: true })
        .isLength({ max: 49 }).withMessage("Name must be less than 50 letters and must not contain numbers.")
        // .matches(/^[a-zA-Z\s]+$/)
        .matches(/^[A-Za-z\s!@#$%^&*()_+={}\[\];:'"<>,.?~`|\\/-]+$/).withMessage("Name must be less than 50 letters and must not contain numbers."),
    check("description")
        .exists({ checkFalsy: true })
        .withMessage("Description is required."),
    check("price")
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required."),
    handleValidationErrors,
];
const validateSpotQuery = [
    query("page")
        .default(1)
        .isInt({ min: 1, max: 10 })
        .withMessage("Page must be greater than or equal to 1"),
    query("size")
        .default(20)
        .isInt({ min: 1, max: 20 })
        .withMessage("Size must be greater than or equal to 1"),
    query("minLat")
        .optional({ checkFalsy: true })
        .isDecimal()
        .withMessage("Minimum latitude is invalid"),
    query("maxLat")
        .optional({ checkFalsy: true })
        .isDecimal()
        .withMessage("Maximum latitude is invalid"),
    query("minLng")
        .optional({ checkFalsy: true })
        .isDecimal()
        .withMessage("Minimum longitude is invalid"),
    query("maxLng")
        .optional({ checkFalsy: true })
        .isDecimal()
        .withMessage("Maximum longitude is invalid"),
    query("minPrice")
        .optional({ checkFalsy: true })
        .isDecimal({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    query("maxPrice")
        .optional({ checkFalsy: true })
        .isDecimal({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors

]

const validateReview = [
    check("review")
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check("stars")
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
];

const validateBooking = [
    check("startDate")
        .exists({ checkFalsy: true })
        .withMessage("Invalid start date"),
    check("endDate")
        .exists({ checkFalsy: true })
        .withMessage("Invalid end date"),
    check("endDate")
        .custom((endDate, { req }) => {
            if (endDate <= req.body.startDate) {
                throw new Error("endDate cannot be on or before startDate")
            }
            return true;
        }),
    handleValidationErrors,
];

// Get all Spots
router.get('/', validateSpotQuery, async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
        req.query;

    page = parseInt(page);
    size = parseInt(size);
    const where = {};

    if (minLat && !maxLat) {
        where.lat = { [Op.gte]: minLat };
    }

    if (maxLat && !minLat) {
        where.lat = { [Op.lte]: maxLat };
    }

    if (minLat & maxLat) {
        where.lat = {
            [Op.and]: {
                [Op.gte]: minLat,
                [Op.lte]: maxLat,
            },
        };
    }

    if (minLng && !maxLng) {
        where.lng = { [Op.gte]: minLng };
    }

    if (maxLng && !minLng) {
        where.lng = { [Op.lte]: maxLng };
    }

    if (minLng & maxLng) {
        where.lng = {
            [Op.and]: {
                [Op.gte]: minLng,
                [Op.lte]: maxLng,
            },
        };
    }

    if (minPrice && !maxPrice) {
        where.price = { [Op.gte]: minPrice };
    }

    if (maxPrice && !minPrice) {
        where.price = { [Op.lte]: maxPrice };
    }

    if (minPrice & maxPrice) {
        where.price = {
            [Op.and]: {
                [Op.gte]: minPrice,
                [Op.lte]: maxPrice,
            },
        };
    }
    // let pagination = {}
    // pagination.limit = size;
    // pagination.offset = size * (page - 1);
    const allSpots = await Spot.findAll({
        where,
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt',
            [Sequelize.fn("ROUND", Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), 1), "avgRating"],
            [Sequelize.col("SpotImages.url"), "previewImage"],

        ],
        raw: true,
        include: [
            {
                model: Review,
                attributes: [],
                required: false
            },
            {
                model: SpotImage,
                as: "SpotImages",
                where: {
                    preview: true
                },
                attributes: [],
                required: false
            },
        ],
        group: ["Spot.id", "SpotImages.url"],
        // ...pagination
    });

    return res.json({
        Spots: allSpots.slice(size * (page - 1), size * page), page, size
    });
});


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const allSpots = await Spot.findAll({
        where: {
            ownerId: user.id,
        },
        attributes: {
            include: [
                [Sequelize.fn("ROUND", Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), 1), "avgRating"],
                [Sequelize.col("SpotImages.url"), "previewImage"],
            ],
        },
        raw: true,
        include: [
            {
                model: Review,
                attributes: [],
                required: false
            },
            {
                model: SpotImage,
                as: "SpotImages",
                where: {
                    preview: true
                },
                attributes: [],
                required: false
            }
        ],
        group: ["Spot.id", "SpotImages.url"]
    });


    return res.json({
        Spots: allSpots
    });
});

//Get details of a Spot from an id  
router.get("/:spotId", async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findOne({
        where: {
            id: spotId,
        },
        attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "description",
            "price",
            "createdAt",
            "updatedAt",
            [Sequelize.fn("COUNT", Sequelize.col("Reviews.id")), "numReviews"],
            [Sequelize.fn("ROUND", Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), 2), "avgStarRating"]
        ],
        include: [
            {
                model: SpotImage,
                as: "SpotImages",
                attributes: ["id", "url", "preview"],
            },
            {
                model: User,
                attributes: ["id", "firstName", "lastName"],
                as: "Owner",
            },
            {
                model: Review,
                attributes: [],
            },
        ],
        group: ["Spot.id", "SpotImages.id", "Owner.id"]
    });

    if (!spot) {
        const err = new Error("Spot Couldn't be found");
        err.status = 404;
        return next(err);
    }

    const {
        createdAt,
        updatedAt,
        id,
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        numReviews,
        avgStarRating,
        SpotImages,
        Owner
    } = spot.toJSON();
    reorderedSpots = {
        id,
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        createdAt,
        updatedAt,
        numReviews,
        avgStarRating,
        SpotImages,
        Owner
    };

    return res.json(reorderedSpots);
});

// Create spots
router.post('/', requireAuth, validateSpot, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    // if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
    //     return res.status(400).json({
    //         message: "Validation Error",
    //         statusCode: 400,
    //         errors: [{
    //             "address": "Street address is required",
    //             "city": "City is required",
    //             "state": "State is required",
    //             "country": "Country is required",
    //             "lat": "Latitude is not valid",
    //             "lng": "Longitude is not valid",
    //             "name": "Name must be less than 50 characters",
    //             "description": "Description is required",
    //             "price": "Price per day is required"
    //         }]
    //     })
    // }

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    })


    const {
        createdAt: createdAt_c,
        updatedAt: updatedAt_c,
        id: id_c,
        ownerId: ownerId_c,
        address: address_c,
        city: city_c,
        state: state_c,
        country: country_c,
        lat: lat_c,
        lng: lng_c,
        name: name_c,
        description: description_c,
        price: price_c
    } = newSpot.toJSON();
    reorderedSpots = {
        id: id_c,
        ownerId: ownerId_c,
        address: address_c,
        city: city_c,
        state: state_c,
        country: country_c,
        lat: lat_c,
        lng: lng_c,
        name: name_c,
        description: description_c,
        price: price_c,
        createdAt: createdAt_c,
        updatedAt: updatedAt_c,
    };
    return res.status(201).json(reorderedSpots);
});

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const updateSpot = await Spot.findByPk(req.params.spotId);
    const { url, preview } = req.body;
    if (updateSpot) {
        const spotObj = updateSpot.toJSON();
        if (spotObj.ownerId === req.user.id) {
            const spotImage = await SpotImage.create({
                spotId: req.params.spotId,
                url,
                preview
            });

            const spotImageObj = spotImage.toJSON();

            spotImageObj.spotId = spotImage.spotId
            spotImageObj.url = spotImage.url
            spotImageObj.preview = spotImage.preview

            delete spotImageObj.updatedAt;
            delete spotImageObj.createdAt;
            delete spotImageObj.spotId;
            return res.json(spotImageObj);
        }
        // else (spotObj.ownerId !== req.user.id)
        // return res.status(403).json({
        //     "message": "Forbidden. Sorry,you are not the owner",
        //     "statusCode": 403
        // })
    }
    else {
        res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
}
);

// Edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    // if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
    //     return res.status(400).json({
    //         message: "Validation Error",
    //         statusCode: 400,
    //         errors: [{
    //             "address": "Street address is required",
    //             "city": "City is required",
    //             "state": "State is required",
    //             "country": "Country is required",
    //             "lat": "Latitude is not valid",
    //             "lng": "Longitude is not valid",
    //             "name": "Name must be less than 50 characters",
    //             "description": "Description is required",
    //             "price": "Price per day is required"
    //         }]
    //     })
    // }
    const editSpot = await Spot.findByPk(req.params.spotId);

    if (editSpot) {
        const editObj = editSpot.toJSON()
        if (editObj.ownerId !== req.user.id) {
            return res.status(403).json({
                "message": "Forbidden. Sorry,you are not the owner",
                "statusCode": 403
            });
        } else {
            const newSpot = await editSpot.update({
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price,
            });
            const {
                createdAt: createdAt_c,
                updatedAt: updatedAt_c,
                id: id_c,
                ownerId: ownerId_c,
                address: address_c,
                city: city_c,
                state: state_c,
                country: country_c,
                lat: lat_c,
                lng: lng_c,
                name: name_c,
                description: description_c,
                price: price_c
            } = newSpot.toJSON();
            reorderedSpots = {
                id: id_c,
                ownerId: ownerId_c,
                address: address_c,
                city: city_c,
                state: state_c,
                country: country_c,
                lat: lat_c,
                lng: lng_c,
                name: name_c,
                description: description_c,
                price: price_c,
                createdAt: createdAt_c,
                updatedAt: updatedAt_c,
            };
            return res.json(reorderedSpots)
        }

    } else {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

})


// Delete a a spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const deleteSpot = await Spot.findByPk(req.params.spotId)
    if (deleteSpot) {
        const deleteObj = deleteSpot.toJSON()
        if (deleteObj.ownerId === req.user.id) {
            await deleteSpot.destroy();
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        } else {
            res.status(403);
            return res.json({
                "message": "Forbidden.Sorry,you are not the owner",
                "statusCode": 403
            })
        }
    } else {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
})

//Get all Reviews by a Spot's id URL: /api/spots/:spotId/reviews
router.get('/:spotId/reviews', async (req, res, next) => {

    const spots = await Spot.findByPk(req.params.spotId);
    if (spots) {
        const spotObj = spots.toJSON()
        const reviews = await Review.findAll({
            where: {
                spotId: spotObj.id,
            },
            include: [{
                model: User,
                // as: "Owner",
                attributes: ['id', 'firstName', 'lastName']
            }, {
                model: ReviewImage,
                // as: "spotImages",
                attributes: ['id', 'url']
            }]
        });

        return res.json({ Reviews: reviews })
    }
    else {
        return res.status(404).json({
            "message": "Spot couldn't be found",
        });
    }

});
//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const updateSpot = await Spot.findByPk(req.params.spotId)
    const { review, stars } = req.body;
    if (updateSpot) {
        const spotObj = updateSpot.toJSON();
        const spotReview = await Review.findOne({
            where: {
                userId: req.user.id,
                spotId: spotObj.id
            }
        });
        if (spotReview) {
            return res.status(403).json({
                "message": "User already has a review for this spot",
            });

        } else {

            const newReview = await Review.create({
                userId: req.user.id,
                spotId: spotObj.id,
                review,
                stars

            });
            const {
                createdAt: createdAt_c,
                updatedAt: updatedAt_c,
                id: id_c,
                userId: userId_c,
                spotId: spotId_c,
                review: review_c,
                stars: stars_c
            } = newReview.toJSON();
            reorderedReview = {
                id: id_c,
                userId: userId_c,
                spotId: spotId_c,
                review: review_c,
                stars: stars_c,
                createdAt: createdAt_c,
                updatedAt: updatedAt_c,
            };
            return res.status(201).json(reorderedReview)
        }
    }
    else {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }
}
);
//Get all Bookings for a Spot based on the Spot's id URL: /api/spots/:spotId/bookings
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spots = await Spot.findByPk(req.params.spotId);
    if (spots) {
        const spotsObj = spots.toJSON()
        if (spotsObj.ownerId === req.user.id) {
            const spotBookings = await Booking.findAll({
                where: {
                    spotId: spotsObj.id
                },
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            });

            reorderedBookings = []
            for (let el of spotBookings) {
                let {
                    createdAt: createdAt_c,
                    updatedAt: updatedAt_c,
                    id: id_c,
                    spotId: spotId_c,
                    userId: userId_c,
                    startDate: startDate_c,
                    endDate: endDate_c,
                    User: User_c
                } = el.toJSON();
                reorderedBookings.push({
                    User: User_c,
                    id: id_c,
                    spotId: spotId_c,
                    userId: userId_c,
                    startDate: startDate_c,
                    endDate: startDate_c,
                    createdAt: createdAt_c,
                    updatedAt: updatedAt_c,
                });
            }
            return res.json({ Bookings: reorderedBookings });
        } else {
            const userBookings = await Booking.findAll({
                where: {
                    spotId: spotsObj.id,
                },
                attributes: ['spotId', 'startDate', 'endDate']
            });

            return res.json({ Bookings: userBookings });
        }
    } else {
        return res.status(404).json({
            "message": "Spot couldn't be found",
        })
    }

})
//Create a Booking from a Spot based on the Spot's id URL: /api/spots/:spotId/bookings
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
    const { startDate, endDate } = req.body
    const spots = await Spot.findByPk(req.params.spotId);
    if (spots) {
        const spotsObj = spots.toJSON()
        if (spotsObj.ownerId === req.user.id) {
            return res.status(403).json({
                "message": "You are the owner",
            })
        }
        const bookings = await Booking.findAll({
            where: {
                spotId: spotsObj.id
            }
        })

        let err_flg = 0;
        let error;
        for (let i in bookings) {
            if ((startDate >= bookings[i].startDate && startDate <= bookings[i].endDate) || (bookings[i].endDate >= startDate && bookings[i].endDate <= endDate)) {
                if (err_flg === 0) {
                    err_flg = 1;
                    error = new Error("Sorry, this spot is already booked for the specified dates");
                    error.errors = {};
                    error.status = 403;
                }
                error.errors["startDate"] = "Start data conflicts with an esiting booking";
            }
            if ((endDate >= bookings[i].startDate && endDate <= bookings[i].endDate) || (bookings[i].startDate >= startDate && bookings[i].startDate <= endDate)) {
                if (err_flg === 0) {
                    err_flg = 1;
                    error = new Error("Sorry, this spot is already booked for the specified dates");
                    error.status = 403;
                    error.errors = {};
                }
                error.errors["endDate"] = "End data conflicts with an esiting booking";

            }
        }
        if (err_flg === 1) {
            throw error;
        }

        const newbooking = await Booking.create({
            spotId: spotsObj.id,
            userId: req.user.id,
            startDate: startDate,
            endDate: endDate
        })
        const {
            createdAt: createdAt_c,
            updatedAt: updatedAt_c,
            id: id_c,
            spotId: spotId_c,
            userId: userId_c,
            startDate: startDate_c,
            endDate: endDate_c
        } = newbooking.toJSON()
        reorderedBooking = {
            id: id_c,
            spotId: spotId_c,
            userId: userId_c,
            startDate: startDate_c,
            endDate: endDate_c,
            createdAt: createdAt_c,
            updatedAt: updatedAt_c
        }

        return res.status(200).json(reorderedBooking)

    }
    else {
        res.status(404).json(
            {
                "message": "Spot couldn't be found",
            }
        )
    }
});

module.exports = router;