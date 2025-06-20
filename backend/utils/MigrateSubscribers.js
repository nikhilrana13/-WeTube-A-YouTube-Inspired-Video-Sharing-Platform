const mongoose = require("mongoose");


const MONGO_URI = "mongodb+srv://nikhilrajput060:rananikhil@cluster0.wohkzq2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const channelSchema = new mongoose.Schema({
  name: String,
  profilepicture: String,
  Subscribers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  }
}, { strict: false });

const Channel = mongoose.model("Channel", channelSchema);

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB Atlas");

    const result = await Channel.updateMany(
      { Subscribers: { $exists: false } },
      { $set: { Subscribers: [] } }
    );

    console.log(` Migration complete. Modified ${result.modifiedCount} documents.`);
    process.exit();
  })
  .catch(err => {
    console.error(" Error:", err);
    process.exit(1);
  });
