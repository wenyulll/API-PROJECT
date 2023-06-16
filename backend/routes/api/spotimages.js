const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { Spot, SpotImage, User, ReviewImage, Review, Booking, sequelize } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')

const { Sequelize } = require('sequelize');


//Delete a Spot Image URL: /api/spot-images/:imageId
router.delete('/:imageId', requireAuth, async (req, res) => {
    const delSpotImage = await SpotImage.findByPk(req.params.imageId, {
        include: [{
            model: Spot,
            attributes: ['ownerId']
        }]
    })
    if (delSpotImage) {

        const deleteObj = delSpotImage.toJSON();
        if (deleteObj.Spot.ownerId === req.user.id) {
            await delSpotImage.destroy();
            return res.status(200).json({
                "message": "Successfully deleted",
            })
        } else {

            return res.status(403).json({
                "message": "Forbidden,this is not your spot",
            });
        }

    } else {
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
        })
    }
});


module.exports = router;