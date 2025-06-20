const express = require("express");
const router = express.Router();
const UserAuthenticated = require("../middleware/UserAuthenticated");
const { SubscribeChannelandUnsubscribe } = require("../Controllers/SubcriberController");


router.post("/subscribe",UserAuthenticated,SubscribeChannelandUnsubscribe);

module.exports = router