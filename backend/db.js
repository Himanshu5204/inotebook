const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook"; // Replace with your MongoDB URI

// const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("==>msg from db.js==>Connected to MongoDB successfully ");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectToMongo;



// no work bcz newer versions of Mongoose (v7+) have removed the callback-based .connect() style.
// const connectToMongo = () => {
//     mongoose.connect(mongoURI, () => {
//         console.log("Connected to MongoDB");
//     })
// }

module.exports = connectToMongo;
// connectToMongo function is used to connect to the MongoDB database