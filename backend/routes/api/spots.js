const express = require('express')
const bcrypt = require('bcryptjs');

const { Spot, SpotImage, User, ReviewImage, Review, Booking, sequelize } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')
const router = express.Router();

// const avgRate = async (spotId) => {
//     const avgR = await Review.findAll({
//         where: {
//             spotId
//         },
//         raw: true,
//         next: true,
//         attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')),
//             'avgRating'
//         ]]
//     })
//     return avgR;
// }

// // Get all Spots
// router.get('/', handleValidationErrors, async (req, res) => {
//     const allSpots = await Spot.findAll({
//         raw: true,
//         attributes: [
//             'id',
//             'ownerId',
//             'address',
//             'city',
//             'state',
//             'country',
//             'lat',
//             'lng',
//             'name',
//             'description',
//             'price',
//             'createdAt',
//             'updatedAt',
//         ]
//     });
//     return res.json({
//         Spots: allSpots
//     });

// });


// // Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id;

    const spots = await Spot.findAll({
        raw: true,
        where: {
            ownerId: ownerId
        },
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
        ]
    })

    let averageRating;

    for (let i = 0; i < spots.length; i++) {
        const reviews = await Review.count({ where: { spotId: spots[i].id } })
        const sumOfStars = await Review.sum('stars', {
            where: { spotId: spots[i].id }
        })

        if (sumOfStars === null) {
            averageRating = 0
        } else {
            averageRating = (sumOfStars / reviews).toFixed(1)
        }

        spots[i].avgRating = averageRating

    }

    res.json({
        Spots: spots
    })
})

// //Get details of a Spot from an id
// router.get("/:spotId", async (req, res, next) => {
//     const spotId = req.params.spotId;
//     const spot = await Spot.findOne({
//         attributes: {
//             include: [
//                 [Sequelize.fn("COUNT", Sequelize.col("Reviews.id")), "numReviews"],
//                 [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgStarRating"],
//             ],
//         },
//         where: {
//             id: spotId,
//         },
//         include: [
//             {
//                 model: User,
//                 attributes: ["id", "firstName", "lastName"],
//                 as: "Owner",
//             },
//             {
//                 model: Review,
//                 attributes: [],
//             },
//             {
//                 model: SpotImage,
//                 as: "spotImages",
//                 attributes: ["id", "url", "preview"],
//             },
//         ],
//         group: ["Spot.id", "Owner.id", "spotImages.id"]
//     });

//     if (!spot) {
//         const err = new Error("Spot Couldn't be found");
//         err.status = 404;
//         return next(err);
//     }

//     return res.json(spot);
// });

// // create spots
// router.post('/', requireAuth, async (req, res, next) => {

//     const { address, city, state, country, lat, lng, name, description, price } = req.body;

//     if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
//         return res.status(400).json({
//             message: "Validation Error",
//             statusCode: 400,
//             errors: [{
//                 "address": "Street address is required",
//                 "city": "City is required",
//                 "state": "State is required",
//                 "country": "Country is required",
//                 "lat": "Latitude is not valid",
//                 "lng": "Longitude is not valid",
//                 "name": "Name must be less than 50 characters",
//                 "description": "Description is required",
//                 "price": "Price per day is required"
//             }]
//         })
//     }

//     const newSpot = await Spot.create({
//         //owner
//         ownerId: req.user.id,
//         address,
//         city,
//         state,
//         country,
//         lat,
//         lng,
//         name,
//         description,
//         price,
//     })
//     return res.status(201).json(newSpot);
// });

// // edit a spot
// router.put("/:id",
//     // [
//     //     ...requireAuth,
//     //     checkPermission([1, 2]),
//     //     getEntity("spot", true),
//     //     checkSpotOwnership,
//     // ],
//     async (req, res, next) => {
//         const { address, city, state, country, lat, lng, name, descripton, price } =
//             req.body;

//         const updatedSpot = await req.entity.update({
//             address,
//             city,
//             state,
//             country,
//             lat,
//             lng,
//             name,
//             descripton,
//             price,
//         });

//         return res.json(updatedSpot);
//     }
// );

// //delete a spot
// router.delete(
//     "/:id",
//     // [
//     //     ...requireAuth,
//     //     checkPermission([1, 2]),
//     //     getEntity("spot", true),
//     //     checkSpotOwnership,
//     // ],
//     async (req, res, next) => {
//         await req.entity.destroy();

//         res.status(200).json({
//             message: "Successfully deleted spot.",
//         });
//     }
// );


module.exports = router;