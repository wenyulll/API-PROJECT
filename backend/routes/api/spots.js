const express = require('express')
const bcrypt = require('bcryptjs');

const { Spot, SpotImage, User, ReviewImage, Review, Booking, sequelize } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')
const router = express.Router();
const { Sequelize } = require('sequelize');

// Get all Spots
router.get('/', handleValidationErrors, async (req, res) => {
    const where = {};
    const allSpots = await Spot.findAll({
        where,
        attributes: {
            include: [
                [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
                [Sequelize.col("SpotImages.url"), "previewImage"],
            ],
        },
        include: [
            {
                model: Review,
                attributes: [],
                required: false
            },
            {
                model: SpotImage,
                where: {
                    preview: true
                },
                attributes: [],
                required: false
            },
        ],
        group: ["Spot.id", "spotImages.url"]
    });

    return res.json({
        Spots: allSpots
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
                [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
                [Sequelize.col("SpotImages.url"), "previewImage"],
            ],
        },
        include: [
            {
                model: Review,
                attributes: [],
                required: false
            },
            {
                model: SpotImage,
                where: {
                    preview: true
                },
                attributes: [],
                required: false
            }
        ],
        group: ["Spot.id", "spotImages.url"]
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
        attributes: {
            include: [
                [Sequelize.fn("COUNT", Sequelize.col("Reviews.id")), "numReviews"],
                [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgStarRating"]
            ],
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: Review,
                attributes: [],
            },
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"],
            },
        ],
        group: ["Spot.id", "spotImages.id", "User.id",]
    });

    if (!spot) {
        const err = new Error("Spot Couldn't be found");
        err.status = 404;
        return next(err);
    }

    return res.json(spot);
});

// Create spots
router.post('/', requireAuth, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: [{
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }]
        })
    }

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
    return res.status(201).json(newSpot);
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
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: [{
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }]
        })
    }
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
            return res.json(newSpot)
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

//Create a Review for a Spot based on the Spot's id

//Get all Bookings for a Spot based on the Spot's id URL: /api/spots/:spotId/bookings

//Create a Booking from a Spot based on the Spot's id URL: /api/spots/:spotId/bookings

//Delete a Spot Image URL: /api/spot-images/:imageId


// Add Query Filters to Get All Spots 最后一个需求

module.exports = router;