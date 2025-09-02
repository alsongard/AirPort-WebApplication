const router = require("express").Router();

const {GetAllUsers, DeleteUser,DeleteFlight, SingleFlightData , LogAdmin, CreateAdmin} = require("../controllers/admin.controller");


router.get("/users", GetAllUsers )
router.delete("/deleteUser/:user_id", DeleteUser);
router.post("/adminLogin", LogAdmin);
router.post("/createAdmin", CreateAdmin);
router.delete("/deleteFlight/:id", DeleteFlight);
route.get("/singleFlight/:id", SingleFlightData)


module.exports = router;