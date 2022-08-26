const express = require("express");
const router = express.Router();
const nodeMailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config({path: "./.env"})

router.post("/sendEmaiConformationPayment", async (req, res) => {
  try {
    console.log(req.body);

    let transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'passmanzr@gmail.com',
        pass: process.env.EMAIL_PASS
      } 
  });

  let mailOptions = {
      from: '"PM Team" <passmanzr@gmail.com>', 
      to: req.body.email, // list of receivers
      subject: "Premium Account Subscription",
      html: "Your premium account is activated. You will receive a bill for your purchase soon.  Regards, PM Team",      
      // html: "Regards, PM Team"
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
          res.send({status: 200});
      });

  } catch (error) {
    res.send(error);
  }
});

module.exports = router;