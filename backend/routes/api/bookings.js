const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { Spot, SpotImage, User, ReviewImage, Review, Booking, sequelize } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')

const { Sequelize } = require('sequelize');

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
                throw new Error("endDate cannot come before startDate")
            }
            return true;
        }),
    handleValidationErrors,
];

//Get all of the Current User's Bookings
// router.get('/current', requireAuth, async (req, res, next) => {
//     const userBookings = await Booking.findAll({
//         where: {
//             userId: req.user.id
//         },
//         raw: true
//     });

//     for (let i = 0; i < userBookings.length; i++) {
//         const booking = userBookings[i];
//         const spot = await Spot.findOne({
//             where: { id: booking.spotId },
//             attributes: {
//                 exclude: ['description', 'createdAt', 'updatedAt']
//             },
//             raw: true
//         });

//         const spotPreviews = await SpotImage.findAll({ where: { spotId: spot.id }, raw: true });
//         spotPreviews.forEach(image => {
//             if (image.preview === true || image.preview === 1) spot.previewImage = image.url;
//         });
//         if (!spot.previewImage) spot.previewImage = null;

//         booking.Spot = spot;
//     }

//     res.json({ Bookings: userBookings });
// });
router.get('/current', requireAuth, async (req, res, next) => {
    const userBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        raw: true
    });

    for (let i = 0; i < userBookings.length; i++) {
        const booking = userBookings[i];
        const spot = await Spot.findOne({
            where: { id: booking.spotId },
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            },
            raw: true
        });

        const spotPreviews = await SpotImage.findAll({ where: { spotId: spot.id }, raw: true });
        spotPreviews.forEach(image => {
            if (image.preview === true || image.preview === 1) spot.previewImage = image.url;
        });
        if (!spot.previewImage) spot.previewImage = null;

        booking.Spot = spot;
    }

    // Sort userBookings based on the createdAt property in descending order
    userBookings.sort((a, b) => new Date(a.id) - new Date(b.id));

    res.json({ Bookings: userBookings });
});


//edit booking
router.put('/:bookingId', requireAuth, validateBooking, async (req, res) => {
    const { startDate, endDate } = req.body;
    let userId = req.user.id;
    let bookingId = parseInt(req.params.bookingId);

    //check booking exist
    const booking = await Booking.findByPk(bookingId)
    if (!booking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404,
        })
    }

    //can't edit a booking past the end date
    const today = new Date().toISOString().split('T')[0];
    if (booking.toJSON().endDate < today) {
        res.status(400);
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 400,
        })
    }

    //can't edit booking to a past date
    if (startDate < today || endDate < today) {
        res.status(403);
        return res.json({
            message: "booking can't use past date",
            statusCode: 403,
        })
    }
    //booking must belong to current user
    if (booking.toJSON().userId == userId) {

        //no conflict booking
        const spotId = booking.toJSON().spotId;
        const currId = booking.toJSON().id;
        const checkBooking = await Booking.findAll({
            where: {
                spotId,
                id: {
                    [Op.ne]: currId
                },
                [Op.or]:
                    [{
                        startDate: { [Op.lte]: startDate },
                        endDate: { [Op.gte]: endDate },
                    },
                    {
                        startDate: { [Op.gte]: startDate, [Op.lte]: endDate }
                    },
                    {
                        endDate: { [Op.lte]: endDate, [Op.gte]: startDate, }
                    }],
            }
        })

        if (checkBooking.length) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
        booking.update({ startDate: startDate, endDate: endDate });
        const {
            createdAt: createdAt_c,
            updatedAt: updatedAt_c,
            id: id_c,
            spotId: spotId_c,
            userId: userId_c,
            startDate: startDate_c,
            endDate: endDate_c
        } = booking.toJSON()
        reorderedBooking = {
            id: id_c,
            spotId: spotId_c,
            userId: userId_c,
            startDate: startDate_c,
            endDate: endDate_c,
            createdAt: createdAt_c,
            updatedAt: updatedAt_c
        }

        return res.json(reorderedBooking);

    } else {
        res.status(403);
        return res.json({
            message: "Booking must belong to the current user",
            statusCode: 403,
        })
    }
})


//Delete a Booking URL: /api/bookings/:bookingId
router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const delbooking = await Booking.findByPk(req.params.bookingId, {
        include: {
            model: Spot
        }
    });

    if (delbooking) {
        const delObj = delbooking.toJSON();

        if (delObj.userId === req.user.id || delObj.Spot.ownerId === req.user.id) {

            let currentDate = new Date();
            currentDate = currentDate.toISOString();
            currentDate = currentDate.substring(0, 10);

            if (delObj.startDate <= currentDate) {

                return res.status(400).json({
                    "message": "Bookings that have been started can't be deleted",
                    "statusCode": 400
                });
            } else {

                await delbooking.destroy();

                return res.json({
                    "message": "Successfully deleted",
                    "statusCode": 200
                });
            }

        } else {

            res.status(403);
            return res.json({
                "message": "Forbidden. You are neither the spot owner nor booking user.",
                "statusCode": 403
            });
        }

    } else {

        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        });
    }
});

module.exports = router;