const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { Spot, SpotImage, User, ReviewImage, Review, Booking, sequelize } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')

const { Sequelize } = require('sequelize');

// const validateReview = [
//     check("review")
//         .exists({ checkFalsy: true })
//         .withMessage("Review text is required"),
//     check("stars")
//         .exists({ checkFalsy: true })
//         .isInt({ min: 1, max: 5 })
//         .withMessage("Stars must be an integer from 1 to 5"),
//     handleValidationErrors,
// ];

//Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
    const { user } = req;

    const userReviews = await Review.findAll({
        where: {
            userId: user.id,
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: Spot,
                include: {
                    model: SpotImage,
                    required: false,
                    where: {
                        preview: true,
                    },
                    attributes: ["url"],
                }
            },
            {
                model: ReviewImage,
                required: false,
                attributes: ["id", "url"],
            },
        ],
    });
    const plainUserReviews = userReviews.map(userReview => {
        const plainUserReview = userReview.get({ plain: true });
        plainUserReview.Spot.previewImage = plainUserReview.Spot.previewImage?.url;
        return plainUserReview;
    });

    res.json({
        Reviews: plainUserReviews,
    });
});

//Add an Image to a Review based on the Review's id URL: /api/reviews/:reviewId/images
router.post('/:Id/images', requireAuth, async (req, res, next) => {
    const { url } = req.body;
    const reviews = await Review.findByPk(req.params.reviewId);
    if (!reviews) {
        return res
            .status(404)
            .json({
                "message": "Review couldn't be found",
                "statusCode": 404
            })
    }
    if (reviews.userId !== req.user.id) {
        res.status(403)
        return res.json({
            "message": "Forbidden. Sorry,this is not your review.",
            "statusCode": 403
        })
    }
    const images = await ReviewImage.findAll({
        where: {
            reviewId: reviews.id
        }
    });

    if (images.length >= 10) {
        return res
            .status(403)
            .json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
            })
    }
    const newReview = await ReviewImage.create({
        reviewId: reviews.id,
        url,
    });
    // delete newReview.updatedAt;
    // delete newReview.createdAt;
    return res.json({
        id: newReview.id,
        url,
    });
});




// //Edit a Review URL: /api/reviews/:reviewId


// //Delete a review URL: /api/reviews/:reviewId

module.exports = router;