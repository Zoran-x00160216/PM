const express = require("express");
const connectDB = require("./database/db");
const app = express();
const verify = require("./middleware/jwtVerify");
const verifyAdmin = require("./middleware/jwtVerify");
const cors = require("cors");

connectDB();

// Application settings
app.use((req, res, next) => {
  // Globally set Content-Type header for the application
  res.setHeader("Content-Type", "application/json");
  next();
});

// support url encoded bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS Requests only from in .env
app.use(cors()
  // cors({
  //   origin: process.env.DOMAIN,
  // })
);


// Init Middleware
app.use(express.json({ extended: false }));

// app.get("/", (req, res) => res.send("API Running"));

// Route Middlewares
app.use("/api/auth", require("./routes/auth"));
app.use("/api/updateUser", verify, require("./routes/updateUser"));
app.use("/api/createPaymentIntent", require("./routes/createPaymentIntent"));
app.use("/api/webAccounts", verify, require("./routes/webAccounts"));
app.use("/api/creditCards", verify, require("./routes/creditCards"));
app.use("/api/identity", verify, require("./routes/identity"));
app.use("/api/category", verify, require("./routes/category"));
app.use("/api/secretNotes", verify, require("./routes/secretNotes"));
app.use("/api/shareLink", verify, require("./routes/shareLink"));
app.use("/api/admin", verifyAdmin, require("./routes/admin"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found: " + req.method + ":" + req.originalUrl);
  err.status = 404;
  next(err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server up and running..."));
