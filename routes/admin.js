const express = require("express");
const router = express.Router();
const User = require("../model/User");
const CreditCard = require("../model/CreditCard");
const WebAccount = require("../model/WebAccount");
const Identity = require("../model/Identity");
const SecretNote = require("../model/SecretNote");
const PremiumPrice = require("../model/PremiumPrice");
const nodeMailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const {
  registerValidation,
} = require("../services/userValidation");
const { premiumPriceValidation } = require("../services/entriesValidation");
dotenv.config({path: "./vars/.env"})


// Get users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).send("Server error");
  }
});


// delete User
router.delete("/:_id", async (req, res) => {

  try {

    // delete all collections in array that belongs to this user  
    const array = [WebAccount, CreditCard, Identity, SecretNote, User];
    let response = [];
    for (let i in array) {
      if (array[i] !== User) {
        const item2 = await array[i].deleteMany({ user_id: req.params._id });
      } else {
        const item1 = await array[i].deleteOne({ _id: req.params._id });
        // console.log(i, array[i], item1);
        response = item1;
      }
    }
    res.json(response);
  } catch (error) {
    res.send(error);
  }
});


// Create new admin user
router.post("/createAdmin", async (req, res) => {

  try {

      // Validate data
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Check if user/email already exist
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) return res.status(400).send("User already exist");
    
        // Hasg password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
    
        // Create new user
        const user = await new User({
          email: req.body.email,
          password: hash,
          tier: "admin",
          lastLogin: new Date(),
        });

    await user.save();
    res.status(200).send("Admin created");

  } catch (error) {
    res.send(error);
  }
});


// Set premium price
router.post("/setPremiumPrice", async (req, res) => {

  try {
      const data = {
        price: parseFloat(req.body.price),
        price_id: 1,
        updated: new Date(),
      }
      // Validate data
      const { error } = premiumPriceValidation(data);
      if (error) return res.status(400).send(error.details[0].message);
        // Create price
        const premiumPrice = await new PremiumPrice(data);

      await premiumPrice.save();
      res.status(200).send("Price Set");

  } catch (error) {
    res.send(error);
  }
});

// Set premium price
router.put("/updatePremiumPrice", async (req, res) => {

  try {
      const data = {
        price: parseFloat(req.body.price),
        updated: new Date(),
      }

      // Validate data
      const { error } = premiumPriceValidation(data);
      if (error) return res.status(400).send(error.details[0].message);
        // Create price
        const priceRes = await PremiumPrice.updateOne({ price_id: 1 }, { $set: data});

      res.status(200).send("Price Set");

  } catch (error) {
    res.send(error);
  }
});

router.post("/warningEmail", async (req, res) => {
  try {
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
      subject: "Password manager, Inactive account",
      html: "You must log-in in the next 14 days to keep your account active. if an account is not active for an entire year + 14 days Account will be deleted automatically. Regards, PM Team",      
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
    console.log(error);
  }
});


// Get sum of all etries by category
router.get("/count", async (req, res) => {
  try {
    const webaccounts = await WebAccount.find().count();
    const secretNotes = await SecretNote.find().count();
    const identity = await Identity.find().count();
    const creditCard = await CreditCard.find().count();
    const allCount = [
      {
        name: "Webaccount",
        value: webaccounts,
      },
      {
        name: "SecretNotes",
        value: secretNotes,
      },
      {
        name: "Identity",
        value: identity,
      },
      {
        name: "CreditCard",
        value: creditCard,
      },
    ];
    res.json(allCount);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get sum of all etries by category
router.get("/sumusers", async (req, res) => {
  try {
    const basic = await User.find({ tier: "basic" }).count();
    const premium = await User.find({ tier: "premium" }).count();
    const allCount = [
      {
        name: "Basic",
        value: basic,
      },
      {
        name: "Premium",
        value: premium,
      },
    ];

    res.json(allCount);
    
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get sum of all etries by category
router.get("/allpremium", async (req, res) => {
  try {
    // const basic = await User.find({ tier: "basic" });
    const premium = await User.find({ tier: "premium" }, { _id: 1 });
    const pre = JSON.stringify(premium);
    const data = JSON.parse(pre);

    let webaccounts = 0;
    let secretNotes = 0;
    let identity = 0;
    let creditCard = 0;
    let allCount = [];

    for (let i in data) {
      webaccounts += await WebAccount.find({ user_id: data[i]._id }).count();
      secretNotes += await SecretNote.find({ user_id: data[i]._id }).count();
      identity += await Identity.find({ user_id: data[i]._id }).count();
      creditCard += await CreditCard.find({ user_id: data[i]._id }).count();
    }

    allCount = [
      {
        name: "Webaccount",
        value: webaccounts,
      },
      {
        name: "SecretNotes",
        value: secretNotes,
      },
      {
        name: "Identity",
        value: identity,
      },
      {
        name: "CreditCard",
        value: creditCard,
      },
    ];

    res.json(allCount);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get sum of all etries by category
router.get("/allbasic", async (req, res) => {
  try {
    const basic = await User.find({ tier: "basic" }, { _id: 1 });
    const bas = JSON.stringify(basic);
    const data = JSON.parse(bas);

    let webaccounts = 0;
    let secretNotes = 0;
    let identity = 0;
    let creditCard = 0;
    let allCount = [];

    for (let i in data) {
      webaccounts += await WebAccount.find({ user_id: data[i]._id }).count();
      secretNotes += await SecretNote.find({ user_id: data[i]._id }).count();
      identity += await Identity.find({ user_id: data[i]._id }).count();
      creditCard += await CreditCard.find({ user_id: data[i]._id }).count();
    }

    allCount = [
      {
        name: "Webaccount",
        value: webaccounts,
      },
      {
        name: "SecretNotes",
        value: secretNotes,
      },
      {
        name: "Identity",
        value: identity,
      },
      {
        name: "CreditCard",
        value: creditCard,
      },
    ];

    res.json(allCount);
  } catch (error) {
    res.status(500).send("Server error");
    console.log(error);
  }
});

module.exports = router;
