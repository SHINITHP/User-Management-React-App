const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

router.post("/register", async (req, res) => {
  try {
    const { userName, mobile, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isExist = await User.findOne({ email: email });
    console.log(isExist);
    if (isExist) {
      res.json({ success: false, message: "User Already Exist" });
    } else {
      const user = new User({
        userName,
        password: hashedPassword,
        email,
        mobile,
      });

      await user.save();
      res.json({ success: true, message: "User registered" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "User registered Failed" });
  }
});

module.exports = router;
