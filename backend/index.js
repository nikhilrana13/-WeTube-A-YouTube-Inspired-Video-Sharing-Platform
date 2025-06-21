const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./routes/AuthRoute");
const ChannelRoute = require("./routes/ChannelRoute");
const VideoRoute = require("./routes/VideoRoute");
const SubcriberRoute = require("./routes/SubcriberRoute");
const CommentRoute = require("./routes/CommentRoute");
const LikeRoute = require("./routes/LikeRoute");
const viewsRoute = require("./routes/ViewRoute");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


// console.log("Allowed origin is:", process.env.FRONTEND_URL);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// routes
app.use("/api/auth",AuthRoute);
app.use("/api/channel",ChannelRoute);
app.use("/api/video",VideoRoute);
app.use("/api/subscriber",SubcriberRoute);
app.use("/api/comment",CommentRoute);
app.use("/api/like",LikeRoute);
app.use("/api/view",viewsRoute);




// connect to db 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log("error connecting to db", err);
})

// app.get("/",(req,res)=>{
//     res.send("Api is running");
// })

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})