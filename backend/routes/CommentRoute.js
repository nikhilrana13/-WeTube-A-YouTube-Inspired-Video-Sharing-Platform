const express = require("express");
const UserAuthenticated = require("../middleware/UserAuthenticated");
const { ShowAllComments, AddComment, DeleteComment } = require("../Controllers/CommentController");
const router = express.Router();


router.post("/add/:id",UserAuthenticated,AddComment);
router.get("/show/:id",ShowAllComments);
router.delete("/delete/:id",UserAuthenticated,DeleteComment);

module.exports = router