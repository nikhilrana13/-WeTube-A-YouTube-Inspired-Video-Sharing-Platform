const User = require("../models/UserModel");
const admin = require("../utils/firebase");
const jwt = require("jsonwebtoken");

const LoginWithGoogle = async(req,res)=>{
    try {
        const {uid,name,email,picture} = req.user
        let user = await User.findOne({uid})
        if(!user){
            user = await User.create({
                uid,
                name,
                email,
                picture
            })
            await user.save()
            return res.status(200).json({message:"user created",user})
        }
        // send jwt token to use in later other requests for find user info
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})
        return res.status(200).json({message:"user logged in",user,token})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"something went wrong"})
        
    }
}

const Logout = async(req,res)=>{
    try {
        
          if(req.user && req.user.uid){
            await admin.auth().revokeRefreshTokens(req.user.uid);
          }

          res.clearCookie("token",{httpOnly:true,secure:true,sameSite:"none"});
          console.log("cookie deleted")
          return res.status(200).json({message:"user logged out"})
    } catch (error) {
        console.log("failed to logout")
        return res.status(500).json({message:"something went wrong",error})
        
    }
}

module.exports = {LoginWithGoogle,Logout}
