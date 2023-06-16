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

//Edit a Booking URL: /api/bookings/:bookingId

//Delete a Booking URL: /api/bookings/:bookingId




module.exports = router;