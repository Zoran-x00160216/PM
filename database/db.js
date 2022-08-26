const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: "./.env"})


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ZokiPM:AD8GJb9JoNRHf9ra@cluster0.ldxqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
module.exports = connectDB;
