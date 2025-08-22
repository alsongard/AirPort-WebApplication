const router = require("express").Router();

const {GetAllUsers, DeleteUser, LogAdmin, CreateAdmin} = require("../controllers/admin.controller");


router.get("/users", GetAllUsers )
router.delete("/deleteUser/:user_id", DeleteUser);
router.post("/adminLogin", LogAdmin);
router.post("/createAdmin", CreateAdmin);


module.exports = router;