const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { Spot, SpotImage, User, ReviewImage, Review, Booking, sequelize } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')

const { Sequelize } = require('sequelize');


// Delete a Review Image URL: /api/review-images/:imageId
router.delete('/:imageId', requireAuth, async (req, res) => {
    const delReviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: [{
            model: Review,
            attributes: ['userId', 'spotId']
        }]
    })
    if (delReviewImage) {
        const deleteObj = delReviewImage.toJSON();
        if (deleteObj.Review.userId === req.user.id) {
            await delReviewImage.destroy();
            return res.status(200).json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        } else {

            return res.status(403).json({
                "message": "Not your review",
                "statusCode": 403
            });
        }
    } else (!delReviewImage)
    return res.status(404).json({
        "message": "Review Image couldn't be found",
        "statusCode": 404
    })


})


module.exports = router;