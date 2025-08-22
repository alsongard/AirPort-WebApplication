const express = require('express');
const {Register, Login, GetAllUsers, LogAdmin, CreateAdmin,  DeleteUser} = require("../controllers/user.controller");
const router = express.Router()


router.post("/register",Register);
router.post("/login", Login);
router.get("/allUser", GetAllUsers);
router.delete("/deleteUser/:user_id", DeleteUser);
router.post("/adminLogin", LogAdmin);
router.post("/createAdmin", CreateAdmin);





module.exports = router;