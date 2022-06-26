const express = require("express");
const User = require("../model/User");
const CreditCard = require("../model/CreditCard");
const WebAccount = require("../model/WebAccount");
const Identity = require("../model/Identity");
const SecretNote = require("../model/SecretNote");
const router = express.Router();

// Get users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.delete("/:_id", async (req, res) => {
  // console.log(req.params);

  try {
    const array = [WebAccount, CreditCard, Identity, SecretNote, User];
    let response = [];
    for (let i in array) {
      if (array[i] !== User) {
        const item2 = await array[i].deleteMany({ user_id: req.params._id });
        // console.log(i, array[i], item2);
      } else {
        const item1 = await array[i].deleteOne({ _id: req.params._id });
        // console.log(i, array[i], item1);
        response = item1;
      }
    }
    res.json(response);
    console.log(response);
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

    // console.log(allCount);
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
