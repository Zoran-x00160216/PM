const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: "./vars/.env"})


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
module.exports = connectDB;
