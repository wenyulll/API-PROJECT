const express = require('express')

const { Spot, SpotImage, User, ReviewImage, Review, Booking, sequelize } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../tils/validation');
const { requireAuth } = reqire('../../utils/auth')
const { Op } = require('sequelize')
const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {
    try {
        const spots = await Spot.findAll({
            raw: true,
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
            ],
        });

        res.json(spots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;