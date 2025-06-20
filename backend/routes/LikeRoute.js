const express = require("express");
const UserAuthenticated = require("../middleware/UserAuthenticated");
const { LikeAndDislike } = require("../Controllers/PostLikeController");
const router = express.Router();



router.post("/:id",UserAuthenticated,LikeAndDislike);

module.exports = router