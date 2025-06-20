const admin = require("../utils/firebase");

const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log("token",token)
        if(!token){
            return res.status(401).json({message:"not authenticated"})
        }
        const decodedtoken = await admin.auth().verifyIdToken(token);
        // console.log("decodedtoken",decodedtoken)
        req.user = decodedtoken;
        next();        
    } catch (error) {
        return res.status(500).json({message:"something went wrong"})
        
    }
}
module.exports = isAuthenticated