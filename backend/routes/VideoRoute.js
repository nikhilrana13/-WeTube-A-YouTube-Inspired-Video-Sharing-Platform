const express = require("express");
const router = express.Router();
const multer = require("multer");
const { UploadVideo,GetAllVideos,GetSingleVideo,GetEachUserVideos,DeleteVideo} = require("../Controllers/VideoController");
const UserAuthenticated = require("../middleware/UserAuthenticated");
const path = require("path");

// multer confiq
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"Uploads/Videos/")
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname);
        cb(null,Date.now() + ext);
    }

});
const upload = multer({storage});

router.post("/upload",UserAuthenticated,upload.fields([{name:"Video",maxCount:1},{name:"thumbnail",maxCount:1}]),UploadVideo);
router.get("/allvideos",GetAllVideos);
router.get("/uservideos",UserAuthenticated,GetEachUserVideos);
router.delete("/delete/:id",UserAuthenticated,DeleteVideo);
router.get("/:id",GetSingleVideo);


module.exports = router