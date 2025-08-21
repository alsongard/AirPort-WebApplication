const express = require('express');
const {Register, Login, GetAllUsers, DeleteUser} = require("../controllers/user.controller");
const router = express.Router()


router.post("/register",Register);
router.post("/login", Login);
router.get("/allUser", GetAllUsers);
router.delete("/deleteUser/:user_id", DeleteUser);





module.exports = router;