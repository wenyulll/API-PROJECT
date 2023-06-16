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
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { url } = req.body;
    const reviews = await Review.findByPk(req.params.reviewId);
    if (!reviews) {
        return res
            .status(404)
            .json({
                "message": "Review couldn't be found",
            })
    }
    if (reviews.userId !== req.user.id) {
        res.status(403)
        return res.json({
            "message": "Not your review",
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
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const newReview = await Review.findByPk(req.params.reviewId);
    const { review, stars } = req.body;
    if (newReview) {
        const newReviewObj = newReview.toJSON();
        if (newReviewObj.userId === req.user.id) {
            await newReview.update({ review, stars });
            return res.json(newReview);
        }
        else if (newReviewObj.userId !== req.user.id) {
            return res.status(403).json({
                "message": "Not your review.",
                "statusCode": 403
            });
        }
        else if (!review || !stars) {
            return res.status(400).json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "review": "Review text is required",
                    "stars": "Stars must be an integer from 1 to 5",
                }
            });
        }
    }
    else {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    }

})

// //Delete a review URL: /api/reviews/:reviewId
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const delReview = await Review.findByPk(req.params.reviewId)
    if (delReview) {
        const deleteObj = delReview.toJSON();
        if (deleteObj.userId === req.user.id) {
            await delReview.destroy();
            return res.json({
                "message": "Successfully deleted",
            });
        } else {
            return res.status(403).json({
                "message": "Not your review.",
            });
        }
    } else {
        return res.status(404).json({
            "message": "Review couldn't be found",
        })
    }
});

module.exports = router;