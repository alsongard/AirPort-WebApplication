const express = require('express');
const router = express.Router();
const {CreateFlight,GetFlightDetails, SearchFlight, UpdateFlightDetails } = require("../controllers/flights.controller")



router.post("/createFlight",CreateFlight);

router.get("/getFlights", GetFlightDetails);

router.post("/searchFlight", SearchFlight);
router.post("/updateFlight/:id", UpdateFlightDetails);

module.exports = router;
