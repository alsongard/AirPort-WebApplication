const router = require("express").Router();

const {SetUserPreference, GetUserPreferences} = require("../controllers/userPreference.controller")

router.post("/setUser", SetUserPreference);
router.get("/getUser/:userId", GetUserPreferences);

module.exports = router;