const Channel = require("../models/ChannelModel");
const User = require("../models/UserModel");


const SubscribeChannelandUnsubscribe = async(req,res)=>{
    try {
        const CurrentuserId = req.user;
        const {channelId} = req.body;
        // console.log("CurrentuserId",CurrentuserId,"channelId",channelId);

        const channel = await Channel.findById(channelId);
        if(!channel){
            return res.status(404).json({message:"channel not found"});
        }
        if(channel.Subscribers.includes(CurrentuserId)){
            // unsubcribe
          channel.Subscribers.pull(CurrentuserId);
          await channel.save();
          return res.json({message:"Unsubscribed"});
        }else{
            // subscribe
            channel.Subscribers.push(CurrentuserId);
            await channel.save();
            return res.json({message:"subscribed"});
        }
    } catch (error) {
        console.log("failed to subscribe channel",error)
        return res.status(500).json({message:"something went wrong"})
        
    }
}
module.exports = {SubscribeChannelandUnsubscribe}