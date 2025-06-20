const express = require("express");
const { IncreaseViews } = require("../Controllers/ViewsController");
const router = express.Router();
const UserAuthenticated = require("../middleware/UserAuthenticated");

router.post("/:id",UserAuthenticated,IncreaseViews)

module.exports = router