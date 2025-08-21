const express = require("express");

const router = express.Router();

const {RegisterUserDetails, GetUserDetails} = require("../controllers/userDetails.controller");

router.post("/registerUserDetail",RegisterUserDetails);

router.get("/getUserDetails/:id", GetUserDetails);



module.exports = router;