const express = require('express');
const router = express.Router();

const Booking = require("../models/booking.model");
const { SetUserBooking, GetUserBooking, GetAllBookings } = require('../controllers/booking.controller');


router.post("/setBooking", SetUserBooking);
router.get("/getUserBooking/:id", GetUserBooking);
router.get("/getBookings", GetAllBookings)

module.exports = router;