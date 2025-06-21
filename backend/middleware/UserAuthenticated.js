const jwt = require("jsonwebtoken");

const UserAuthenticated = async(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        // console.log("authHeader",authHeader)
        const token = authHeader && authHeader.split(" ")[1]; // Bearer token
        if(!token || token === "null"){
            return res.status(401).json({message:"not authenticated please login"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
    //    console.error("JWT Middleware Error:", error);
        return res.status(500).json({message:"Something went wrong in middleware"});
    }
}
module.exports = UserAuthenticated