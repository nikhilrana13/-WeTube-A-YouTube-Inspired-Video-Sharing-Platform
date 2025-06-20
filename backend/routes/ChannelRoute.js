const express = require("express");
const { CreateChannel , GetChannelDetail,UpdateChannelDetail} = require("../Controllers/ChannelController");
const router = express.Router();
const multer = require("multer")
const UserAuthenticated = require("../middleware/UserAuthenticated");

// multer confiq
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post("/create",UserAuthenticated,upload.fields([{name:"coverimage",maxCount:1},{name:"profilepicture",maxCount:1}]),CreateChannel);
router.get("/:id",UserAuthenticated,GetChannelDetail);
router.put("/update/:id",UserAuthenticated,upload.fields([{name:"coverimage",maxCount:1},{name:"profilepicture",maxCount:1}]),UpdateChannelDetail);


module.exports = router