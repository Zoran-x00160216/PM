const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({path: "./.env"})

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied");
  const decode = jwt.decode(
    token,
    process.env.TOKEN_SECRET,
    (algorithm = "HS256")
  );

  try {
    if (decode[1] === "admin") {
      const verifyAdmin = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verifyAdmin;
    } else {
      const verify = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verify;
    }
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
