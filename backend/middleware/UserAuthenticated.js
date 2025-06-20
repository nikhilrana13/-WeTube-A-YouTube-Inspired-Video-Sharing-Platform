const jwt = require("jsonwebtoken");

const UserAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        console.log("token",token)
        if(!token){
            return res.status(401).json({message:"not authenticated please login"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        return res.status(500).json({message:"something went wrong"});
    }
}
module.exports = UserAuthenticated