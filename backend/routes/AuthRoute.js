const express = require("express");
const router = express.Router();
const {LoginWithGoogle,Logout} = require("../Controllers/UserController")
const isAuthenticated  = require("../middleware/isAuthenticated");

router.post("/login",isAuthenticated,LoginWithGoogle)
router.get("/logout",isAuthenticated,Logout)

module.exports = router