const express = require('express');
const { SetTravellingStat, GetUserTravellStats } = require('../controllers/travellingstat.controller');


const router = express.Router();

router.post("/setTravellingStat/:id", SetTravellingStat);
router.get("/getUserTravellingStat/:id", GetUserTravellStats);


module.exports = router;
