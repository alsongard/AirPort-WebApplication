const express = require('express');
const {Register, Login, GetAllUsers} = require("../controllers/user.controller");
const router = express.Router()


router.post("/register",Register);
router.post("/login", Login);
router.get("/allUser", GetAllUsers);





module.exports = router;