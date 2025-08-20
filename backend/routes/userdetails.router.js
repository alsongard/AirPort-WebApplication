const express = require("express");

const router = express.Router();

const {RegisterUserDetails} = require("../controllers/userDetails.controller");
const { GetUserDetails } = require("../controllers/user.controller");

router.post("/registerUserDetail",RegisterUserDetails);

router.get("/getUserDetails/:id", GetUserDetails);



module.exports = router;