const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // const token = req.header('x-auth-token');
  // if (!token) return res.status(401).send("Access Denied");
  // try {
  //     const verify = jwt.verify(token, process.env.TOKEN_SECRET);
  //     req.user = verify;
  //     next();
  // } catch (error) {
  //     res.status(400).send("Invalid Token")
  // }
};
