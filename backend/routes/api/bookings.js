const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { Spot, SpotImage, User, ReviewImage, Review, Booking, sequelize } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')

const { Sequelize } = require('sequelize');

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
    userBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ Bookings: userBookings });
});


//edit booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    let userId = req.user.id;
    let bookingId = parseInt(req.params.bookingId);

    // booking end date is bigger than start date
    if (startDate >= endDate) {
        res.status(400);
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot come before startDate"
            }
        })
    }

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
    const today = new Date();
    if (booking.toJSON().endDate < today) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403,
        })
    }


    //can't edit booking to a past date
    if (new Date(startDate) < today || new Date(endDate) < today) {
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
        return res.json(booking);

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

                return res.status(403).json({
                    "message": "Bookings that have been started can't be deleted",
                    "statusCode": 403
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
                "message": "Forbidden.Sorry,this is not your booking",
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